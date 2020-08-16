//DyByDx= x+3y

const LinearCoupledDiffEquationSolver = (props) => {
  /**
   * A method component that takes in a equation and outputs a chart
   */

  const calcValueAt = (initialValues) => {
    // { 1 , 2, 3}
    let eqnResultsArr = [];
    let coordinate = {}; //t initial value
    //generates the eval object
    for (let i = 0; i < props.LineNames.length; i++) {
      const dependentVariable = props.LineNames[i]; // { a, b , c}
      coordinate[dependentVariable] = initialValues[i];
    }

    coordinate["t"] = initialValues[initialValues.length - 1]; // { a, b , c, t}

    const accumulative = {
      ...coordinate,
      ...props.vars,
    };

    for (let idx = 0; idx < parsedEquations.length; idx++) {
      eqnResultsArr.push(parsedEquations[idx].evaluate(accumulative)); // { a :1 , b: 3.3,t:3}
    }
    //eqnResultsArr.push(initialValues[initialValues.length-1])

    return eqnResultsArr;
  };

  const SolveLinearCoupledDifferentialEquationRungeKuttaForRth = (Y_n) => {
    //a,b,t
    let K1 = calcValueAt(Y_n); //k1 returns a,b

    let eqnResults2_ = [];
    for (let i = 0; i < props.LineNames.length; i++) {
      //for each line name
      eqnResults2_.push(Y_n[i] + (h / 2) * K1[i]);
    }
    // Add the T
    eqnResults2_.push(Y_n[Y_n.length - 1] + h / 2);

    let K2 = calcValueAt(eqnResults2_); //calcValueAt requires 1 more than the number of line names

    let eqnResults3_ = [];
    for (let i = 0; i < props.LineNames.length; i++) {
      eqnResults3_.push(Y_n[i] + (h / 2) * K2[i]);
    }
    // Add the T
    eqnResults3_.push(Y_n[Y_n.length - 1] + h / 2);

    let K3 = calcValueAt(eqnResults3_);

    let eqnResults4_ = [];
    for (let i = 0; i < props.LineNames.length; i++) {
      eqnResults4_.push(Y_n[i] + (h / 2) * K3[i]);
    }
    // Add the T
    eqnResults4_.push(Y_n[Y_n.length - 1] + h);

    let K4 = calcValueAt(eqnResults4_);

    let finalResults = [];

    for (let i = 0; i < props.LineNames.length; i++) {
      let Y_n1 = Y_n[i] + h * (K1[i] / 6 + K2[i] / 3 + K3[i] / 3 + K4[i] / 6);
      finalResults.push(Y_n1);
    }
    //
    finalResults.push(Y_n[Y_n.length - 1] + h);
    //

    return finalResults;
  };

  const solveRecursively = (numberOfLoops, Arr, t0) => {
    initialConditions.push(t0);
    let allArrs = [initialConditions];
    for (let i = 0; i < numberOfLoops; i++) {
      Arr = SolveLinearCoupledDifferentialEquationRungeKuttaForRth(Arr);
      allArrs.push(Arr);
    }
    return allArrs;
  };
  // const t0 = performance.now();

  // only changes when eqns are edited
  // let parsedEquations = [];
  // for (let i = 0; i < props.eqns.length; i++) {
  //   const eqn = props.eqns[i];
  //   var parsed = simplify(parse(eqn));
  //   parsedEquations.push(parsed);
  // }
  let parsedEquations = props.eqns;
  // starts at x0=0

  let h = parseFloat(props.h);
  let initialConditions = props.initialConditions.slice();
  let t0 = parseFloat(props.t0);

  // const t1 = performance.now();

  return solveRecursively(props.numOfCycles, initialConditions, t0); //recursive(10,[1,2,3,4,5])

  // const t2 = performance.now();
  // const t3 = performance.now();

  // console.log(`Call to end took ${(t3 - t0)/1000} milliseconds.`);
  // console.log(`Call to parse took ${(t2 - t1)/1000} milliseconds.`);
};

export default LinearCoupledDiffEquationSolver;
