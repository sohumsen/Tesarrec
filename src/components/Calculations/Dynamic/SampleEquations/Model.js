import DEFAULTEQUATIONS from "./DEFAULTEQUATIONS";
import DEFAULTVARS from "./DEFAULTVARS";
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
    };
    this.eqns = {
      parsedEqns: this.parseEqns(inputModel.eqns),
      textEqns: inputModel.eqns,
      textSolvedEqns: inputModel.solved,
      parsedSolvedEqns: this.parseEqns(inputModel.solved),
      vars: inputModel.vars,
    };
    this.solutions = {
      actualSolution: this.generateActualSolutionArray(),
      calcedSolution: this.solveDiffEqns(),
      timeTaken: 0,


     
    };
    this.meta = {
        name: inputModel.eqns.join() + "," + method,
        description: "Please add a description",
        rmse:this.calcRMSE(),

      };

  }

  calcRMSE() {
      console.log(this.solutions)
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
    let c = parse(expressionString).toString();
    let result = a.replace(/\/\//g, "/");

    console.log(a, result);
  }
  validateExpression = () => {
    let scope = {};
    this.config.lineNames.forEach((lineName) => {
      scope[lineName] = 1;
    });
    this.eqns.vars.forEach((Var) => {
      scope[Var] = 1;
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
    let actualSolutionArr = [];

    this.eqns.parsedSolvedEqns.forEach((parsedEqn) => {
      for (let i = 0; i < this.config.numOfCycles; i++) {
        let t = this.config.t0 + i * this.config.h;
        //   let a =fileObj.lineNames[0]
        let y = parsedEqn.evaluate({
          t: t,
          // a:4
          // y: y,
        });
        //let y = t
        actualSolutionArr.push([y, t]);
      }
    });

    return actualSolutionArr;
  };

 

  solveDiffEqns = () => {

    let t_0 = performance.now();

    let calcedArr =NewDiffEquationSolver({
      method: this.config.method,
      h: this.config.h,
      numberOfCycles: this.config.numOfCycles - 1,
      eqns: this.eqns.parsedEqns,
      vars: this.eqns.vars, // { K_1=0.27}
      LineNames: this.config.lineNames,
      initialConditions: this.config.initialConditions, // y1
      t0: this.config.t0,
    });

    let t_1 = performance.now();


    let time_difference = t_1 - t_0;
    console.log(this.meta)

    let solutions={...this.solutions}

    solutions.timeTaken=time_difference
    console.log(solutions.timeTaken)

    this.solutions=solutions
        
    
    


    return calcedArr
  };
}
