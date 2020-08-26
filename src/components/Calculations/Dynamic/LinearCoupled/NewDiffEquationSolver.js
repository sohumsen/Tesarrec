//DyByDx= x+3y

const NewDiffEquationSolver = (props) => {
  /**
   * A method component that takes in a equation and outputs a chart
   */

  var Integrators = {
    Euler: [[1]],
    Midpoint: [
      [0.5, 0.5],
      [0, 1],
    ],
    Heun: [
      [1, 1],
      [0.5, 0.5],
    ],
    Ralston: [
      [2 / 3, 2 / 3],
      [0.25, 0.75],
    ],
    K3: [
      [0.5, 0.5],
      [1, -1, 2],
      [1 / 6, 2 / 3, 1 / 6],
    ],
    SSP33: [
      [1, 1],
      [0.5, 0.25, 0.25],
      [1 / 6, 1 / 6, 2 / 3],
    ],
    SSP43: [
      [0.5, 0.5],
      [1, 0.5, 0.5],
      [0.5, 1 / 6, 1 / 6, 1 / 6],
      [1 / 6, 1 / 6, 1 / 6, 1 / 2],
    ],
    RK4: [
      [0.5, 0.5],
      [0.5, 0, 0.5],
      [1, 0, 0, 1],
      [1 / 6, 1 / 3, 1 / 3, 1 / 6],
    ],
    RK38: [
      [1 / 3, 1 / 3],
      [2 / 3, -1 / 3, 1],
      [1, 1, -1, 1],
      [1 / 8, 3 / 8, 3 / 8, 1 / 8],
    ],
    RKF: [
      [1 / 4, 1 / 4],
      [3 / 8, 3 / 32, 9 / 32],
      [12 / 13, 1932 / 2197, -7200 / 2197, 7296 / 2197],
      [1, 439 / 216, -8, 3680 / 513, -845 / 4104],
      [1 / 2, -8 / 27, 2, -3544 / 2565, 1859 / 4104, -11 / 40],
      [25 / 216, 0, 1408 / 2565, 2197 / 4104, -1 / 5, 0],
    ],
  };

  const func = (t, y) => {
    // for a given t , list of dependent varibales

    let eqnResultsArr = [];
    let coordinate = {}; //t initial value
    //generates the eval object
    for (let i = 0; i < y.length; i++) {
      // const dependentVariable = props.modelObj.Config.lineNames[i]; // { a, b , c}
      const dependentVariable = lineNames[i]; // { a, b , c}

      coordinate[dependentVariable] = y[i];
    }

    coordinate[independentLatexForm] = t; // { a, b , c, t}
    const accumulative = {
      ...coordinate,
      // ...props.vars,
      ...constants,
      // t:t
    };

    for (let idx = 0; idx < props.modelObj.Eqns.length; idx++) {
      const eqnObj = props.modelObj.Eqns[idx];

      eqnResultsArr.push(eqnObj.parsedEqn.evaluate(accumulative)); // { a :1 , b: 3.3,t:3}
    }

    return eqnResultsArr;
  };

  //let ki be the set of eqns entered by the user
  //let n be the location
  //let i varies upto the order or the number of points within the step n and n+1
  //Compute ki by substituting the value of tn+bi*h and yn+ summation of aij*h*kj (j varies from 1 to i-1) in the set of eqns entered by the user
  //Compute yn+1 = yn + h * summation of wi*ki (i varies from 1 to the order)
  //Return yn+1 and tn+1 for the plot

  //The following code is from: https://github.com/gabgoh/epcalc/blob/master/src/App.svelte

  const integrate = (m, f, y, t, h) => {
    for (var k = [], ki = 0; ki < m.length; ki++) {
      var _y = y.slice(),
        dt = ki ? m[ki - 1][0] * h : 0;
      for (var l = 0; l < _y.length; l++)
        for (var j = 1; j <= ki; j++)
          _y[l] = _y[l] + h * m[ki - 1][j] * k[ki - 1][l];
      k[ki] = f(t + dt, _y, dt);
    }
    // eslint-disable-next-line
    for (var r = y.slice(), l = 0; l < _y.length; l++)
      for (var j = 0; j < k.length; j++)
        r[l] = r[l] + h * k[j][l] * m[ki - 1][j];
    return r;
  };

  let t0 = null;
  let initialConditions = [];
  let constants = {};
  let independentLatexForm=null
  let lineNames=[]
  for (let i = 0; i < props.modelObj.Vars.length; i++) {
    if (props.modelObj.Vars[i].VarType === "Independent") {
      t0 = parseFloat(props.modelObj.Vars[i].VarCurrent);
      independentLatexForm=props.modelObj.Vars[i].LatexForm
    }
    if (props.modelObj.Vars[i].VarType === "Dependent") {
      initialConditions.push(parseFloat(props.modelObj.Vars[i].VarCurrent));
      lineNames.push(props.modelObj.Vars[i].LatexForm)
    }
    if (props.modelObj.Vars[i].VarType === "Constant") {
      constants[props.modelObj.Vars[i].LatexForm] = parseFloat(
        props.modelObj.Vars[i].VarCurrent
      );
    }
  }

  let returnedY = initialConditions.slice();

  let _returnedY = returnedY.slice();
  _returnedY.push(t0);
  let allY = [_returnedY];

  for (let i = 0; i < props.modelObj.Config.numOfCycles; i++) {
    returnedY = integrate(
      Integrators[props.modelObj.Config.method],
      func,
      returnedY,
      t0,
      parseFloat(props.modelObj.Config.h)
    );
    t0 += parseFloat(props.modelObj.Config.h); // constant step size

    allY.push([...returnedY, t0]);
  }

  return allY;

};

export default NewDiffEquationSolver;
