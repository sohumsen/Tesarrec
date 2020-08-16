import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import EqnItems from "./EqnItems";
import EqnItem from "./EqnItem";
const handleMathQuillInputChange = (id) => (mathField) => {
  const EqnIndex = this.state.Eqns.findIndex((e) => {
    return e.id === id;
  });

  const Eqn = {
    ...this.state.Eqns[EqnIndex],
  };

  Eqn.TextEqn = mathField.text();
  Eqn.LatexEqn = mathField.latex();

  const Eqns = [...this.state.Eqns];
  Eqns[EqnIndex] = Eqn;

  this.setState({ Eqns: Eqns, calculate: false });
};
configure({ adapter: new Adapter() });
describe("<LinearCoupledDiffEqns/>", () => {
  it("should solve on differential eqn and presnet a chart", () => {
    let comp = (
      <EqnItems
        Eqns={[
          {
            id: "qwert",
            line: "a",
            DByDLatex: "\\frac{da}{dt}=",
            LatexEqn: "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
            TextEqn: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
            errorMessage: null,
          },
        ]}
        removeItem={null, "Eqns"}
        handleMathQuillInputChange={handleMathQuillInputChange}
      />
    );
    const wrapper = shallow(comp);

    expect(wrapper.find(<EqnItem />));
    console.log(wrapper.find('EqnItem').props());
    expect(wrapper.find("EqnItem").props().disabledRemoveButton).toEqual(false);
    expect(wrapper.find("EqnItem").props().error).toEqual(null);
    expect(wrapper.find("EqnItem").props().id).toEqual("qwert");


    //expect(wrapper.find(<LineChart/>).type()).to.equal('LineChart');
    //expect(wrapper.props().numOfCycles).to.equal([ 'Euler', 'Midpoint', 'Runge Kutta' ]);

    //console.log(wrapper.find('EulerData').debug({ verbose: true }));
    //console.log(wrapper.debug({ verbose: true }));
    expect(wrapper).toMatchSnapshot();
  });
});
