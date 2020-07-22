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
      const dependentVariable = props.LineNames[i]; // { a, b , c}
      coordinate[dependentVariable] = y[i];
    }

    coordinate["t"] = t; // { a, b , c, t}

    const accumulative = {
      ...coordinate,
      ...props.vars,
    };

    for (let idx = 0; idx < props.eqns.length; idx++) {
      eqnResultsArr.push(props.eqns[idx].evaluate(accumulative)); // { a :1 , b: 3.3,t:3}
    }

    return eqnResultsArr;
  };

  //let ki be the set of eqns entered by the user
  //let n be the location
  //let i varies upto the order or the number of points within the step n and n+1
  //Compute ki by substituting the value of tn+bi*h and yn+ summation of aij*h*kj (j varies from 1 to i-1) in the set of eqns entered by the user
  //Compute yn+1 = yn + h * summation of wi*ki (i varies from 1 to the order)
  //Return yn+1 and tn+1 for the plot

  const integrate=(m,f,y,t,h)=>{
    for (var k=[],ki=0; ki<m.length; ki++) {
      var _y=y.slice(), dt=ki?((m[ki-1][0])*h):0;
      for (var l=0; l<_y.length; l++) for (var j=1; j<=ki; j++) _y[l]=_y[l]+h*(m[ki-1][j])*(k[ki-1][l]);
      k[ki]=f(t+dt,_y,dt); 
    }
    for (var r=y.slice(),l=0; l<_y.length; l++) for (var j=0; j<k.length; j++) r[l]=r[l]+h*(k[j][l])*(m[ki-1][j]);
    return r;
  }

  // const integrate = (meth, func, y, t, h) => {
  //   for (var k = [], ki = 0; ki < meth.length; ki++) {
  //     // for each technique iterate over the solver coeff
  //     var _y = y.slice();

  //     var dt = ki ? meth[ki - 1][0] * h : 0; // dt=0 when ki=0

  //     for (var l = 0; l < _y.length; l++) {
  //       for (var j = 1; j <= ki; j++) {
  //         _y[l] = _y[l] + h * meth[ki - 1][j] * k[ki - 1][l];
  //       }
  //     }
  //     k[ki] = func(t + dt, _y);
  //   }
  //   console.log(k)
  //   for (
  //     var r = y.slice(), l = 0;
  //     l < _y.length;
  //     l++ // 0-2
  //   )
  //     for (
  //       var j = 0;
  //       j < k.length;
  //       j++ //0-4 (rk4)
  //     )
  //       r[l] = r[l] + h * k[j][l] * meth[ki - 1][j]; //r[0]=r[0]+ 0.5*0.5 *16  //r[0]=r[0]+ 0.5*0.5 *16

  //   return r;
  // };
  let t0 = parseFloat(props.t0);
  let returnedY = props.initialConditions.slice();

  let _returnedY = returnedY.slice();
  _returnedY.push(t0);
  let allY = [_returnedY];

  for (let i = 0; i < props.numberOfCycles; i++) {
    returnedY = integrate(Integrators[props.method], func, returnedY, t0, parseFloat(props.h));
    t0 += props.h; // constant step size

    allY.push([...returnedY, t0]);
  }

  return allY;
  //   // const f=(h,y,)=>{

  //   // }
  //   ([0, 0.6249999999999999],
  //   [0.5, 0.9999999999999999],
  //   [1, 1.6249999999999998],
  //   [1.5, 2.4999999999999996],
  //   [2, 3.6249999999999996],
  //   [2.5, 4.999999999999999],
  //   [3, 6.625],
  //   [3.5, 8.500000000000002],
  //   [4, 10.625000000000004],
  //   [4.5, 13.000000000000002],
  //   [5, 15.625000000000002],
  //   [5.5, 18.5],
  //   [6, 21.625000000000004],
  //   [6.5, 25.000000000000004],
  //   [7, 28.625],
  //   [7.5, 32.5],
  //   [8, 36.625],
  //   [8.5, 41.00000000000001],
  //   [9, 45.625],
  //   [9.5, 50.5],
  //   [10, 55.62500000000001],
  //   [10.5, 61],
  //   [11, 66.62499999999999],
  //   [11.5, 72.49999999999997],
  //   [12, 78.62499999999999],
  //   [12.5, 84.99999999999999],
  //   [13, 91.62499999999997],
  //   [13.5, 98.49999999999999],
  //   [14, 105.62499999999999],
  //   [14.5, 112.99999999999997])
  // ];

  // [
  //   [
  //     [0.5, 0.5],
  //     [0.875, 1],
  //     [1.5, 1.5],
  //     [2.375, 2],
  //     [3.5, 2.5],
  //     [4.875, 3],
  //     [6.5, 3.5],
  //     [8.375, 4],
  //     [10.5, 4.5],
  //     [12.875, 5],
  //     [15.5, 5.5],
  //     [18.375, 6],
  //     [21.5, 6.5],
  //     [24.875, 7],
  //     [28.5, 7.5],
  //     [32.375, 8],
  //     [36.5, 8.5],
  //     [40.875, 9],
  //     [45.5, 9.5],
  //     [50.375, 10],
  //     [55.5, 10.5],
  //     [60.875, 11],
  //     [66.5, 11.5],
  //     [72.375, 12],
  //     [78.5, 12.5],
  //     [84.875, 13],
  //     [91.5, 13.5],
  //     [98.375, 14],
  //     [105.5, 14.5],
  //     [112.875, 15],
  //     [120.5, 15.5],
  //   ],
  // ];
};

export default NewDiffEquationSolver;
