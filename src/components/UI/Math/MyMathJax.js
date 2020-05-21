import * as React from 'react';
import MathJax from 'react-mathjax';
import { Fraction, toTex } from 'algebra.js';




class MyMathJax extends React.Component {
    render() {

        return (
            <MathJax.Provider>
                <div>

                    <MathJax.Node formula={`${toTex("dy/dx")}  = ${toTex("dy/dx")}`} />
                </div>
            </MathJax.Provider>
        );
    }
}

export default MyMathJax