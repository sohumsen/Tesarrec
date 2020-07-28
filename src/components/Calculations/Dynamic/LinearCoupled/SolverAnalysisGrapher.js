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
import allData from "./allData.json";
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
    xYObjScatterGraph:{}
  };

  componentDidMount() {
    let RMSEArr = [];
    let timeArr = [];
    let nameArr = [];

    allData.forEach((obj) => {
      timeArr.push((obj.solutions.timeTaken * 1000).toPrecision(3));
      RMSEArr.push(obj.solutions.rmse.toPrecision(3));
      nameArr.push(obj.meta.name);
    });
    let xYObjScatterGraph = [];

    for (let i = 0; i < timeArr.length; i++) {
      if (parseFloat(timeArr[i]) < 400) {
        xYObjScatterGraph.push({
          x: parseFloat(timeArr[i]),
          y: parseFloat(RMSEArr[i]),
          label: nameArr[i],
          color: this.state.scatterColours[i % this.state.integrators.length],
          click: this.onClickGraphDataPoint,
        });
      }
    }

    this.setState({xYObjScatterGraph:xYObjScatterGraph})
  }

  onClickGraphDataPoint = (e) => {
    console.log(e.dataPoint.label);
    console.log(e.dataPoint.label.split(",")[0]);

    // let graphArrXY = this.getSolutionForGraph(
    //   e.dataPoint.label.split(",")[0],
    //   e.dataPoint.label.split(",")[1]
    // ); //returns calced and actual arr

    // let allGraphObjXY = [];
    // console.log(graphArrXY);

    // graphArrXY.forEach((graph) => {
    //   let graphObjXY = [];

    //   for (let i = 0; i < graph.length; i++) {
    //     graphObjXY.push({ x: graph[i][1], y: graph[i][0] });
    //   }
    //   console.log(graphObjXY);
    //   allGraphObjXY.push(graphObjXY);
    // });

    // console.log(this.state.lineChartActualAndCalced);
    // console.log(allGraphObjXY);

    // this.setState({
    //   lineChartActualAndCalced: (
    //     <LineChart
    //       LineNames={["calculated", "actual"]}
    //       axisNames={["x", "y"]}
    //       dataPoints={[allGraphObjXY[0], allGraphObjXY[1]]}
    //       verticalAlign={"top"}
    //       horizontalAlign={"left"}
    //       title={e.dataPoint.label}

    //     />
    //   ),
    // });
  };

  getSolutionForGraph = (eqnText, method) => {
    //read locally from now on
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

  render() {
    // console.log(allData);
    // let RMSEArr = [];
    // let timeArr = [];
    // let nameArr = [];

    // allData.forEach((obj) => {
    //   timeArr.push((obj.solutions.timeTaken * 1000).toPrecision(3));
    //   RMSEArr.push(obj.solutions.rmse.toPrecision(3));
    //   nameArr.push(obj.meta.name);
    // });

    // // let RMSEArr = [];
    // // let timeArr = [];

    // // allMethodsLinear.forEach((eqnMethod) => {
    // //   RMSEArr.push((eqnMethod[0] * 1000).toPrecision(3));
    // // });
    // // allMethodsLinear.forEach((eqnMethod) => {
    // //   timeArr.push((eqnMethod[1] * 1000).toPrecision(3));
    // // });
    // //discard greater than 400ns
    // let xYObjScatterGraph = [];
    // // console.log(timeArr,allMethodsLinear)

    // for (let i = 0; i < this.state.timeArr.length; i++) {
    //   if (parseFloat(this.state.timeArr[i]) < 400) {
    //     xYObjScatterGraph.push({
    //       x: parseFloat(this.state.timeArr[i]),
    //       y: parseFloat(this.state.RMSEArr[i]),
    //       label: this.state.nameArr[i],
    //       color: this.state.scatterColours[i % this.state.integrators.length],
    //       click: this.onClickGraphDataPoint,
    //     });
    //   }
    // }

    // console.log(xYObjScatterGraph);
    // let allMethodsLinear1 = [];
    // this.state.models.forEach((model) => {
    //   this.state.integrators.forEach((method) => {
    //     allMethodsLinear1.push(this.getCalcedArr(model, method));
    //   });
    // });

    return (
      <div className={classes.HeatMaps}>
        <p>djsfhjdsf</p>

        <Paper className={classes.HeatMap} elevation={3}>
          <p>djsfhjdsf</p>
          <ScatterChart
            LineNames={"time taken vs rmse"}
            dataPoints={this.state.xYObjScatterGraph}
            axisNames={["time taken (ns)", "rmse"]}
          />
        </Paper>

        {/* <Paper className={classes.HeatMap} elevation={3}>
          {this.state.lineChartActualAndCalced}
        </Paper> */}
      </div>
    );
  }
}

export default SolverAnalysis;
