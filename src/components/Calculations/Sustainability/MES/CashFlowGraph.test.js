import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import CashFlowGraph from "./CashFlowGraph";

configure({ adapter: new Adapter() });
describe("<CashFlowGraph/>", () => {
  it("CashFlowGraph", () => {
    //["64826.97", "63746.52", "64462.77", "78591.60", "65944.68", "67101.60"], ["47539.78", "46747.45", "47272.70", "57633.84", "48359.43", "49207.84"], ["41777.38", "41081.09", "41542.68", "50647.92", "42497.68", "43243.25"]0: "41777.38"1: "41081.09"2: "41542.68"3: "50647.92"4: "42497.68"5: "43243.25"length: 6__proto__: Array(0)3: (6) ["99401.35", "97744.66", "98842.92", "120507.12", "101115.17", "102889.12"]4: (6) ["53302.17", "52413.81", "53002.72", "64619.76", "54221.18", "55172.43"]5: (6) ["44082.34", "43347.63", "43834.69", "53442.29", "44842.38", "45629.09"]length: 6__proto__: Array(0) 0.024 Array(6) 0.13 4.75 0.0012 0.5 0.15 Array(6) 0.12 undefined "Acetate" "Acetic acid" 0 0
    let comp = (
      <CashFlowGraph
          TwoDCapitalCostData={TwoDCapitalCostData}
          ProductionPriceCost={props.ProductionPriceCost}
          TwoDProductionRategData={TwoDProductionRategData}
          ACCCost={props.ACCCost}
          LangFactorCost={props.LangFactorCost}
          AnolyteCost={props.AnolyteCost}
          CatholyteCost={props.CatholyteCost}
          ExternalEnergyCost={props.ExternalEnergyCost}
          TwoDGibbsEnergyData={TwoDGibbsEnergyData}
          IRRCost={props.IRRCost}
          chosenValue={props.chosenValue}
          anodeSubstrate={props.anodeSubstrate}
          cathodeProduct={props.cathodeProduct}
          xCoordAnode={props.xCoordAnode}
          yCoordCathode={props.yCoordCathode}
        />
    );
    const wrapper = shallow(comp);

    expect(wrapper.find(<MyChart />));
    expect(wrapper.find("EqnItem").props().disabledRemoveButton).toEqual(false);
    expect(wrapper.find("EqnItem").props().error).toEqual(null);
    expect(wrapper.find("EqnItem").props().id).toEqual("qwert");


    //expect(wrapper.find(<LineChart/>).type()).to.equal('LineChart');
    //expect(wrapper.props().numOfCycles).to.equal([ 'Euler', 'Midpoint', 'Runge Kutta' ]);

    //expect(wrapper).toMatchSnapshot();
  });
});
