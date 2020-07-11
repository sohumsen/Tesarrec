import React from "react";
import LineChart from "../../../../UI/Canvas/Charts/Chart";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import LinearCoupledDiffEquationSolver from "./LinearCoupledDiffEquationSolver";

configure({ adapter: new Adapter() });
describe("<LinearCoupledDiffEquationSolver/>", () => {
  it("should solve on differential eqn and presnet a chart", () => {
    let VarObjects = {
      K_1: 20,
    };

    let comp = (
      <LinearCoupledDiffEquationSolver
        h={0.05}
        numberOfCycles={3}
        eqns={["a", "b"]}
        vars={VarObjects} // { K_1=0.27}
        LineNames={["a", "b"]}
        initialConditions={[1, 2]}
      />
    );
    const wrapper = shallow(comp);

    expect(wrapper.find(<LineChart />));
    expect(wrapper.find("LineChart").props().LineNames.length).toEqual(2);
    expect(wrapper.find("LineChart").props().EulerData.length).toEqual(32);
    expect(wrapper.find("LineChart").props().MidpointData.length).toEqual(32);
    expect(wrapper.find("LineChart").props().MidpointData[0].y).toEqual(2);
    expect(wrapper.find("LineChart").props().EulerData[0].y).toEqual(1);

    //expect(wrapper.find(<LineChart/>).type()).to.equal('LineChart');
    //expect(wrapper.props().numberOfCycles).to.equal([ 'Euler', 'Midpoint', 'Runge Kutta' ]);

    //console.log(wrapper.find('EulerData').debug({ verbose: true }));
    //console.log(wrapper.debug({ verbose: true }));
    expect(wrapper).toMatchSnapshot();
  });
});
