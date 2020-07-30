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
import allData from "../SampleEquations/allData.json";
import { Paper, Select, MenuItem } from "@material-ui/core";
class SolverAnalysisGrapher extends Component {
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
    methodFilterChoice: "Euler",
    eqnFilterChoice: "ALL",
    scatterChart: <p>its loading soon</p>,
  };

  onClickGraphDataPoint = (e) => {
    let graphArrXY = this.getSolutionForGraph(e.dataPoint.label); //returns calced and actual arr

    let allGraphObjXY = [];

    graphArrXY.forEach((graph) => {
      let graphObjXY = [];

      for (let i = 0; i < graph.length; i++) {
        graphObjXY.push({ x: graph[i][1], y: graph[i][0] });
      }
      allGraphObjXY.push(graphObjXY);
    });

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

  getSolutionForGraph = (label) => {
    //read locally from now on

    for (let i = 0; i < allData.length; i++) {
      if (allData[i].meta.name === label) {
        return [
          allData[i].solutions.calcedSolution,
          allData[i].solutions.actualSolution,
        ];
      }
    }
  };

  onChange = (name) => (event, value) => {
    this.setState({ [name]: event.target.value });
  };
  render() {
    let allEqns = new Set();

    let xYObjScatterGraph = [];

    for (let i = 0; i < allData.length; i++) {
      console.log(allData[i].eqns.textEqns[0])
      allEqns.add(allData[i].eqns.textEqns[0]);
      let tm = parseFloat(
        (allData[i].solutions.timeTaken * 1000).toPrecision(3)
      );
      if (tm < 400) {
        
        if (allData[i].config.method != this.state.methodFilterChoice && this.state.methodFilterChoice != 'ALL') {
          continue;
        }

        if (allData[i].eqns.textEqns[0] != this.state.eqnFilterChoice && this.state.eqnFilterChoice != 'ALL') {
          continue;
        }
        xYObjScatterGraph.push({
          x: tm,
          y: parseFloat(allData[i].solutions.rmse.toPrecision(3)),
          label: allData[i].meta.name,
          color: this.state.scatterColours[i % this.state.integrators.length],
          click: this.onClickGraphDataPoint,
        });
      }
    }
    console.log(allEqns)

    return (
      <div className={classes.HeatMaps}>
        <div className={classes.formControl}></div>
        <Paper className={classes.HeatMap} elevation={3}>
          <Select
            value={this.state.eqnFilterChoice}
            onChange={this.onChange("eqnFilterChoice")}
          >
            <MenuItem value="ALL">ALL</MenuItem>
            {Array.from(allEqns).map((eqn) => (
              <MenuItem value={eqn}>{eqn}</MenuItem>
            ))}

          </Select>
          <Select
            value={this.state.methodFilterChoice}
            onChange={this.onChange("methodFilterChoice")}
          >
            <MenuItem value="ALL">ALL</MenuItem>
            {this.state.integrators.map((method) => (
              <MenuItem value={method}>{method}</MenuItem>
            ))}
          </Select>

          <ScatterChart
            LineNames={"time taken vs rmse"}
            dataPoints={xYObjScatterGraph}
            axisNames={["time taken (ns)", "rmse"]}
            verticalAlign={"top"}
            horizontalAlign={"left"}
          />
        </Paper>

        <Paper className={classes.HeatMap} elevation={3}>
          {this.state.lineChartActualAndCalced}
        </Paper>
      </div>
    );
  }
}

export default SolverAnalysisGrapher;
