import React from "react";
import MyChart from "../../../UI/Canvas/LineChart";

import { Paper } from "@material-ui/core";

import Table from "../../../UI/Table/Table";
import classes from "./LinearCoupledDiffEquationGrapher.module.css";
//DyByDx= x+3y

const LinearCoupledDiffEquationGrapher = (props) => {
  /**
   * A method component that takes in a equation and outputs a chart
   */

  const FormatTwoArraysIntoCoordObject = (arr1, arr2) => {
    let returnedArr = [];
    for (let i = 0; i < arr1.length; i++) {
      let xCoord = arr1[i];
      let yCoord = arr2[i];
      returnedArr.push({
        x: xCoord,
        y: yCoord,
      });
    }
    return returnedArr;
  };

  let newcomputedResults = props.computedResults.map((row) =>
    row.map((num) =>
      parseFloat(num.toFixed(props.modelObj.Config.DecimalPrecision))
    )
  );
  let objOfCoords = {};
  let independentLatexForm = props.modelObj.Vars.find((el) => {
    return el.VarType === "Independent";
  }).LatexForm;
  let lineNames = props.modelObj.Vars.filter(
    (Var) => Var.VarType === "Dependent"
  ).map((Var) => Var.LatexForm);

  let order = [...lineNames, independentLatexForm];
  for (let i = 0; i < newcomputedResults.length; i++) {
    objOfCoords[order[i]] = newcomputedResults.map(function (value) {
      return value[i];
    });
  }

  let order3 = [];

  for (let i = 0; i < newcomputedResults.length; i++) {
    let order2 = {};

    for (let j = 0; j < newcomputedResults[i].length; j++) {
      order2[order[j]] = newcomputedResults[i][j];
    }
    order3.push(order2);
  }

  return (
    <div className={classes.Container}>
      <Paper elevation={3} className={classes.Graph}>
        <MyChart
          dataPoints={[
            FormatTwoArraysIntoCoordObject(
              objOfCoords[props.modelObj.Config.xAxis],
              objOfCoords[props.modelObj.Config.yAxis]
            ),
          ]}
          axisNames={[props.modelObj.Config.xAxis, props.modelObj.Config.yAxis]}
        />
      </Paper>

      <Paper elevation={3} className={classes.Table}>
        <Table rows={order3} columns={order} />
      </Paper>
    </div>
  );
};

export default LinearCoupledDiffEquationGrapher;
