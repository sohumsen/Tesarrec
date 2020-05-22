import * as React from 'react';
import MathJax from 'react-mathjax';
import { Fraction, toTex } from 'algebra.js';




class MyMathJax extends React.Component {
    render() {

        return (
            <MathJax.Provider>
                <div>

                    <MathJax.Node formula={`\\frac{\\mathrm{d} y}{\\mathrm{d} x}=`+this.props.eqn }>
                    


                    </MathJax.Node>

                </div>
            </MathJax.Provider>
        );
    }
}

export default MyMathJax