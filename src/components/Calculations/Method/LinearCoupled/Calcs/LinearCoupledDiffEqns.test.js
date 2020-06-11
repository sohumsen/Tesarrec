import React from "react" ;
import LineChart from "../../../../UI/Canvas/Charts/Chart"
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import LinearCoupledDiffEqns from './LinearCoupledDiffEqns'

configure({adapter:new Adapter()})
describe('<LinearCoupledDiffEqns/>', ()=>{
    it('should solve on differential eqn and presnet a chart', ()=>{

        let comp =  <LinearCoupledDiffEqns
        h={0.05}
        numberOfCycles={31}
        eqns={["a", "b"]}
        LineNames={["a", "b"]}
        initialConditions={[1,2]}
        LegendVertical={"center"}
        LegendHorizontal={"top"}
        DecimalPrecision={2}
      />
        const wrapper = shallow(comp)
        
        expect(wrapper.find(<LineChart/>))
        expect(wrapper.find('LineChart').props().LineNames.length).toEqual(2);
        expect(wrapper.find('LineChart').props().EulerData.length).toEqual(32);
        expect(wrapper.find('LineChart').props().MidpointData.length).toEqual(32);
        expect(wrapper.find('LineChart').props().MidpointData[0].y).toEqual(2);
        expect(wrapper.find('LineChart').props().EulerData[0].y).toEqual(1);

        //expect(wrapper.find(<LineChart/>).type()).to.equal('LineChart');
        //expect(wrapper.props().numberOfCycles).to.equal([ 'Euler', 'Midpoint', 'Runge Kutta' ]);
        
       
        //console.log(wrapper.find('EulerData').debug({ verbose: true }));
        //console.log(wrapper.debug({ verbose: true }));
        expect(wrapper).toMatchSnapshot();

    })
})

