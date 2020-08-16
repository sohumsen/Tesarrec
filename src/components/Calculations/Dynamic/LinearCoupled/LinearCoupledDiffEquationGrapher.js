import React from "react";
import MyChart from "../../../UI/Canvas/LineChart";
import { CSVLink } from "react-csv";

import { Tooltip, IconButton, Paper } from "@material-ui/core";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import LinearCoupledDiffEquationSolver from "./LinearCoupledDiffEquationSolver";
import NewDiffEquationSolver from "./NewDiffEquationSolver";
import Table from "../../../UI/Table/Table";
import classes from "./LinearCoupledDiffEquationGrapher.module.css";
//DyByDx= x+3y

const LinearCoupledDiffEquationGrapher = (props) => {
  /**
   * A method component that takes in a equation and outputs a chart
   */

  const plotGraphs = (allEqnArr) => {
    let allXCoord = [];
    let allYCoord = [];

    allEqnArr.forEach((EqnArr) => {
      let axis = [props.modelObj.Config.xAxis, props.modelObj.Config.yAxis]; //x,y  or t,a
      let allData = [];
      for (
        let index = 0;
        index < props.modelObj.Config.lineNames.length;
        index++
      ) {
        let yData = [];
        EqnArr[index].forEach((coord) => {
          yData.push(coord.y);
        });
        allData.push(yData);
      }
      let tData = [];
      EqnArr[0].forEach((coord) => {
        tData.push(coord.x);
      });
      allData.push(tData);
      let xCoord = [];
      let yCoord = [];

      if (axis[0] === "t" && axis[1] === "t") {
        //fix this
        xCoord = allData[allData.length - 1]; //t coord
        yCoord = allData[allData.length - 1]; //t coord
      } else if (axis[0] === "t") {
        xCoord = allData[allData.length - 1]; //t coord
        yCoord = allData[props.modelObj.Config.lineNames.indexOf(axis[1])];
      } else if (axis[1] === "t") {
        xCoord = allData[props.modelObj.Config.lineNames.indexOf(axis[0])];
        yCoord = allData[allData.length - 1]; //t coord
      } else {
        xCoord = allData[props.modelObj.Config.lineNames.indexOf(axis[0])];
        yCoord = allData[props.modelObj.Config.lineNames.indexOf(axis[1])];
      }
      var csvData = [["x", "y"]];
      console.log(xCoord, yCoord, csvData, axis);
      for (let i = 0; i < xCoord.length; i++) {
        csvData.push([xCoord[i], yCoord[i]]);
      }

      allXCoord.push(xCoord);
      allYCoord.push(yCoord);
    });

    var csvData = [["x", "y"]];
    return (
      <div>
        <CSVLink data={csvData}>
          <Tooltip title="Download model" placement="top">
            <span>
              <IconButton edge="end" aria-label="Download">
                <ImportExportIcon />
              </IconButton>
            </span>
          </Tooltip>
        </CSVLink>

        <MyChart
          dataPoints={[
            FormatTwoArraysIntoCoordObject(allXCoord[0], allYCoord[0]),
            FormatTwoArraysIntoCoordObject(allXCoord[0], allYCoord[1]),
          ]}
          LineNames={["old method", "new method"]}
          axisNames={[props.modelObj.Config.xAxis, props.modelObj.Config.yAxis]}
          horizontalAlign={props.modelObj.Config.LegendHorizontal}
          verticalAlign={props.modelObj.Config.LegendVertical}
        />
      </div>
    );
  };

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

  const FormatArrayLinearCoupled = (arr) => {
    let returnedArr = [];

    for (let j = 0; j < props.modelObj.Config.lineNames.length; j++) {
      let EqnArr = [];
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        EqnArr.push({
          x: parseFloat(
            (i * props.modelObj.Config.h).toFixed(
              props.modelObj.Config.DecimalPrecision
            )
          ),
          y: parseFloat(
            element[j].toFixed(props.modelObj.Config.DecimalPrecision)
          ),
        });
      }
      returnedArr.push(EqnArr);
    }
    return returnedArr;
  };

  //let computedResults = LinearCoupledDiffEquationSolver(props)
  let t0 = performance.now();

  let vars = {};

  let newcomputedResults = props.computedResults.map((row) =>
    row.map((num) =>
      parseFloat(num.toFixed(props.modelObj.Config.DecimalPrecision))
    )
  ); //NewDiffEquationSolver(props);
  console.log(newcomputedResults);
  // let newEqnArr = FormatArrayLinearCoupled(newcomputedResults);
  // console.log(newEqnArr);

  let objOfCoords = {};
  let order = [...props.modelObj.Config.lineNames, "t"];

  for (let i = 0; i < newcomputedResults.length; i++) {
    objOfCoords[order[i]] = newcomputedResults.map(function (value) {
      return value[i];
    });
  }
  // newcomputedResults.map((row) => {
  //   for (let i = 0; i < order.length; i++) {
  //     order2[order[i]] = row[i];
  //   }
  // });
  // [
  //   {a:2,t:1},
  //   {a:3,t:4}
  // ]
  let order3 = [];

  for (let i = 0; i < newcomputedResults.length; i++) {
    let order2 = {};

    for (let j = 0; j < newcomputedResults[i].length; j++) {
      order2[order[j]] = newcomputedResults[i][j];
    }
    order3.push(order2);
  }
  console.log(order3);

  // if (props.modelObj.Config.xAxis!=="t"){

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
          horizontalAlign={props.modelObj.Config.LegendHorizontal}
          verticalAlign={props.modelObj.Config.LegendVertical}
        />
      </Paper>

      <Paper elevation={3}  className={classes.Table}>
        <Table rows={order3} columns={order} />
      </Paper>
    </div>
  );
  // return (
  //   <MyChart
  //     EulerData={newEqnArr[1]}
  //     MidpointData={oldEqnArr[1]}
  //     LineNames={["a", "b"]}
  //     axisNames={["a", "b"]}
  //     horizontalAlign={props.LegendHorizontal}
  //     verticalAlign={props.LegendVertical}
  //   />
  // );

  // return plotGraphs([newEqnArr, newEqnArr]);
};

export default LinearCoupledDiffEquationGrapher;
