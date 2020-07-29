import defaultEquations from "../SampleEquations/DefaultEquations";
import defaultVars from "../SampleEquations/DefaultVars";
import {v4 } from "uuid";
import React, { Component } from "react";


class Model extends Component{
    state: {
        //key: v4()
        meta: {
            //name: this.props.eqns.join() + "," + method'',
            description: "Please add a description",
        },
        config: {
            initialConditions: stuff.initialConditions,
                h: stuff.h,
                lineNames: stuff.lineNames,
                numOfCycles: stuff.numOfCycles,
                method: method,
        },
        eqns: {
            parsedEqns: stuff.eqns,
                textEqns: linear.eqns,
                vars: stuff.vars,
        },
        solutions: {
            actualSolution: stuff.actualSolutionArr,
                calcedSolution: calcedArr,
                rmse: this.calcRMSE(calcedArr, stuff.actualSolutionArr),
                timeTaken: time_difference,
        },
    }

    init = () => {
        /**
         * call this.state here
         */
    }

    validateExpression(expr, line){
        this.Eqns.forEach(eqn => {
            this.lineNames[eqn.line] = 1
        });
        this.Vars.forEach(kVar => {
            this.lineNames[kVar.LatexForm] = 1
        });
        try {
            evaluate(expr, lineNames);
            return true;
          } catch (error) {

            return false;
          }
    }

    fromJson(json){
        let aModel = JSON.parse(json)
        return aModel

    }
    toJson(){
        return JSON.stringify(this)
    }

}

export default Model