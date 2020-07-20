//DyByDx= x+3y

const LinearCoupledDiffEquationSolver = (props) => {
  /**
   * A method component that takes in a equation and outputs a chart
   */

  var RK4 = [
    [0.5, 0.5],
    [0.5, 0, 0.5],
    [1, 0, 0, 1],
    [1 / 6, 1 / 3, 1 / 3, 1 / 6],
  ];
  let RK38 = [
    [1 / 3, 1 / 3],
    [2 / 3, -1 / 3, 1],
    [1, 1, -1, 1],
    [1 / 8, 3 / 8, 3 / 8, 1 / 8],
  ];
  let RKF = [
    [1 / 4, 1 / 4],
    [3 / 8, 3 / 32, 9 / 32],
    [12 / 13, 1932 / 2197, -7200 / 2197, 7296 / 2197],
    [1, 439 / 216, -8, 3680 / 513, -845 / 4104],
    [1 / 2, -8 / 27, 2, -3544 / 2565, 1859 / 4104, -11 / 40],
    [25 / 216, 0, 1408 / 2565, 2197 / 4104, -1 / 5, 0],
  ];

  // const integrate = (m,f,v,t,dt) => {
  //   for (var k = [], ki = 0; ki < m.length; ki++) {
  //     var _y = y.slice(),
  //       dt = ki ? m[ki - 1][0] * h : 0;
  //     for (var l = 0; l < _y.length; l++)
  //       for (var j = 1; j <= ki; j++)
  //         _y[l] = _y[l] + h * m[ki - 1][j] * k[ki - 1][l];
  //     k[ki] = f(t + dt, _y, dt);
  //   }
  //   for (var r = y.slice(), l = 0; l < _y.length; l++)
  //     for (var j = 0; j < k.length; j++)
  //       r[l] = r[l] + h * k[j][l] * m[ki - 1][j];
  //   return r;
  // };

  // integrate(RK4,f,[0], 0,0.5)

  // const f=(h,y,)=>{

  // }

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
  //let ki be the set of eqns entered by the user
  //let n be the location
  //let i varies upto the order or the number of points within the step n and n+1
  //Compute ki by substituting the value of tn+bi*h and yn+ summation of aij*h*kj (j varies from 1 to i-1) in the set of eqns entered by the user
  //Compute yn+1 = yn + h * summation of wi*ki (i varies from 1 to the order)
  //Return yn+1 and tn+1 for the plot
  const generalSolver = (method,y,t) => {
    for (var k = [], ki = 0; ki < method.length; ki++) {
      var _y = y.slice(),
        dt = ki ? method[ki - 1][0] * h : 0;
      for (var l = 0; l < _y.length; l++)
        for (var j = 1; j <= ki; j++)
          _y[l] = _y[l] + h * method[ki - 1][j] * k[ki - 1][l];
      //k[ki] = f(t + dt, _y, dt);
      console.log(t+dt,_y,dt)
    }
    for (var r = y.slice(), l = 0; l < _y.length; l++)
      for (var j = 0; j < k.length; j++)
        r[l] = r[l] + h * k[j][l] * method[ki - 1][j];
    return r;
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

  const solveRecursively = (numberOfLoops, Arr) => {
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
  let initialConditions = props.initialConditions;
  let CompletedGridRungeKuttaLinearCoupled = [];
  // const t1 = performance.now();

  CompletedGridRungeKuttaLinearCoupled.push(
    solveRecursively(props.numberOfCycles, initialConditions) //recursive(10,[1,2,3,4,5])
  );
  // const t2 = performance.now();
  // const t3 = performance.now();

  // console.log(`Call to end took ${(t3 - t0)/1000} milliseconds.`);
  // console.log(`Call to parse took ${(t2 - t1)/1000} milliseconds.`);

  return CompletedGridRungeKuttaLinearCoupled;
};

export default LinearCoupledDiffEquationSolver;
