import React from "react";
import MyChart from "../../../UI/Canvas/Charts/Chart";
import { CSVLink, CSVDownload } from "react-csv";

import { parse, simplify } from "mathjs";
import { Tooltip, IconButton } from "@material-ui/core";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import LinearCoupledDiffEquationSolver from "./LinearCoupledDiffEquationSolver";

//DyByDx= x+3y

const LinearCoupledDiffEquationGrapher = (props) => {
  /**
   * A method component that takes in a equation and outputs a chart
   */

  

  const ShowLinearCoupledGraph = (EqnArr) => {
    let axis = props.axis; //x,y

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
    if (axis[0] === "t") {
      xCoord = allData[allData.length - 1]; //t coord
      yCoord = allData[props.LineNames.indexOf(axis[1])];
    } else if (axis[1] === "t") {
      xCoord = allData[props.LineNames.indexOf(axis[0])];
      yCoord = allData[allData.length - 1]; //t coord
    } else if (axis[0] === "t" && axis[1] === "t") {
      //fix this
      xCoord = allData[allData.length - 1]; //t coord
      yCoord = allData[allData.length - 1]; //t coord
    } else {
      xCoord = allData[props.LineNames.indexOf(axis[0])];
      yCoord = allData[props.LineNames.indexOf(axis[1])];
    }
    let csvData = [["x", "y"]];
    for (let i = 0; i < xCoord.length; i++) {
      csvData.push([xCoord[i], yCoord[i]]);
    }

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
          EulerData={FormatTwoArraysIntoCoordObject(xCoord, yCoord)}
          LineNames={axis[1]}
          axisNames={axis}
          horizontalAlign={props.LegendHorizontal}
          verticalAlign={props.LegendVertical}
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

  let computedResults = LinearCoupledDiffEquationSolver(props)

  let EqnArr = FormatArrayLinearCoupled(
    computedResults[0]
  );

  return ShowLinearCoupledGraph(EqnArr);
};

export default LinearCoupledDiffEquationGrapher;
