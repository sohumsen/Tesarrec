// Create a LinerCoupled Container

// Set some configs and equations in it 

// test that the state.Eqna hs exact 4 parts numbered 0 , 1, 2, 3 where each part has
// a DBLatext etc 

import React from "react" ;
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import LinearCoupled from './LinearCoupled'

configure({adapter:new Adapter()})

describe('<LinearCoupled/>', ()=>{
    it('should solve on differential eqn and presnet a chart', ()=>{
        
        mycomp  = <LinearCoupled
                    calculate={this.state.calculate}
                    modelId={this.state.modelId}
                    Eqns={this.state.Eqns}
                    sendToParent={this.sendToParent}
                    nodeRef={nodeRef}
                    eqnEditorPos={this.state.eqnEditorPos}
                    graphPos={this.state.graphPos}
                    configPos={this.state.configPos}
                    onStop={this.onStop}
                />

        mycomp.validateExpression

        expect(wrapper.find('LineChart').props().EulerData[0].y).toEqual(1);

        

    })
})

