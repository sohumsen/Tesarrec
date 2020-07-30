import { v4 as uuidv4 } from "uuid";
import { parse, evaluate, simplify } from "mathjs";
import NewDiffEquationSolver from "../LinearCoupled/NewDiffEquationSolver";

export default class Model {
  constructor(inputModel, method) {
    this.key = uuidv4();

    this.config = {
      initialConditions: inputModel.initialConditions,
      h: inputModel.h,
      t0: inputModel.t0,
      lineNames: inputModel.lineNames,
      numOfCycles: inputModel.numOfCycles,
      method: method,
      solvable: inputModel.solved.length !== 0,
    };
    this.eqns = {
      parsedEqns: this.parseEqns(inputModel.eqns),
      textEqns: inputModel.eqns,
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
      calcedSolution: this.solveDiffEqns(),
    };
    this.meta = {
      name: inputModel.eqns.join() + "," + method,
      description: "Please add a description",
      rmse: this.config.solvable ? this.calcRMSE() : null,
      timeTaken: this.getTimeTaken(),
    };
  }

  calcRMSE() {
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

  toLatex(expressionString) {
    let a = parse(expressionString).toTex({
      parenthesis: "auto",
      implicit: "hide",
    });
    let result = a.replace(/\/\//g, "/");

    console.log(a, result);
  }
  validateExpression = () => {
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
    let parsedEqns = [];
    eqns.forEach((element) => {
      let parsedEqn = simplify(parse(element));
      parsedEqns.push(parsedEqn);
    });

    return parsedEqns;
  };

  generateActualSolutionArray = () => {
    const func = (t, y) => {
      let eqnResultsArr = [];

      let coordinate = {}; //t initial value
      //generates the eval object
      for (let i = 0; i < y.length; i++) {
        coordinate[this.config.lineNames[i]] = y[i]; // { a, b , c}
      }

      coordinate["t"] = t; // { a, b , c, t}

      for (let i = 0; i < this.eqns.vars.length; i++) {
        coordinate[this.eqns.vars[i].LatexForm] = this.eqns.vars[i].VarCurrent;
      }
      for (let idx = 0; idx < this.eqns.parsedSolvedEqns.length; idx++) {
        eqnResultsArr.push(
          this.eqns.parsedSolvedEqns[idx].evaluate(coordinate)
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
    let vars = {};

    this.eqns.vars.forEach((VarElement) => {
      vars[VarElement.LatexForm] = VarElement.VarCurrent;
    });

    let calcedArr = NewDiffEquationSolver({
      method: this.config.method,
      h: this.config.h,
      numberOfCycles: this.config.numOfCycles,
      eqns: this.eqns.parsedEqns,
      vars: vars, // { K_1=0.27}
      LineNames: this.config.lineNames,
      initialConditions: this.config.initialConditions, // y1
      t0: this.config.t0,
    });

    return calcedArr;
  };
  getTimeTaken = () => {
    let t_0 = performance.now();
    this.solveDiffEqns();

    let t_1 = performance.now();

    let time_difference = t_1 - t_0;

    return time_difference;
  };

  returnConstructorObj = () => {
    return {
      key: this.key,
      config: this.config,
      eqns: this.eqns,
      solutions: this.solutions,
      meta: this.meta,
    };
  };
}
