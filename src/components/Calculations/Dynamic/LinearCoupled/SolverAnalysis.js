import React, { Component } from "react";

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
import ScatterChart from "../../../UI/Canvas/ScatterChart.js";
// const writeJsonFile = require("write-json-file");
import allMethodsLinear from "./allMethodsLinear.json";
import LineChart from "../../../UI/Canvas/LineChart.js";
import { Paper } from "@material-ui/core";
class SolverAnalysis extends Component {
  state = {
    integrators: [
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
    ],
    models: [linear1, linear2, linear3, linear4, linear5],
    scatterColours: [
      "Indigo",
      "Red",
      "Blue",
      "Green",
      "Pink",
      "Orange",
      "Black",
      "Yellow",
      "Purple",
      "Grey",
    ],
    lineChartActualAndCalced: null,
  };
  HeatMapChangedOnClick = (x, y, value) => {
    // let idx = isItemInArray(RMSEArrSliced, value);
    // console.log(getSolutionForGraph(models[idx], integrators[x]));
    // (async () => {
    //   await writeJsonFile("foo.json", { foo: true });
    // })();
    // handleSaveToPC({ foo: true })
    // for (let l = 0; l < dataArr.length; l++) {
    //   data.push({
    //     x: l,
    //     y: parseFloat(dataArr[l].toFixed(2)),
    //   });
    // }
  };

  onClickGraphDataPoint = (e) => {
    console.log(e.dataPoint.label);
    console.log(e.dataPoint.label.split(",")[0]);

    let graphArrXY = this.getSolutionForGraph(
      e.dataPoint.label.split(",")[0],
      e.dataPoint.label.split(",")[1]
    ); //returns calced and actual arr

    let allGraphObjXY = [];
    console.log(graphArrXY);

    graphArrXY.forEach((graph) => {
      let graphObjXY = [];

      for (let i = 0; i < graph.length; i++) {
        graphObjXY.push({ x: graph[i][1], y: graph[i][0] });
      }
      console.log(graphObjXY);
      allGraphObjXY.push(graphObjXY);
    });

    console.log(this.state.lineChartActualAndCalced);
    console.log(allGraphObjXY);

    this.setState({
      lineChartActualAndCalced: (
        <LineChart
          LineNames={["calculated", "actual"]}
          axisNames={["x", "y"]}
          dataPoints={[allGraphObjXY[0], allGraphObjXY[1]]}
          verticalAlign={"top"}
          horizontalAlign={"left"}
          title={e.dataPoint.label}

        />
      ),
    });
  };

  handleSaveToPC = (jsonData) => {
    const fileData = JSON.stringify(jsonData);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "filename.json";
    link.href = url;
    link.click();
  };

  isItemInArray = (array, item) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === item[0]) {
        return i; // Found it
      }
    }
  };

  getSolutionForGraph = (eqnText, method) => {
    console.log(eqnText, method);
    for (let i = 0; i < this.state.models.length; i++) {
      if (this.state.models[i].eqns[0] === eqnText) {
        let stuff = master(this.state.models[i]);
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
      }
    }
  };

  getCalcedArr = (linear, method) => {
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

    return [this.calcRMSE(calcedArr, stuff.actualSolutionArr), time_difference];
  };

  calcRMSE = (calcedResults, actualResults) => {
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

  // let allMethodsLinear = [];
  // models.forEach((model) => {
  //   integrators.forEach((method) => {
  //     allMethodsLinear.push(getCalcedArr(model, method));
  //   });
  // });

  render() {
    let textEqns = [];
    this.state.models.forEach((model) => {
      textEqns.push(...model.eqns);
    });

    let RMSEArr = [];
    let timeArr = [];

    allMethodsLinear.forEach((eqnMethod) => {
      RMSEArr.push((eqnMethod[0] * 1000).toPrecision(3));
    });
    allMethodsLinear.forEach((eqnMethod) => {
      timeArr.push((eqnMethod[1] * 1000).toPrecision(3));
    });
    //discard greater than 500ns
    let xYObjScatterGraph = [];

    for (let i = 0; i < timeArr.length; i++) {
      if (!(parseFloat(timeArr[i]) > 400)) {
        xYObjScatterGraph.push({
          x: parseFloat(timeArr[i]),
          y: parseFloat(RMSEArr[i]),
          label:
            textEqns[Math.floor(i / this.state.integrators.length)] +
            "," +
            this.state.integrators[i % this.state.integrators.length],
          color: this.state.scatterColours[i % this.state.integrators.length],
          click: this.onClickGraphDataPoint,
        });
      }
    }

    // const RMSEArrSliced = [];
    // while (RMSEArr.length)
    //   RMSEArrSliced.push(RMSEArr.splice(0, integrators.length));

    // const timeArrSliced = [];
    // while (timeArr.length)
    //   timeArrSliced.push(timeArr.splice(0, integrators.length));

    // console.log(timeArrSliced);

    // let RMSEHeatmap = RMSEArrSliced.map((RMSEArr, i) => {
    //   return (
    //     <MyHeatMap
    //       xLabels={integrators}
    //       yLabels={[textEqns[i]]}
    //       data={[RMSEArr]}
    //       color={"rgba(0, 240, 40"}
    //       HeatMapChangedOnClick={HeatMapChangedOnClick}
    //     />
    //   );
    // });

    // let timeHeatmap = timeArrSliced.map((TimeArr, i) => {
    //   return (
    //     <MyHeatMap
    //       xLabels={integrators}
    //       yLabels={[""]}
    //       data={[TimeArr]}
    //       color={"rgba(240, 0, 40"}
    //       HeatMapChangedOnClick={HeatMapChangedOnClick}
    //     />
    //   );
    // });
    console.log(this.state.lineChartActualAndCalced);

    return (
      <div className={classes.HeatMaps}>
        {/* <div className={classes.HeatMap}>{RMSEHeatmap}</div> */}
        <br />
        {/* <div className={classes.HeatMap}>{timeHeatmap}</div> */}
        <Paper className={classes.HeatMap} elevation={3}>
          <ScatterChart
            LineNames={"time taken vs rmse"}
            dataPoints={xYObjScatterGraph}
            axisNames={["time taken (ns)", "rmse"]}
          />
        </Paper>

        <Paper className={classes.HeatMap} elevation={3}>
          {this.state.lineChartActualAndCalced}
        </Paper>
      </div>
    );
  }
}

export default SolverAnalysis;
