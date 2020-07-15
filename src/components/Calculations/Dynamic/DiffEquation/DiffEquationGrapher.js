import React from "react";
import MyChart from "../../../UI/Canvas/LineChart";
import DiffEquationSolver from "./DiffEquationSolver";

const DiffEquationGrapher = (props) => {

  let solver = DiffEquationSolver(props)
 
  

  const ShowGraph = (Euler, Midpoint, RungeKutta) => {
    return (
      <div>
        <div>
          <MyChart
            LineNames={props.LineNames}
            EulerData={Euler}
            MidpointData={Midpoint}
            RungeKuttaData={RungeKutta}
            eqn={props.eqn}
            axisNames={["x", "y"]}
            horizontalAlign={props.LegendHorizontal}
            verticalAlign={props.LegendVertical}
          />
        </div>

        {/*
            <div className={classes.Table}>
            <Table rowData={Euler} />
            </div>
            <div className={classes.Table}>
            <Table rowData={Midpoint} />
            </div>
            <div className={classes.Table}>
            <Table rowData={RungeKutta} />
            </div>
            */}
      </div>
    );
  };

  const FormatArray = (arr) => {

    let newCompletedGid = [];

    arr.forEach((element) => {
      element.forEach((e) => {
        newCompletedGid.push(parseFloat(e.toFixed(props.DecimalPrecision)));
      });
    });

    let TwoDcompletedGrid = [];

    while (newCompletedGid.length)
      TwoDcompletedGrid.push(newCompletedGid.splice(0, 3));

    let GraphDataXY = [];

    TwoDcompletedGrid.forEach((element) =>
      GraphDataXY.push({ x: parseFloat(element[0]), y: parseFloat(element[1]) })
    );
    return GraphDataXY;
  };

  return ShowGraph(
    FormatArray(solver.Euler),
    FormatArray(solver.MidPoint),
    FormatArray(solver.RungaKutta),
    
  );
  
};

export default DiffEquationGrapher;
