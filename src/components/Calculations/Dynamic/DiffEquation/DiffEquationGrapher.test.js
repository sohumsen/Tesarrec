import React from "react" ;
import LineChart from "../../../UI/Canvas/Charts/Chart.js"
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import DiffEquationGrapher from './DiffEquationGrapher'

configure({adapter:new Adapter()})
describe('<DiffEquationGrapher/>', ()=>{
    it('should solve on differential eqn and presnet a chart', ()=>{

        let comp = <DiffEquationGrapher
              h={0.5}
              X0={-12.5}
              Y0={-12.5}
              numOfCycles={50}
              eqn={"x^2"}
              LineNames={["Euler", "Midpoint", "Runge Kutta"]}
              LegendHorizontal={"left"}
              LegendVertical={"center"}
              DecimalPrecision={2}

            />
        const wrapper = shallow(comp)
        
        expect(wrapper.find(<LineChart/>))

        expect(wrapper.find('LineChart').props().LineNames.length).toEqual(3);
        expect(wrapper.find('LineChart').props().EulerData.length).toEqual(50);
        expect(wrapper.find('LineChart').props().MidpointData.length).toEqual(50);
        expect(wrapper.find('LineChart').props().MidpointData.length).toEqual(50);
        expect(wrapper.find('LineChart').props().RungeKuttaData[45].y).toEqual(1024.42);
        expect(wrapper.find('LineChart').props().MidpointData[45].y).toEqual(1023.94);
        expect(wrapper.find('LineChart').props().EulerData[45].y).toEqual(1036.88);

        //expect(wrapper.find(<LineChart/>).type()).to.equal('LineChart');
        //expect(wrapper.props().numOfCycles).to.equal([ 'Euler', 'Midpoint', 'Runge Kutta' ]);
        
        console.log(wrapper.find('LineChart').props().RungeKuttaData[45].y);
        console.log(wrapper.find('LineChart').props().MidpointData[45].y);
        console.log(wrapper.find('LineChart').props().EulerData[45].y);
        //console.log(wrapper.find('EulerData').debug({ verbose: true }));
        //console.log(wrapper.debug({ verbose: true }));
        expect(wrapper).toMatchSnapshot();

    })
})

