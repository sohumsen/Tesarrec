import React from "react";
import MyChart from "../../../UI/Canvas/LineChart";
import { CSVLink } from "react-csv";

import { Tooltip, IconButton } from "@material-ui/core";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import LinearCoupledDiffEquationSolver from "./LinearCoupledDiffEquationSolver";
import NewDiffEquationSolver from "./NewDiffEquationSolver";

//DyByDx= x+3y

const LinearCoupledDiffEquationGrapher = (props) => {
  /**
   * A method component that takes in a equation and outputs a chart
   */

 

  const plotGraphs = (allEqnArr) => {
    let allXCoord = [];
    let allYCoord = [];

    allEqnArr.forEach((EqnArr) => {
      let axis = props.axis; //x,y  or t,a
      let allData = [];
      for (let index = 0; index < props.LineNames.length; index++) {
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
        yCoord = allData[props.LineNames.indexOf(axis[1])];
      } else if (axis[1] === "t") {
        xCoord = allData[props.LineNames.indexOf(axis[0])];
        yCoord = allData[allData.length - 1]; //t coord
      } else {
        xCoord = allData[props.LineNames.indexOf(axis[0])];
        yCoord = allData[props.LineNames.indexOf(axis[1])];
      }
      var csvData = [["x", "y"]];
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
          axisNames={props.axis}
          horizontalAlign={props.LegendHorizontal}
          verticalAlign={props.LegendVertical}
        />
        <p>dfhsjdshfkj</p>
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
    for (let j = 0; j < props.LineNames.length; j++) {
      let EqnArr = [];
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        EqnArr.push({
          x: parseFloat((i * props.h).toFixed(props.DecimalPrecision)),
          y: parseFloat(element[j].toFixed(props.DecimalPrecision)),
        });
      }
      returnedArr.push(EqnArr);
    }
    return returnedArr;
  };

  //let computedResults = LinearCoupledDiffEquationSolver(props)

  let newcomputedResults = NewDiffEquationSolver(props);
  let newEqnArr = FormatArrayLinearCoupled(newcomputedResults);
  let oldcomputedResults = LinearCoupledDiffEquationSolver(props);
  let oldEqnArr = FormatArrayLinearCoupled(oldcomputedResults);

  // let actualSolutions = props.ActualSolution
  // let ActualSolnsArr = FormatArrayLinearCoupled(
  //   actualSolutions
  // );


  let errorArr = [];
  for (let index = 0; index < props.numberOfCycles; index++) {
    let calced = newcomputedResults[index][0];
    let actual = oldcomputedResults[index][0];
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

  return plotGraphs([newEqnArr, oldEqnArr]);
};

export default LinearCoupledDiffEquationGrapher;
