import { parse, evaluate, simplify } from "mathjs";
import NewDiffEquationSolver from "../LinearCoupled/NewDiffEquationSolver";

import DEFAULTVARSFORMODEL from "./DEFAULTVARS";
import DEFAULTEQUATIONSNEW from "./DEFAULTEQUATIONS";
import DEFAULTMODELCONFIGNew from "../../../../containers/Lab/LinearCoupled/DefaultGraphConfignew";
import React from "react";

import MyErrorMessage from "../../../UI/MyErrorMessage/CustomizedErrorMessage";

export default class Model {
  constructor(dbModel, meta) {
    if (dbModel === undefined && meta === undefined) {
      dbModel = {
        Config: DEFAULTMODELCONFIGNew,
        Eqns: DEFAULTEQUATIONSNEW,
        Vars: DEFAULTVARSFORMODEL,
      };
      meta = {
        name: "Untitled",
        description: "Please add a description with references for your model",
        modelId: "dfjskf",
      };
    }

    // this.key = "modelId" in meta ? meta.modelId : uuidv4();
    this.Config = {
      // initialConditions: dbModel.Config.initialConditions,
      h: dbModel.Config.h,
      // t0: dbModel.Config.t0,
      numOfCycles: dbModel.Config.numOfCycles,
      method: dbModel.Config.method,

      // DOES THIS REALLY FIT INTO A MODEL CLASS
      calculate: dbModel.Config.calculate,
      solvable: dbModel.Config.solvable,
      show: dbModel.Config.show,
      DecimalPrecision: dbModel.Config.DecimalPrecision,

      xAxis: dbModel.Config.xAxis,
      yAxis: dbModel.Config.yAxis,
    };
    this.Eqns = dbModel.Eqns.map((eqnObj, i) => ({
      id: eqnObj.lineName + i,
      lineName: eqnObj.lineName,
      LHSLatexEqn:
        eqnObj.LHSLatexEqn !== undefined
          ? eqnObj.LHSLatexEqn
          : "\\frac{d" +
            eqnObj.lineName +
            "}{d" +
            dbModel.Vars.find((Var) => Var.VarType === "Independent")
              .LatexForm +
            "}=",

      latexEqn: this.tryConvertToLatex(eqnObj.textEqn),

      textEqn: eqnObj.textEqn,
      errorMessage: null,
    }));

    this.Vars = dbModel.Vars.map((Var, i) => {
      return { ...Var, errorMessage: null, id: Var.VarType + i.toString() };
    });

    this.solutions = {
      actualSolution: this.Config.solvable
        ? this.generateActualSolutionArray()
        : null,
      calcedSolution: null,
      timeTaken: 0,
      rmse: null,

      // calcedSolution: meta.calculate ? this.solveDiffEqns() : null,
      // timeTaken: this.Config.solvable ? this.getTimeTaken() : 0,
      // rmse: this.Config.solvable ? this.calcRMSE() : null,
    };
    this.meta = {
      name: meta.name,
      description: meta.description,
    };
  }

  /** 
     * inputModel={
      initialConditions =arr of num
      h =num
      t0 =num
      lineNames =arr of str
      numOfCycles =num
      eqns=arr of str
      vars=arr of obj

      (OPTIONAL)
      solved =arr of str
      parsedEqns=arr of str
      },


      method=str,


      meta={
      calculate=bool

      (OPTIONAL)
      modelId=str
      name=str
      description=str

      }

    */

  validateExpressions = () => {
    let scope = {};

    let textEqns = this.Eqns.map((eqn) => eqn.textEqn);
    //checks for correct letters
    scope["d"] = 1;
    this.Vars.forEach((Var) => {
      scope[Var.LatexForm] = 1;
    });

    let invalidIndex = [];

    for (let i = 0; i < textEqns.length; i++) {
      let LHSLatex = this.Eqns[i].LHSLatexEqn;
      //must be \\frac{da}{dt}= or a=
      // /frac({d.*}){2}=/
      if (/frac({d.*}){2}=|(.+=)/.test(LHSLatex)) {
        //Valid pattern
        try {
          let res = evaluate(textEqns[i], scope);

          if (res instanceof Object) {
            invalidIndex.push(i);
          }
          // console.log(res instanceof Object);

          // console.log(textEqns[i],evaluate(textEqns[i], scope))
        } catch (error) {
          invalidIndex.push(i);
        }
      } else {
        invalidIndex.push(i);
      }
    }
    return invalidIndex;
  };

  tryConvertToLatex = (textEqn) => {
    try {
      return parse(parse(textEqn).toString()).toTex();
    } catch (error) {
      return textEqn;
    }
  };

  // set eqns(textEqnsArr){
  //   this.eqns.textEqns=textEqnsArr
  // }

  /**
   * This updates the models numCycles
   */

  calcRMSE() {
    /**
     * This compares the RMSE between real and cacluated solution for this method
     * and numCycles etc
     * @type {*[]}
     */
    let errorArr = [];
    if (!this.solutions.actualSolution) return;

    for (let i = 0; i < this.solutions.calcedSolution.length; i++) {
      let calced = this.solutions.calcedSolution[i][0];
      let actual = this.solutions.actualSolution[i][0];
      let error = actual - calced;
      errorArr.push(error);
    }
    var sqrt = Math.sqrt;
    var sqr = function (a) {
      return a * a;
    };
    var add = function (a, b) {
      return a + b;
    };
    var differenceFrom = function (target, a) {
      return target - a;
    };
    var target = 0;
    var differenceFromTarget = differenceFrom.bind(undefined, target);
    var sqrdDiff = errorArr.map(differenceFromTarget).map(sqr);
    var RMSE = sqrt(sqrdDiff.reduce(add, 0) / errorArr.length);

    return RMSE;
  }

