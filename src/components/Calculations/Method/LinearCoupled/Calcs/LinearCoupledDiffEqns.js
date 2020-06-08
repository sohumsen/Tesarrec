import React from "react";
import MyChart from "../../../../UI/Canvas/Charts/Chart";

import { parse, simplify } from "mathjs";

//DyByDx= x+3y

const LinearCoupledDiffFourEqn = (props) => {
  /**
   * A method component that takes in a equation and outputs a chart
   */

  /*

    <LinearCoupledDiffTwoEqn
            h={0.05}
            numberOfCycles={31}
            eqns={[this.state.Eqns[0].TextEqn, this.state.Eqns[1].TextEqn]}
            LineNames={[this.state.Eqns[0].line, this.state.Eqns[1].line]}
            initialConditions={[1,2]}

            LegendVertical={this.state.graphConfig.LegendVertical}
            LegendHorizontal={this.state.graphConfig.LegendHorizontal}
            DecimalPrecision={this.state.graphConfig.DecimalPrecision}
          />
   */

  const DyByDxLinearCoupled = (Y1Y2Y3Arr) => {
    let eqnResultsArr = [];
    let evalObj = {};

    for (let i = 0; i < props.eqns.length; i++) {
      const eqn = props.eqns[i];
      var simplified = simplify(parse(eqn));
    }

    for (let i = 0; i < props.LineNames.length; i++) {
      const letter = props.LineNames[i];
      evalObj.letter = Y1Y2Y3Arr[i];
    }
    eqnResultsArr.push(simplified.evaluate(evalObj));

    return eqnResultsArr;
  };

  const SolveLinearCoupledDifferentialEquationRungeKuttaForRth = (
    Y1Y2Y3Arr
  ) => {
    let eqnResults1 = DyByDxLinearCoupled(Y1Y2Y3Arr);

    let eqnResults2_ = [];
    for (let i = 0; i < props.LineNames.length; i++) {
      eqnResults2_.push(Y1Y2Y3Arr[i] + (h / 2) * eqnResults1[i]);
    }
    let eqnResults2 = DyByDxLinearCoupled(eqnResults2_);

    let eqnResults3_ = [];
    for (let i = 0; i < props.LineNames.length; i++) {
      eqnResults3_.push(Y1Y2Y3Arr[i] + (h / 2) * eqnResults2[i]);
    }
    let eqnResults3 = DyByDxLinearCoupled(eqnResults3_);

    let eqnResults4_ = [];
    for (let i = 0; i < props.LineNames.length; i++) {
      eqnResults4_.push(Y1Y2Y3Arr[i] + (h / 2) * eqnResults3[i]);
    }
    let eqnResults4 = DyByDxLinearCoupled(eqnResults4_);


    let newY1Y2Y3Arr = [];

    for (let i = 0; i < props.LineNames.length; i++) {
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
      <div>
        <div>
          <MyChart
            EulerData={eqn1}
            MidpointData={eqn2}
            RungeKuttaData={eqn3}
            Line4Data={eqn4}
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
    let allEqnsArr=[]

    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        let EqnArr=[]
        EqnArr.push({
            x: parseFloat((i * h).toFixed(props.DecimalPrecision)),
            y: parseFloat(element[0].toFixed(props.DecimalPrecision)),
          });
    }
    allEqnsArr.push(EqnArr)

    let FirstEqnArr = [];
    let SecondEqnArr = [];
    let ThirdEqnArr = [];
    let FourthEqnArr = [];

    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      FirstEqnArr.push({
        x: parseFloat((i * h).toFixed(props.DecimalPrecision)),
        y: parseFloat(element[0].toFixed(props.DecimalPrecision)),
      });
      SecondEqnArr.push({
        x: parseFloat((i * h).toFixed(props.DecimalPrecision)),
        y: parseFloat(element[1].toFixed(props.DecimalPrecision)),
      });
      ThirdEqnArr.push({
        x: parseFloat((i * h).toFixed(props.DecimalPrecision)),
        y: parseFloat(element[2].toFixed(props.DecimalPrecision)),
      });
      FourthEqnArr.push({
        x: parseFloat((i * h).toFixed(props.DecimalPrecision)),
        y: parseFloat(element[3].toFixed(props.DecimalPrecision)),
      });
    }

    return [FirstEqnArr, SecondEqnArr, ThirdEqnArr, FourthEqnArr];
  };

  // starts at x0=0

  let h = parseFloat(props.h);


  let abcArr = props.initialConditions;

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
