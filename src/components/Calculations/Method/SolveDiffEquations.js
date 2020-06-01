import React from "react";
import MyChart from "../../UI/Canvas/Charts/Chart";

import { parse, simplify } from "mathjs";

//DyByDx= x+3y

const SolveDiffEquations = (props) => {
  /**
   * A method component that takes in a equation and outputs a chart
   */
  const simplifiedNormal = simplify(parse(props.eqn));

  //console.log(eval(props.eqn));

  const DyByDxFunc = (x, y) => {
    // eslint-disable-next-line

    return simplifiedNormal.evaluate({ x: x, y: y });
  };


  const SolveForRthMidpoint_READABLE = (x_0, y_0, h) => {
    let k1 = h * DyByDxFunc(x_0, y_0);
    let k2 = h * DyByDxFunc(x_0 + h / 2, y_0 + k1 / 2);
    let Y1 = y_0 + k2;
    let X1 = x_0 + h;
    return [X1, Y1, h];
  };


  const SolveForRthMidpoint = (X0Y0hArr) => {
    let k1 = X0Y0hArr[2] * DyByDxFunc(X0Y0hArr[0], X0Y0hArr[1]);
    let k2 =
      X0Y0hArr[2] *
      DyByDxFunc(X0Y0hArr[0] + X0Y0hArr[2] / 2, X0Y0hArr[1] + k1 / 2);
    let Y1 = X0Y0hArr[1] + k2;

    let X1 = X0Y0hArr[0] + X0Y0hArr[2];

    return [X1, Y1, X0Y0hArr[2]];
  };

  const SolveForRthEuler = (X0Y0hArr) => {
    let Y1 = X0Y0hArr[1] + X0Y0hArr[2] * DyByDxFunc(X0Y0hArr[0], X0Y0hArr[1]);

    let X1 = X0Y0hArr[0] + X0Y0hArr[2];

    return [X1, Y1, X0Y0hArr[2]];
  };

  const SolveForRthRungeKutta = (X0Y0hArr) => {
    let k1 = X0Y0hArr[2] * DyByDxFunc(X0Y0hArr[0], X0Y0hArr[1]);
    let k2 =
      X0Y0hArr[2] *
      DyByDxFunc(X0Y0hArr[0] + X0Y0hArr[2] / 2, X0Y0hArr[1] + k1 / 2);
    let k3 =
      X0Y0hArr[2] *
      DyByDxFunc(X0Y0hArr[0] + X0Y0hArr[2] / 2, X0Y0hArr[1] + k2 / 2);
    let k4 =
      X0Y0hArr[2] * DyByDxFunc(X0Y0hArr[0] + X0Y0hArr[2], X0Y0hArr[1] + k3);

    let Y1 = X0Y0hArr[1] + k1 / 6 + k2 / 3 + k3 / 3 + k4 / 6;

    let X1 = X0Y0hArr[0] + X0Y0hArr[2];

    return [X1, Y1, X0Y0hArr[2]];
  };

  const recursive = (numberOfLoops, Arr, method) => {
    for (let i = 0; i < numberOfLoops; i++) {
      if (method === "RungeKutta") {
        Arr = SolveForRthRungeKutta(Arr);
      } else if (method === "Midpoint") {
        Arr = SolveForRthMidpoint(Arr);
      } else if (method === "Euler") {
        Arr = SolveForRthEuler(Arr);
      }
    }
    return Arr;
  };

  const ShowGraph = (Euler, Midpoint, RungeKutta) => {
    return (
      <div>
        <div >
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
        newCompletedGid.push(e.toFixed(2));
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

  let Y0 = parseFloat(props.Y0);
  let X0 = parseFloat(props.X0);
  let h = parseFloat(props.h);

  let X0Y0hArr = [X0, Y0, h];

  let CompletedGridEuler = [];
  let CompletedGridMidpoint = [];
  let CompletedGridRungeKutta = [];

  //SolveForRth(SolveForRth(Y0,h,X0))
  for (let i = 1; i <= props.numberOfCycles; i++) {
    CompletedGridEuler.push(recursive(i, X0Y0hArr, "Euler"));
    CompletedGridMidpoint.push(recursive(i, X0Y0hArr, "Midpoint"));
    CompletedGridRungeKutta.push(recursive(i, X0Y0hArr, "RungeKutta"));
  }

  return ShowGraph(
    FormatArray(CompletedGridEuler),
    FormatArray(CompletedGridMidpoint),
    FormatArray(CompletedGridRungeKutta)
  );
};

export default SolveDiffEquations;
