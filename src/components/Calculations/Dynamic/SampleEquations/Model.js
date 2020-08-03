import { v4 as uuidv4 } from "uuid";
import { parse, evaluate, simplify } from "mathjs";
import NewDiffEquationSolver from "../LinearCoupled/NewDiffEquationSolver";

export default class Model {
  constructor(inputModel, method, meta) {
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

    this.key = "modelId" in meta ? meta.modelId : uuidv4();

    this.config = {
      initialConditions: inputModel.initialConditions,
      h: inputModel.h,
      t0: inputModel.t0,
      lineNames: inputModel.lineNames,
      numOfCycles: inputModel.numOfCycles,
      method: method,
      solvable: "solved" in inputModel,
    };
    this.eqns = {
      parsedEqns:
        "parsedEqns" in inputModel
          ? inputModel.parsedEqns
          : this.parseEqns(inputModel.eqns),
      textEqns: inputModel.eqns,
      latexEqns: this.toLatex(inputModel.eqns),
      //LATEX EQNS,id,errormessage,line,dybydlatex

      textSolvedEqns: this.config.solvable ? inputModel.solved : null,
      parsedSolvedEqns: this.config.solvable
        ? this.parseEqns(inputModel.solved)
        : null,
      vars: inputModel.vars,
    };
    this.solutions = {
      actualSolution: this.config.solvable
        ? this.generateActualSolutionArray()
        : null,
      calcedSolution: meta.calculate ? this.solveDiffEqns() : null,
    };
    this.meta = {
      name: "name" in meta ? meta.name : inputModel.eqns.join() + "," + method,
      description:
        "description" in meta ? meta.description : "Please add a description",
      rmse: this.config.solvable ? this.calcRMSE() : null,
      timeTaken: this.config.solvable ? this.getTimeTaken() : 0,
    };
  }
  onCalculate() {
    this.solutions.calcedSolution = this.solveDiffEqns();
  }

  /**
   * This updates the models numCycles
   */
  setNumOfCycles(numCycles){
    this.config.numOfCycles = numCycles
    this.solutions.actualSolution = this.generateActualSolutionArray()
    this.solutions.calcedSolution = this.solveDiffEqns()
    this.meta.rmse = this.calcRMSE()
  }

  calcRMSE() {
    console.log("calcRMSE");
    let errorArr = [];
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
    console.log("toLatex");

    let latexEqns = [];
    eqns.forEach((eqn) => {
      let stringVer = parse(eqn).toString({
        implicit: "hide",
        parenthesis: "auto",
      });
      let texVer = parse(stringVer).toTex({
        parenthesis: "auto",
        implicit: "hide",
      });
      latexEqns.push(texVer);
    });

    // let parsedstring=(parse(expressionString).toTex({parenthesis: "auto"})
    // )

    // console.log(origstring,stringver,parsedstring,parsedstringtex)

    // let a = parse(stringver).toTex({
    //   parenthesis: "auto",
    //   implicit: "hide",
    // });
    // let result1 = a.replace("cdot", "");
    // let result2 = result1.replace("'\frac'", "\\frac");

    return latexEqns;
  }

  /**
   * This creates a text form from latex form eqautions
   */
  toTextForm() {

  }


  validateExpression = () => {
    console.log("validateExpression");

    let scope = {};
    this.config.lineNames.forEach((lineName) => {
      scope[lineName] = 1;
    });
    this.eqns.vars.forEach((Var) => {
      scope[Var.LatexForm] = 1;
    });

    try {
      evaluate(this.eqns.parsedEqns, scope);
      return true;
    } catch (error) {
      return false;
    }
  };

  parseEqns = (eqns) => {
    console.log("parseEqns");

    let parsedEqns = [];
    eqns.forEach((element) => {
      let parsedEqn = simplify(parse(element));
      parsedEqns.push(parsedEqn);
    });

    return parsedEqns;
  };

  /**
   * This generates a actual solution of the model
   * has been provided with any 
   */
  generateActualSolutionArray = () => {
    console.log("generateActualSolutionArray");

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
        ...this.eqns.vars,
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
    console.log("solveDiffEqns");

    let t0 = performance.now();

    let calcedArr = NewDiffEquationSolver({
      method: this.config.method,
      h: this.config.h,
      numberOfCycles: this.config.numOfCycles,
      eqns: this.eqns.parsedEqns,
      vars: this.eqns.vars, // { K_1=0.27}
      LineNames: this.config.lineNames,
      initialConditions: this.config.initialConditions, // y1
      t0: this.config.t0,
    });
    let t1 = performance.now();
    console.log(t1 - t0);

    return calcedArr;
  };
  getTimeTaken = () => {
    console.log("getTimeTaken");

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
    console.log("returnConstructorObj");

    return {
      key: this.key,
      config: this.config,
      eqns: this.eqns,
      solutions: this.solutions,
      meta: this.meta,
    };
  };
}
