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
      //LATEX EQNS,id,errormessage,line,dybydlatex
      textSolvedEqns: inputModel.solved,
      parsedSolvedEqns: this.parseEqns(inputModel.solved),
      vars: inputModel.vars,
    };
    this.solutions = {
      actualSolution: this.generateActualSolutionArray(),
      calcedSolution: this.solveDiffEqns(),
    };
    this.meta = {
      name: inputModel.eqns.join() + "," + method,
      description: "Please add a description",
      rmse: this.calcRMSE(),
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

  // {
  //   "actualSolution": [
  //     [
  //       2,
  //       0
  //     ],
  //     [
  //       20,
  //       0
  //     ],
  //     [
  //       2.2377431645136348,
  //       0.1
  //     ],
  //     [
  //       20.97233709997662,
  //       0.1
  //     ],
  //     [
  //       2.491560255652405,
  //       0.2
  //     ],
  //     [
  //       21.99072747380166,
  //       0.2
  //     ],
  //     [
  //       2.7623672863694706,
  //       0.30000000000000004
  //     ],
  //     [
  //       23.057310614798233,
  //       0.30000000000000004
  //     ],
  //     [
  //       3.051128264578707,
  //       0.4
  //     ],
  //     [
  //       24.174323942431293,
  //       0.4
  //     ],
  //     [
  //       3.358857584940467,
  //       0.5
  //     ],
  //     [
  //       25.344107231823525,
  //       0.5
  //     ],
  //     [
  //       3.6866225359320737,
  //       0.6000000000000001
  //     ],
  //     [
  //       26.569107241717358,
  //       0.6000000000000001
  //     ],
  //     [
  //       4.035545927629183,
  //       0.7000000000000001
  //     ],
  //     [
  //       27.85188254970305,
  //       0.7000000000000001
  //     ],
  //     [
  //       4.406808845875062,
  //       0.8
  //     ],
  //     [
  //       29.19510860392229,
  //       0.8
  //     ],
  //     [
  //       4.801653538777139,
  //       0.9
  //     ],
  //     [
  //       30.60158300086326,
  //       0.9
  //     ]
  //   ],
  //   "calcedSolution": [
  //     [
  //       5,
  //       20,
  //       0
  //     ],
  //     [
  //       5.360175466666667,
  //       20.97233706666667,
  //       0.1
  //     ],
  //     [
  //       5.741421415893732,
  //       21.990727404194708,
  //       0.2
  //     ],
  //     [
  //       6.144857773894459,
  //       23.05731050570796,
  //       0.30000000000000004
  //     ],
  //     [
  //       6.57166078369811,
  //       24.174323790460367,
  //       0.4
  //     ],
  //     [
  //       7.023065736556937,
  //       25.344107033351218,
  //       0.5
  //     ],
  //     [
  //       7.5003698324981025,
  //       26.569106992886493,
  //       0.6
  //     ],
  //     [
  //       8.004935176012307,
  //       27.85188224640622,
  //       0.7
  //     ],
  //     [
  //       8.538191913144919,
  //       29.19510824178734,
  //       0.7999999999999999
  //     ],
  //     [
  //       9.101641516541696,
  //       30.601582575237977,
  //       0.8999999999999999
  //     ]
  //   ]
  // }

  generateActualSolutionArray = () => {
    // let actualSolutionArr = [];

    const func = (t, y) => {
      let eqnResultsArr = [];

      let coordinate = {}; //t initial value
      //generates the eval object
      for (let i = 0; i < y.length; i++) {
        coordinate[this.config.lineNames[i]] = y[i]; // { a, b , c}
      }

      coordinate["t"] = t // { a, b , c, t}

      for (let i = 0; i < this.eqns.vars.length; i++) {
        coordinate[this.eqns.vars[i].LatexForm] = this.eqns.vars[i].VarCurrent;
      }
      for (let idx = 0; idx < this.eqns.parsedSolvedEqns.length; idx++) {
        eqnResultsArr.push(
          this.eqns.parsedSolvedEqns[idx].evaluate(coordinate)
        ); // { a :1 , b: 3.3,t:3}
      }

      return eqnResultsArr
    };
    let t0 = parseFloat(this.config.t0);

    let returnedY = this.config.initialConditions.slice();

    let _returnedY = returnedY.slice();

    _returnedY.push(t0);
    let allY = [_returnedY];



    for (let i = 0; i < this.config.numOfCycles; i++) {
      returnedY = func(t0,returnedY);
      t0 += this.config.h; // constant step size

      

  
      allY.push([...returnedY, t0]);
    }
 
    return allY
  };

  solveDiffEqns = () => {
    let calcedArr = NewDiffEquationSolver({
      method: this.config.method,
      h: this.config.h,
      numberOfCycles: this.config.numOfCycles ,
      eqns: this.eqns.parsedEqns,
      vars: this.eqns.vars, // { K_1=0.27}
      LineNames: this.config.lineNames,
      initialConditions: this.config.initialConditions, // y1
      t0: this.config.t0,
    });

    return calcedArr;
  };
  getTimeTaken = () => {
    let t_0 = performance.now();

    let calcedArr = NewDiffEquationSolver({
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
