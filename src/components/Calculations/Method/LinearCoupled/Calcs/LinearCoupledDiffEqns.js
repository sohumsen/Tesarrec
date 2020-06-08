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
    //generates the eval object
    for (let i = 0; i < props.LineNames.length; i++) {
      const letter = props.LineNames[i];
      evalObj[letter] = Y1Y2Y3Arr[i];
    }

    for (let i = 0; i < props.eqns.length; i++) {
      const eqn = props.eqns[i];
      var simplified = simplify(parse(eqn));

      eqnResultsArr.push(simplified.evaluate(evalObj));
    }
    // console.log(evalObj, simplified)

    return eqnResultsArr;
  };

  const SolveLinearCoupledDifferentialEquationRungeKuttaForRth = (
    Y1Y2Y3Arr
  ) => {
    //let eqnResults1 = DyByDxLinearCoupled(Y1Y2Y3Arr);
    let eqnResults1_ = [];
    for (let i = 0; i < props.LineNames.length; i++) {
      eqnResults1_.push(Y1Y2Y3Arr[i]);
    }
    let eqnResults1 = DyByDxLinearCoupled(eqnResults1_);

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

    //console.log(newY1Y2Y3Arr)

    return newY1Y2Y3Arr;
  };

  const recursive = (numberOfLoops, Arr) => {
    let allArrs = [abcArr];
    for (let i = 0; i < numberOfLoops; i++) {
      Arr = SolveLinearCoupledDifferentialEquationRungeKuttaForRth(Arr);
      allArrs.push(Arr);
    }
    return allArrs;

    // for (let i = 0; i < numberOfLoops; i++) {
    //   if (method === "RungeKuttaLinearCoupled") {
    //     //   console.log(Arr)

    //     allArrs.push(Arr);
    //     return SolveLinearCoupledDifferentialEquationRungeKuttaForRth(Arr);
    //   }
    // }
  };

  const ShowLinearCoupledGraph = (EqnArr) => {
    // let DataNames=["EulerData", "MidpointData","RungeKuttaData","Line4Data"]

    // for (let i = 0; i < EqnArr.length; i++) {
    //     const Eqn = EqnArr[i];

    // }

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
    // let FirstEqnArr = [];
    // let SecondEqnArr = [];

    // for (let i = 0; i < arr.length; i++) {
    //   const element = arr[i];
    //   FirstEqnArr.push({
    //     x: parseFloat((i * h).toFixed(props.DecimalPrecision)),
    //     y: parseFloat(element[0].toFixed(props.DecimalPrecision)),
    //   });
    //   SecondEqnArr.push({
    //     x: parseFloat((i * h).toFixed(props.DecimalPrecision)),
    //     y: parseFloat(element[1].toFixed(props.DecimalPrecision)),
    //   });

    if (props.LineNames.length === 2) {
      let FirstEqnArr = [];
      let SecondEqnArr = [];

      for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        FirstEqnArr.push({
          x: parseFloat((i * h).toFixed(props.DecimalPrecision)),
          y: parseFloat((element[0]).toFixed(props.DecimalPrecision)),
        });
        SecondEqnArr.push({
          x: parseFloat((i * h).toFixed(props.DecimalPrecision)),
          y: parseFloat(element[1].toFixed(props.DecimalPrecision)),
        });
      }
      return [FirstEqnArr,SecondEqnArr];

    } else if (props.LineNames.length === 3) {
        let FirstEqnArr = [];
        let SecondEqnArr = [];
        let ThirdEqnArr = [];
    
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
        }
        return [FirstEqnArr, SecondEqnArr, ThirdEqnArr];

    }else if (props.LineNames.length === 4) {
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

    }

    // let allEqnsArr = [];
    // let EqnArr = [];
    // console.log(arr);

    // for (let i = 0; i < arr.length; i++) {
    //   const element = arr[i];
    //   for (let j = 0; j < 2; j++) {
    //     EqnArr.push({
    //       x: parseFloat((i * h).toFixed(props.DecimalPrecision)),
    //       y: parseFloat(element[i][j].toFixed(props.DecimalPrecision)),
    //     });
    //     allEqnsArr.push(EqnArr);
    //   }
    // }

    // for (let j = 0; j < arr.length; j++) {
    //   let EqnArr = [];

    //   for (let i = 0; i < props.LineNames.length; i++) {
    //     const element = arr[j];
    //     EqnArr.push({
    //       x: parseFloat((j * h).toFixed(props.DecimalPrecision)),
    //       y: parseFloat(element[i].toFixed(props.DecimalPrecision)),
    //     });
    //   }
    //   allEqnsArr.push(EqnArr);
    // }

  };

  // starts at x0=0

  let h = parseFloat(props.h);

  let abcArr = props.initialConditions;

  let CompletedGridRungeKuttaLinearCoupled = [];

  //SolveForRth(SolveForRth(Y0,h,X0))
  CompletedGridRungeKuttaLinearCoupled.push(recursive(props.numberOfCycles, abcArr));

  let EqnArr = FormatArrayLinearCoupled(CompletedGridRungeKuttaLinearCoupled[0]);
  //return null;
  console.log(EqnArr)

  return ShowLinearCoupledGraph(EqnArr);
};

export default LinearCoupledDiffFourEqn;
