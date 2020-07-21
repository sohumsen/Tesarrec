import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LineChart from "../../../UI/Canvas/LineChart";
import LinearCoupledDiffEquationSolver from "./LinearCoupledDiffEquationSolver";
import NewDiffEquationSolver from "./NewDiffEquationSolver";


import props from "../SampleEquations/linear1"

configure({ adapter: new Adapter() });
describe("<LinearCoupledDiffEquationGrapher/>", () => {
  it("should solve on differential eqn and presnet a chart", () => {

    let eqns = props.eqns
    let NUMCYCLES = props.NUMCYCLES
    let varObjects = props.varObjects
    let actualSolutionArr = props.actualSolutionArr

    //** 
    //let comp1 = (
    //  <LinearCoupledDiffEquationSolver
    //    h={0.05}
    //    numberOfCycles={3}
    //    eqns={["t"]}
    //    vars={varObjects} // { K_1=0.27}
    //    LineNames={["a"]}
    //    initialConditions={[1]}  // y1
    //    t0={0.5} // t0
    //  />
    //);
    
   
    let calcedArr = 
      NewDiffEquationSolver({
        h:0.05,
        numberOfCycles:NUMCYCLES,
        eqns:eqns,
        vars:varObjects, // { K_1=0.27}
        LineNames:["a"],
        initialConditions:[0.5] ,// y1
        t0:0.5
      });
    
    

    
    // compare the Error between comp1 vs Actual 
    //comp2 v Actual
    //console.log(comp1)
    

    //const wrapper = shallow(comp1);
    //const wrapper = shallow(comp2);
    let errorArr = []
    for (let index = 0; index < NUMCYCLES; index++) {
      let calced = calcedArr[index][0];
      let actual = actualSolutionArr[index][0];
      let error = actual - calced
      errorArr.push(error)
    }
    var sqrt = Math.sqrt;
    var sqr = function(a) { return a*a; };
    var add = function(a, b) { return a+b; };
    var differenceFrom = function(target, a) { return target - a; };
    var target = 0;
    var differenceFromTarget = differenceFrom.bind(undefined, target);
    var sqrdDiff = errorArr.map(differenceFromTarget).map(sqr);
    var RMSE = sqrt( sqrdDiff.reduce(add, 0) / errorArr.length );
    console.log(calcedArr)
    console.log(actualSolutionArr)
    console.log(errorArr)
    console.log(RMSE)
    //expect(wrapper.find(<LineChart />));
    //expect(wrapper.find("LineChart").props().LineNames.length).toEqual(2);
    //expect(wrapper.find("LineChart").props().EulerData.length).toEqual(32);
    // expect(wrapper.find("LineChart").props().MidpointData.length).toEqual(32);
    // expect(wrapper.find("LineChart").props().MidpointData[0].y).toEqual(2);
    // expect(wrapper.find("LineChart").props().EulerData[0].y).toEqual(1);

    //expect(wrapper.find(<LineChart/>).type()).to.equal('LineChart');
    //expect(wrapper.props().numberOfCycles).to.equal([ 'Euler', 'Midpoint', 'Runge Kutta' ]);

    //console.log(wrapper.find('EulerData').debug({ verbose: true }));
    //console.log(wrapper.debug({ verbose: true }));
    //expect(wrapper).toMatchSnapshot();
  });
});


// Collect a list of 5 single equations in SampleEquations Folder
//load them in this test and check for RMSE
