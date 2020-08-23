import React from "react";
import LineChart from "../../../UI/Canvas/Charts/Chart";
import { configure, shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DefaultEqns from "../SampleEquations/DEFAULTEQUATIONS";
import DefaultVars from "../SampleEquations/DEFAULTVARS";
import LinearCoupledDiffEquationSolver from "./LinearCoupledDiffEquationSolver";

configure({ adapter: new Adapter() });
describe("<LinearCoupledDiffEquationSolver/>", () => {
  it("should solve on differential eqn ", () => {
    let myEqns = [];

    DefaultEqns.forEach((eqn) => {
      myEqns.push(eqn.TextEqn);
    });

    let myVars = {};

    DefaultVars.forEach((VarElement) => {
      myVars[VarElement.LatexForm] = VarElement.VarCurrent;
    });

    const firstNow = performance.now();
    let computedResults = LinearCoupledDiffEquationSolver({
      h: 0.05,
      numOfCycles: 10,
      eqns: myEqns,
      vars: myVars, // { K_1=0.27}
      LineNames: ["a", "b", "c", "d"],
      initialConditions: [0.5, 0.5, 0.5, 0.5, 0.5], // Y1, Y2, X1
    });
    const secondNow = performance.now();
    const howLongDidOurLoopTake = secondNow - firstNow;

    //expect(wrapper.props().numOfCycles).to.equal([ 'Euler', 'Midpoint', 'Runge Kutta' ]);


    expect(computedResults).toMatchSnapshot();
  });
});
