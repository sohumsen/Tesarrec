import { v4 as uuidv4 } from "uuid";
import { parse, evaluate, simplify } from "mathjs";
import NewDiffEquationSolver from "../LinearCoupled/NewDiffEquationSolver";
import DEFAULTGRAPHCONFIG from "../../../../containers/Lab/LinearCoupled/DefaultGraphConfig";
import DEFAULTMODELCONFIG from "../../../../containers/Lab/LinearCoupled/DefaultModelConfig";
import DEFAULTEQUATIONSFORMODEL from "./DEFAULTEQUATIONSFORMODEL";
import DEFAULTVARSFORMODEL from "./DEFAULTVARS";
import DEFAULTEQUATIONSNEW from "./DEFAULTEQUATIONSnew";
import DEFAULTMODELCONFIGNew from "../../../../containers/Lab/LinearCoupled/DefaultGraphConfignew";

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
        description: "this is a default Model",
        modelId: "dfjskf",
      };
    }

    this.key = "modelId" in meta ? meta.modelId : uuidv4();
    this.Config = {
      initialConditions: dbModel.Config.initialConditions,
      h: dbModel.Config.h,
      t0: dbModel.Config.t0,
      lineNames: dbModel.Config.lineNames,
      numOfCycles: dbModel.Config.numOfCycles,
      method: dbModel.Config.method,

      // DOES THIS REALLY FIT INTO A MODEL CLASS
      // axis: dbModel.Config.axis,
      calculate: dbModel.Config.calculate,
      solvable: dbModel.Config.solvable,
      show: dbModel.Config.show,
      submitted: dbModel.Config.submitted,
      LegendHorizontal: dbModel.Config.LegendHorizontal,
      LegendVertical: dbModel.Config.LegendVertical,
      DecimalPrecision: dbModel.Config.DecimalPrecision,

      xAxis: dbModel.Config.xAxis,
      yAxis: dbModel.Config.yAxis,
    };
    this.Eqns = dbModel.Eqns.map((eqnObj, i) => ({
      id: eqnObj.lineName+i,
      lineName: eqnObj.lineName,
      DByDLatex: "\\frac{d" + eqnObj.lineName+ "}{dt}=",
      latexEqn: parse(
        parse(eqnObj.textEqn).toString({
          implicit: "hide",
          parenthesis: "auto",
        })
        // \frac{dY_1}{dx}=
      ).toTex({
        parenthesis: "auto",
        implicit: "hide",
      }),
      textEqn: eqnObj.textEqn,
      parsedEqn: simplify(parse(eqnObj.textEqn)),
      errorMessage: null,
    }));

    this.Vars = dbModel.Vars;

    this.solutions = {
      actualSolution: this.Config.solvable
        ? this.generateActualSolutionArray()
        : null,
      calcedSolution: meta.calculate ? this.solveDiffEqns() : null,
    };
    this.meta = {
      name: meta.name,
      description: meta.description,
      rmse: this.Config.solvable ? this.calcRMSE() : null,
      timeTaken: this.Config.solvable ? this.getTimeTaken() : 0,
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

  onCalculate() {
    this.solutions.calcedSolution = this.solveDiffEqns();
  }

 
  setCalculate(val) {
    this.meta.calculate = val;
  }

  validateExpressions2 = () => {
    let scope = {};
    // let parsedEqns = this.Eqns.map((eqn) => eqn.ParsedEqn);

    let textEqns = this.Eqns.map((eqn) => eqn.textEqn);
    let lineNames =this.Eqns.map((eqn) => eqn.lineName);

    lineNames.forEach((lineName) => {
      scope[lineName] = 1;
    });

    scope["t"] = 1;

    this.Vars.forEach((Var) => {
      scope[Var.LatexForm] = 1;
    });

    let invalidIndex = [];

    for (let i = 0; i < textEqns.length; i++) {
      try {
        evaluate(textEqns[i], scope);
      } catch (error) {
        invalidIndex.push(i);
      }
    }
    return invalidIndex;
  };
  // set eqns(textEqnsArr){
  //   this.eqns.textEqns=textEqnsArr
  // }

  /**
   * This updates the models numCycles
   */

  setNumOfCycles(numCycles) {
    this.config.numOfCycles = numCycles;
    //this.solutions.actualSolution = this.generateActualSolutionArray();
    //this.solutions.calcedSolution = this.solveDiffEqns();
    //this.meta.rmse = this.calcRMSE();
  }

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
  toTextForm() {}

  validateExpressions(parsedEqns, lineNames, Vars) {
    let scope = {};
    lineNames.forEach((lineName) => {
      scope[lineName] = 1;
    });
    Vars.forEach((Var) => {
      scope[Var.LatexForm] = 1;
    });

    let invalidIndex = [];

    for (let i = 0; i < parsedEqns.length; i++) {
      try {
        evaluate(parsedEqns[i], scope);
      } catch (error) {
        invalidIndex.push(i);
      }
    }
    return invalidIndex;
  }

 
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

  solveDiffEqns = () => {
    let t0 = performance.now();
     // }
     let vars = {};

     this.Vars.forEach((VarElement) => {
       vars[VarElement.LatexForm] = VarElement.VarCurrent;
     });
    let calcedArr = NewDiffEquationSolver({modelObj: this,vars:vars});
    let t1 = performance.now();
    this.solutions.calcedSolution  = calcedArr
    return calcedArr;
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
      key: this.key,
      Config: this.Config,
      Eqns: this.Eqns,
      Vars: this.Vars,
      solutions: this.solutions,
      meta: this.meta,
    };
  };
}
