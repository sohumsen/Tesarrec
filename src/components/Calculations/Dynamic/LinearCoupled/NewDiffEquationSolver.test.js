import { configure, shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DefaultEqns from "../SampleEquations/DEFAULTEQUATIONS";
import DefaultVars from "../SampleEquations/DEFAULTVARS";
import NewDiffEquationSolver from "./NewDiffEquationSolver";
import props from "../SampleEquations/linear5";

// configure({ adapter: new Adapter() });
// describe("<NewDiffEquationSolver/>", () => {
//   it("should solve on differential eqn ", () => {
//     let myEqns = [];

//     DefaultEqns.forEach((eqn) => {
//       myEqns.push(eqn.TextEqn);
//     });

//     let myVars = {};

//     DefaultVars.forEach((VarElement) => {
//       myVars[VarElement.LatexForm] = VarElement.VarCurrent;
//     });

//     const firstNow = performance.now();
//     let computedResults = NewDiffEquationSolver({
//       method:"RK4",
//       h: 0.1,
//       t0: 0.5,
//       numOfCycles: 10,
//       eqns: myEqns,
//       vars: myVars, // { K_1=0.27}
//       LineNames: ["a", "b", "c", "d"],
//       initialConditions: [0.5, 0.5, 0.5, 0.5], // Y1, Y2
      
//     });
//     const secondNow = performance.now();
//     const howLongDidOurLoopTake = secondNow - firstNow;
//     console.log(howLongDidOurLoopTake);

//     //expect(wrapper.props().numOfCycles).to.equal([ 'Euler', 'Midpoint', 'Runge Kutta' ]);

//     //console.log(wrapper.find('EulerData').debug({ verbose: true }));
//     //console.log(wrapper.debug({ verbose: true }));

//     expect(computedResults).toMatchSnapshot();
//   });
// });

describe("<NewDiffEquationSolver3rdPartyCheck/>", () => {
  it("should solve on differential eqn ", () => {
    let eqns = props.eqns
    let NUMCYCLES = props.NUMCYCLES
    let varObjects = props.varObjects
    let actualSolutionArr = props.actualSolutionArr
    let h = props.h
    let t0 = props.t0
    let initialConditions = props.initialConditions
   
    let calcedArr = 
      NewDiffEquationSolver({
        method:"RK4",
        h:h,
        numOfCycles:NUMCYCLES,
        eqns:eqns,
        vars:varObjects, // { K_1=0.27}
        LineNames:["a","b"],
        initialConditions:initialConditions ,// y1
        t0:t0
      });
      console.log(calcedArr)
    expect(calcedArr).toMatchSnapshot();
  });
});


