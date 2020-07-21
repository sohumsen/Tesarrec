import { configure, shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DefaultEqns from "../../../../containers/Lab/DefaultStates/DefaultEqns";
import DefaultVars from "../../../../containers/Lab/DefaultStates/DefaultVars";
import NewDiffEquationSolver from "./NewDiffEquationSolver";

configure({ adapter: new Adapter() });
describe("<NewDiffEquationSolver/>", () => {
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
    let computedResults = NewDiffEquationSolver({
      h: 0.05,
      numberOfCycles: 10,
      eqns: myEqns,
      vars: myVars, // { K_1=0.27}
      LineNames: ["a", "b", "c", "d"],
      initialConditions: [0.5, 0.5, 0.5, 0.5], // Y1, Y2
      t0: 0.5
    });
    const secondNow = performance.now();
    const howLongDidOurLoopTake = secondNow - firstNow;
    console.log(howLongDidOurLoopTake);

    //expect(wrapper.props().numberOfCycles).to.equal([ 'Euler', 'Midpoint', 'Runge Kutta' ]);

    //console.log(wrapper.find('EulerData').debug({ verbose: true }));
    //console.log(wrapper.debug({ verbose: true }));

    expect(computedResults).toMatchSnapshot();
  });
});
