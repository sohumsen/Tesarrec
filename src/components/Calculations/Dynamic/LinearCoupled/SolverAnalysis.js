import React from "react";

import NewDiffEquationSolver from "./NewDiffEquationSolver";
import master from "../SampleEquations/master";
import linear1 from "../SampleEquations/SingleODE/linear1.json";
import linear2 from "../SampleEquations/SingleODE/linear2.json";
import linear3 from "../SampleEquations/SingleODE/linear3.json";
import linear4 from "../SampleEquations/SingleODE/linear4.json";
import linear5 from "../SampleEquations/SingleODE/linear5.json";
import MyHeatMap from "../../../UI/MyHeatMap/MyHeatMap";
import EqnItem from "../../../UI/Eqns/EqnItem";
import classes from "./SolverAnalysis.module.css";

const SolverAnalysis = () => {
  const HeatMapChangedOnClick = (x, y, value) => {
    console.log(x, y, value);
    let idx = isItemInArray(RMSEArrSliced, value);
    console.log(getSolutionForGraph(models[idx], integrators[x]));
    for (let l = 0; l < dataArr.length; l++) {
      data.push({
        x: l,
        y: parseFloat(dataArr[l].toFixed(2)),
      });
    }
  };

  const isItemInArray = (array, item) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === item[0]) {
        return i; // Found it
      }
    }
  };

  const getSolutionForGraph = (linear, method) => {
    let stuff = master(linear);

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

    return [calcedArr, stuff.actualSolutionArr];
  };

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

    return [calcRMSE(calcedArr, stuff.actualSolutionArr), time_difference];
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

  let models = [linear1, linear2, linear3, linear4, linear5];
  let allMethodsLinear = [];
  models.forEach((model) => {
    integrators.forEach((method) => {
      allMethodsLinear.push(getCalcedArr(model, method));
    });
  });
  let textEqns = [];

  models.forEach((model) => {
    textEqns.push(...model.eqns);
  });
  console.log(allMethodsLinear);

  let RMSEArr = [];
  let timeArr = [];

  allMethodsLinear.forEach((eqnMethod) => {
    RMSEArr.push((eqnMethod[0] * 1000).toPrecision(3));
  });
  allMethodsLinear.forEach((eqnMethod) => {
    timeArr.push((eqnMethod[1] * 1000).toPrecision(3));
  });

  const RMSEArrSliced = [];
  while (RMSEArr.length)
    RMSEArrSliced.push(RMSEArr.splice(0, integrators.length));

  const timeArrSliced = [];
  while (timeArr.length)
    timeArrSliced.push(timeArr.splice(0, integrators.length));

  console.log(textEqns);

  let RMSEHeatmap = RMSEArrSliced.map((RMSEArr, i) => {
    console.log(RMSEArr);
    return (
      <MyHeatMap
        xLabels={integrators}
        yLabels={[textEqns[i]]}
        data={[RMSEArr]}
        color={"rgba(0, 240, 40"}
        HeatMapChangedOnClick={HeatMapChangedOnClick}
      />
    );
  });

  let timeHeatmap = timeArrSliced.map((TimeArr, i) => {
    console.log(TimeArr);
    return (
      <MyHeatMap
        xLabels={integrators}
        yLabels={[""]}
        data={[TimeArr]}
        color={"rgba(240, 0, 40"}
        HeatMapChangedOnClick={HeatMapChangedOnClick}
      />
    );
  });

  return (
    <div className={classes.HeatMaps}>
      <div className={classes.HeatMap}>{RMSEHeatmap}</div>
      <br />
      <div className={classes.HeatMap}>{timeHeatmap}</div>
    </div>
  );
};

export default SolverAnalysis;
