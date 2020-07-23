import NewDiffEquationSolver from "./NewDiffEquationSolver";
import master from "../SampleEquations/master";
import linear1 from "../SampleEquations/SingleODE/linear1.json";
import linear2 from "../SampleEquations/SingleODE/linear2.json";
import linear3 from "../SampleEquations/SingleODE/linear3.json";
import linear4 from "../SampleEquations/SingleODE/linear4.json";
import linear5 from "../SampleEquations/SingleODE/linear5.json";

describe("<NewDiffEquationSolverAnalysis/>", () => {
  it("should analyse a differential eqn ", () => {
    const getCalcedArr = (linear, method) => {
      let stuff = master(linear);

      let t_0 = performance.now();

      let calcedArr = NewDiffEquationSolver({
        method: method,
        h: stuff.h,
        numberOfCycles: stuff.numOfCylcles - 1,
        eqns: stuff.eqns,
        vars: stuff.vars, // { K_1=0.27}
        LineNames: stuff.lineNames,
        initialConditions: stuff.initialConditions, // y1
        t0: stuff.t0,
      });

      let t_1 = performance.now();

      let time_difference = t_1 - t_0;

      return [
        method,
        calcRMSE(calcedArr, stuff.actualSolutionArr),
        time_difference,
      ];
    };

    const calcRMSE = (calcedResults, actualResults) => {
      let errorArr = [];
      for (let i = 0; i < calcedResults.length; i++) {
        let calced = calcedResults[i][0];
        let actual = actualResults[i][0];
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
    };

    let integrators = [
      "Euler",
      "Midpoint",
      "Heun",
      "Ralston",
      "K3",
      "SSP33",
      "SSP43",
      "RK4",
      "RK38",
      "RK6",
    ];

    let models = [linear1, linear2, linear3, linear4];

 
    models.forEach((model) => {
      integrators.forEach((method) => {
        allMethodsLinear.push(getCalcedArr(model, method));
      });
    });

    //console.log(allMethodsLinear1);
    console.log(allMethodsLinear);
    // expect(calcedArr).toMatchSnapshot();
  });
});