  /**TODO This method should not take in arguments */
  /**
   * Pass in a array of text forms and this returns a array of latex forms
   * using Math.js parse
   * @param {*} eqns
   */

  singleEqnToLatex = (textEqn) => {
    try {
      const node = parse(textEqn);
      return node.toTex();
    } catch (err) {
      return textEqn;
    }
  };
  toLatex(eqns) {
    let latexEqns = [];
    eqns.forEach((eqn) => {
      let texVer = parse(
        parse(eqn).toString({
          implicit: "hide",
          parenthesis: "auto",
        })
      ).toTex({
        parenthesis: "auto",
        implicit: "hide",
      });
      latexEqns.push(texVer);
    });

    return latexEqns;
  }

  /**
   * This creates a text form from latex form eqautions
   */

  /**
   * This generates a actual solution of the model
   * has been provided with any
   */
  generateActualSolutionArray = () => {
    const func = (t, y) => {
      let eqnResultsArr = [];

      let coordinate = {}; //t initial value
      //generates the eval object
      for (let i = 0; i < y.length; i++) {
        coordinate[this.config.lineNames[i]] = y[i]; // { a, b , c}
      }

      coordinate["t"] = t; // { a, b , c, t}

      let accumulative = {
        ...coordinate,
        ...this.Vars,
      };
      // for (let i = 0; i < this.eqns.vars.length; i++) {
      //   coordinate[this.eqns.vars[i].LatexForm] = this.eqns.vars[i].VarCurrent;
      // }
      for (let idx = 0; idx < this.eqns.parsedSolvedEqns.length; idx++) {
        eqnResultsArr.push(
          this.eqns.parsedSolvedEqns[idx].evaluate(accumulative)
        ); // { a :1 , b: 3.3,t:3}
      }

      return eqnResultsArr;
    };
    let t0 = parseFloat(this.config.t0);

    let returnedY = this.config.initialConditions.slice();

    let _returnedY = returnedY.slice();

    _returnedY.push(t0);
    let allY = [_returnedY];

    for (let i = 0; i < this.config.numOfCycles; i++) {
      returnedY = func(t0, returnedY);
      t0 += this.config.h; // constant step size

      allY.push([...returnedY, t0]);
    }

    return allY;
  };

  insertDifferentialIntoText = (allEqns) => {
    for (let i = 0; i < allEqns.length; i++) {
      let textEqn = allEqns[i].textEqn;
      if (textEqn.includes("d")) {
        let independentLatex = this.Vars.find(
          (Var) => Var.VarType === "Independent"
        ).LatexForm;

        this.Vars.map((Var) => {
          let differentialText =
            "(d*" + Var.LatexForm + ")/(d*" + independentLatex + ")";
          let newExpression = this.Eqns.filter(
            (eqn) => eqn.lineName === Var.LatexForm
          );
          if (
            newExpression.length !== 0 &&
            textEqn.includes(differentialText)
          ) {
            let newtextEqn = textEqn
              .split(differentialText)
              .join(newExpression[0].textEqn);

            if (newtextEqn.includes(differentialText)) {
              allEqns[i].errorMessage = <MyErrorMessage />;
            } else {
              allEqns[i].textEqn = newtextEqn;
              allEqns[i].parsedEqn = simplify(parse(newtextEqn));
            }
          }
        });
      }
    }
    return allEqns;
  };

  solveDiffEqns = () => {
    let solution = NewDiffEquationSolver({ modelObj: this });
    this.solutions.calcedSolution = solution;
    return solution;
  };

  getTimeTaken = () => {
    let t_0 = performance.now();
    this.solveDiffEqns();

    let t_1 = performance.now();

    let time_difference = t_1 - t_0;

    return time_difference;
  };

  /**
   * This method returns a summary of the entire object
   * to help clients of this class do comparitive analysis
   * of models
   */
  returnConstructorObj = () => {
    return {
      Config: this.Config,
      Eqns: this.Eqns.map((Eqn) => {
        return {
          lineName: Eqn.lineName,
          LHSLatexEqn: Eqn.LHSLatexEqn,
          textEqn: Eqn.textEqn,
        };
      }),

      Vars: this.Vars.map((Var) => {
        if (Var.VarType === "Independent" || Var.VarType === "Dependent") {
          return {
            LatexForm: Var.LatexForm,
            VarType: Var.VarType,
            VarCurrent: Var.VarCurrent,
          };
        } else {
          return {
            LatexForm: Var.LatexForm,
            VarType: Var.VarType,
            VarLow: Var.VarLow,
            VarCurrent: Var.VarCurrent,
            VarHigh: Var.VarHigh,
          };
        }
      }),

      meta: this.meta,
      // key: this.key,
      // Config: this.Config,
      // Eqns: this.Eqns,
      // Vars: this.Vars,
      // solutions: this.solutions,
      // meta: this.meta,
    };
  };
}
