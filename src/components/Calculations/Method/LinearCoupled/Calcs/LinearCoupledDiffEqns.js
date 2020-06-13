import React from "react";
import MyChart from "../../../../UI/Canvas/Charts/Chart";

import { parse, simplify } from "mathjs";

//DyByDx= x+3y

const LinearCoupledDiffFourEqn = (props) => {
  /**
   * A method component that takes in a equation and outputs a chart
   */

  
  let parsedEquations=[]
  for (let i = 0; i < props.eqns.length; i++) {
    const eqn = props.eqns[i];
    var parsed = simplify(parse(eqn));
    parsedEquations.push(parsed)
  }

  const calcValueAt = (initialValues) => { // { 1 , 2, 3}
    const t0 = performance.now()
    let eqnResultsArr = [];
    let coordinate = {};
    
    //generates the eval object
    for (let i = 0; i < props.LineNames.length; i++) {
      const dependentVariable = props.LineNames[i]; // { a, b , c}
      coordinate[dependentVariable] = initialValues[i];
    }
    
    for (let idx = 0; idx < parsedEquations.length; idx++) {
      eqnResultsArr.push(parsedEquations[idx].evaluate(coordinate));// { a :1 , b: 3.3}
    }
    const t4 = performance.now()
    
    console.log(t4-t0 , 'BBB')
    return eqnResultsArr;
  };

  const SolveLinearCoupledDifferentialEquationRungeKuttaForRth = (
    initialValues
  ) => {
    let t0 = performance.now();

    //var varCoords = {};
    //props.LineNames.forEach(function(item, index) {
    //  varCoords[item] = initialValues[index]

    //});

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

    let t1 = performance.now();
    console.log("SolveLinearCoupledDifferentialEquationRungeKuttaForRth render", t1 - t0);
    return newY1Y2Y3Arr;
  };

  const recursive = (numberOfLoops, Arr) => {
    let t0 = performance.now();

    let allArrs = [abcArr];
    for (let i = 0; i < numberOfLoops; i++) {
      Arr = SolveLinearCoupledDifferentialEquationRungeKuttaForRth(Arr);
      allArrs.push(Arr);
    }
    let t1 = performance.now();
    console.log("recursive render", t1 - t0);
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
    let t0=performance.now()
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
    let t1 = performance.now();
    console.log("FormatArrayLinearCoupled render", t1 - t0);
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
  let t0 = performance.now();

  let h = parseFloat(props.h);

  let abcArr = props.initialConditions;

  let CompletedGridRungeKuttaLinearCoupled = [];

  //SolveForRth(SolveForRth(Y0,h,X0))
  CompletedGridRungeKuttaLinearCoupled.push(recursive(props.numberOfCycles, abcArr));

  let EqnArr = FormatArrayLinearCoupled(CompletedGridRungeKuttaLinearCoupled[0]);
  //return null;
  let t1 = performance.now();
  console.log("CompletedGridRungeKuttaLinearCoupled render", t1 - t0);
  return ShowLinearCoupledGraph(EqnArr);
};

export default LinearCoupledDiffFourEqn;
