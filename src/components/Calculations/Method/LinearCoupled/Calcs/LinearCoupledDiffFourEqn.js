import React from "react";
import MyChart from "../../../../UI/Canvas/Charts/Chart";

import { parse, simplify } from "mathjs";

//DyByDx= x+3y

const LinearCoupledDiffFourEqn = (props) => {
  /**
   * A method component that takes in a equation and outputs a chart
   */

  const simplified1 = simplify(parse(props.eqn1));

  const simplified2 = simplify(parse(props.eqn2));

  const simplified3 = simplify(parse(props.eqn3));

  const simplified4 = simplify(parse(props.eqn4));


  const DyByDxLinearCoupled = (Y1Y2Y3Arr) => {
    const eqn1Results = simplified1.evaluate({
      a: Y1Y2Y3Arr[0],
      b: Y1Y2Y3Arr[1],
      c: Y1Y2Y3Arr[2],
      d: Y1Y2Y3Arr[3],

    });
    //console.log("eqn1Results "+eqn1Results,Y1Y2Y3Arr)
    const eqn2Results = simplified2.evaluate({
      a: Y1Y2Y3Arr[0],
      b: Y1Y2Y3Arr[1],
      c: Y1Y2Y3Arr[2],
      d: Y1Y2Y3Arr[3],

    });
    //console.log("eqn2Results "+eqn2Results,Y1Y2Y3Arr)

    const eqn3Results = simplified3.evaluate({
      a: Y1Y2Y3Arr[0],
      b: Y1Y2Y3Arr[1],
      c: Y1Y2Y3Arr[2],
      d: Y1Y2Y3Arr[3],

    });

    const eqn4Results = simplified4.evaluate({
      a: Y1Y2Y3Arr[0],
      b: Y1Y2Y3Arr[1],
      c: Y1Y2Y3Arr[2],
      d: Y1Y2Y3Arr[3],

    });
    //console.log("eqn3Results "+eqn3Results,Y1Y2Y3Arr)

    let eqnResults = [eqn1Results, eqn2Results, eqn3Results, eqn4Results];

    return eqnResults;
  };
  const SolveLinearCoupledDifferentialEquationRungeKuttaForRth = (
    Y1Y2Y3Arr
  ) => {
    let eqnResults1 = DyByDxLinearCoupled(Y1Y2Y3Arr);
    let eqnResults2 = DyByDxLinearCoupled([
      Y1Y2Y3Arr[0] + (h / 2) * eqnResults1[0],
      Y1Y2Y3Arr[1] + (h / 2) * eqnResults1[1],
      Y1Y2Y3Arr[2] + (h / 2) * eqnResults1[2],
      Y1Y2Y3Arr[3] + (h / 2) * eqnResults1[3],

    ]);
    let eqnResults3 = DyByDxLinearCoupled([
      Y1Y2Y3Arr[0] + (h / 2) * eqnResults2[0],
      Y1Y2Y3Arr[1] + (h / 2) * eqnResults2[1],
      Y1Y2Y3Arr[2] + (h / 2) * eqnResults2[2],
      Y1Y2Y3Arr[3] + (h / 2) * eqnResults2[3],

    ]);
    let eqnResults4 = DyByDxLinearCoupled([
      Y1Y2Y3Arr[0] + h * eqnResults3[0],
      Y1Y2Y3Arr[1] + h * eqnResults3[1],
      Y1Y2Y3Arr[2] + h * eqnResults3[2],
      Y1Y2Y3Arr[3] + h * eqnResults3[3],

    ]);
    let newY1Y2Y3Arr = [];

    for (let i = 0; i < 4; i++) {
      newY1Y2Y3Arr.push(
        Y1Y2Y3Arr[i] +
          h *
            (eqnResults1[i] / 6 +
              eqnResults2[i] / 3 +
              eqnResults3[i] / 3 +
              eqnResults4[i] / 6)
      );
    }

    return newY1Y2Y3Arr;
  };

  const recursive = (numberOfLoops, Arr, method) => {
    for (let i = 0; i < numberOfLoops; i++) {
      if (method === "RungeKuttaLinearCoupled") {
        Arr = SolveLinearCoupledDifferentialEquationRungeKuttaForRth(Arr);
      }
    }
    return Arr;
  };

  const ShowLinearCoupledGraph = (eqn1, eqn2, eqn3, eqn4) => {
    return (
      <div >
        <div>
          <MyChart
            EulerData={eqn1}
            MidpointData={eqn2}
            RungeKuttaData={eqn3}
            Line4Data={eqn4}

            LineNames={props.LineNames}
            axisNames={["t", ""]}
          />
        </div>
      </div>
    );
  };

  const FormatArrayLinearCoupled = (arr) => {
    let FirstEqnArr = [];
    let SecondEqnArr = [];
    let ThirdEqnArr = [];
    let FourthEqnArr = [];


    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      FirstEqnArr.push({ x: i * h, y: element[0] });
      SecondEqnArr.push({ x: i * h, y: element[1] });
      ThirdEqnArr.push({ x: i * h, y: element[2] });
      FourthEqnArr.push({ x: i * h, y: element[3] });

    }

    return [FirstEqnArr, SecondEqnArr, ThirdEqnArr,FourthEqnArr];
  };

  // starts at x0=0

  let h = parseFloat(props.h);

  let a = parseFloat(props.a);
  let b = parseFloat(props.b);

  let c = parseFloat(props.c);
  let d = parseFloat(props.d);


  let abcArr = [a, b, c,d];

  let CompletedGridRungeKuttaLinearCoupled = [abcArr];

  //SolveForRth(SolveForRth(Y0,h,X0))
  for (let i = 1; i <= props.numberOfCycles; i++) {
    CompletedGridRungeKuttaLinearCoupled.push(
      recursive(i, abcArr, "RungeKuttaLinearCoupled")
    );
  }

  let EqnArr = FormatArrayLinearCoupled(CompletedGridRungeKuttaLinearCoupled);

  return ShowLinearCoupledGraph(EqnArr[0], EqnArr[1], EqnArr[2], EqnArr[3]);
};

export default LinearCoupledDiffFourEqn;
