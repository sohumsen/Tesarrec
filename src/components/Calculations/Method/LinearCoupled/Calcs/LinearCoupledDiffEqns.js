import React from "react";
import MyChart from "../../../../UI/Canvas/Charts/Chart";

import { parse, simplify } from "mathjs";

//DyByDx= x+3y

const LinearCoupledDiffFourEqn = (props) => {
  /**
   * A method component that takes in a equation and outputs a chart
   */

  let parsedEquations = [];
  for (let i = 0; i < props.eqns.length; i++) {
    const eqn = props.eqns[i];
    var parsed = simplify(parse(eqn));
    parsedEquations.push(parsed);
  }

  const calcValueAt = (initialValues) => {
    // { 1 , 2, 3}
    let eqnResultsArr = [];
    let coordinate = { t: 1 }; //t initial value

    //generates the eval object
    for (let i = 0; i < props.LineNames.length; i++) {
      const dependentVariable = props.LineNames[i]; // { a, b , c}
      coordinate[dependentVariable] = initialValues[i];
    }

    for (let idx = 0; idx < parsedEquations.length; idx++) {
      eqnResultsArr.push(parsedEquations[idx].evaluate(coordinate)); // { a :1 , b: 3.3}
    }

    return eqnResultsArr;
  };

  const SolveLinearCoupledDifferentialEquationRungeKuttaForRth = (
    initialValues
  ) => {
    let eqnResults1_ = [];
    for (let i = 0; i < props.LineNames.length; i++) {
      eqnResults1_.push(initialValues[i]);
    }
    let eqnResults1 = calcValueAt(eqnResults1_);

    let eqnResults2_ = [];
    for (let i = 0; i < props.LineNames.length; i++) {
      eqnResults2_.push(initialValues[i] + (h / 2) * eqnResults1[i]);
    }
    let eqnResults2 = calcValueAt(eqnResults2_);

    let eqnResults3_ = [];
    for (let i = 0; i < props.LineNames.length; i++) {
      eqnResults3_.push(initialValues[i] + (h / 2) * eqnResults2[i]);
    }
    let eqnResults3 = calcValueAt(eqnResults3_);

    let eqnResults4_ = [];
    for (let i = 0; i < props.LineNames.length; i++) {
      eqnResults4_.push(initialValues[i] + (h / 2) * eqnResults3[i]);
    }
    let eqnResults4 = calcValueAt(eqnResults4_);

    let newY1Y2Y3Arr = [];

    for (let i = 0; i < props.LineNames.length; i++) {
      newY1Y2Y3Arr.push(
        initialValues[i] +
          h *
            (eqnResults1[i] / 6 +
              eqnResults2[i] / 3 +
              eqnResults3[i] / 3 +
              eqnResults4[i] / 6)
      );
    }

    return newY1Y2Y3Arr;
  };

  const recursive = (numberOfLoops, Arr) => {
    let allArrs = [abcArr];
    for (let i = 0; i < numberOfLoops; i++) {
      Arr = SolveLinearCoupledDifferentialEquationRungeKuttaForRth(Arr);
      allArrs.push(Arr);
    }

    return allArrs;
  };

  const ShowLinearCoupledGraph = (EqnArr) => {


    return (
      <div>
        <div>
          <MyChart
            EulerData={EqnArr[0]}
            MidpointData={EqnArr[1]}
            RungeKuttaData={EqnArr[2]}
            Line4Data={EqnArr[3]}
            LineNames={props.LineNames}
            axisNames={["t", ""]}
            horizontalAlign={props.LegendHorizontal}
            verticalAlign={props.LegendVertical}
          />
        </div>
      </div>
    );
  };

  const FormatArrayLinearCoupled = (arr) => {
    let returnedArr = [];
    for (let j = 0; j < props.LineNames.length; j++) {
      let EqnArr = [];
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        EqnArr.push({
          x: parseFloat((i * h).toFixed(props.DecimalPrecision)),
          y: parseFloat(element[j].toFixed(props.DecimalPrecision)),
        });
      }
      returnedArr.push(EqnArr);
      console.log(returnedArr);
    }
    return returnedArr;
  };

  // starts at x0=0

  let h = parseFloat(props.h);

  let abcArr = props.initialConditions;

  let CompletedGridRungeKuttaLinearCoupled = [];

  //SolveForRth(SolveForRth(Y0,h,X0))
  CompletedGridRungeKuttaLinearCoupled.push(
    recursive(props.numberOfCycles, abcArr)
  );

  let EqnArr = FormatArrayLinearCoupled(
    CompletedGridRungeKuttaLinearCoupled[0]
  );
  //return null;

  return ShowLinearCoupledGraph(EqnArr);
};

export default LinearCoupledDiffFourEqn;
