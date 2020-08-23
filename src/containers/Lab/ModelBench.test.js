// Create a LinerCoupled Container

// Set some configs and equations in it 

// test that the state.Eqna hs exact 4 parts numbered 0 , 1, 2, 3 where each part has
// a DBLatext etc 

import React from "react" ;
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ModelBench from "./ModelBench";

configure({adapter:new Adapter()})

describe('<Model Bench/>', ()=>{
    it('This simply tests db connections and data retrieval', ()=>{
        
        //const token = localStorage.getItem("token");

        const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImFmMDg2ZmE4Y2Q5NDFlMDY3ZTc3NzNkYmIwNDcxMjAxMTBlMDA1NGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGVzYXJyZWMiLCJhdWQiOiJ0ZXNhcnJlYyIsImF1dGhfdGltZSI6MTU5Njg5MDgxNywidXNlcl9pZCI6IlFYVlJ3dTh2dUhSVHNMU1Q2d01XT0E5anQzYjIiLCJzdWIiOiJRWFZSd3U4dnVIUlRzTFNUNndNV09BOWp0M2IyIiwiaWF0IjoxNTk3MDg5OTEzLCJleHAiOjE1OTcwOTM1MTMsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QHRlc3QuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.rFxkFWVtrht4_zkMnqNGzUe5kZbmZkh3AUjHGvRZMEgZrGtoC6yj7X4jbOyxGoCWFb6vbF6eCVeRyKyYh39gGdBWBq8GHWbOEjBLg2wGJ6eD9KU5CfuyYTmUdDASzKs9xr7YHEH7azMRhR1YALW1hb1InlVECM0ULt-zWWyH8IsijrkAAr-wlr5cp9swOr3Fdfl7GvXLhPoWu4M2n1e7Zj5l8Txuyd7yBDPMMGMWq8IqkgZ1xewWYgsprTMS_XzvOpBcE870pKp-qIqPBnuL_j-B4PoStnjpGk3orfz7A5PGk2ECH_0qPTH7F9zvbpOAXQS-QuBFo-N6nTeXvvVQVQ'

        let mycomp  =   <ModelBench
                        userId='QXVRwu8vuHRTsLST6wMWOA9jt3b2'
                        token={token}
                    />
        let wrapper=shallow(mycomp)
        let instance=wrapper.instance()

        debugger
        expect(instance.MODEL_getPrivate());
        expect(instance.MODEL_getPublic());



    })
})

