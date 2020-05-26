import React, { Component } from "react";
import SolveDiffEquations from "../../../../components/Calculations/Method/SolveDiffEquations";

import MyMathQuill from "../../../../components/UI/Math/MyMathQuill";
import { evaluate } from "mathjs";

class SingleODE extends Component {
  /**
   * Visual Component that contains the textbox for the equation and calculation outputs
   * plus some equation labels
   *
   */

  //y1=a, y2=b,y3=c
  state = {
    calculate: true,
    SingleDiffChangeableLatex: "e^x",
    SingleDiffChangeableText: "e^x",

    DyByDxLatex: "\\frac{dy}{dx}=",
  };
  //\\frac{-0.09 \\cdot a \\cdot b}{0.103+a}-\\frac{0.84 \\cdot a \\cdot c}{0.425+a}
  //\\frac{7.1 \\cdot a \\cdot b}{0.103+a}-(0.142 \\cdot b)
  //\\frac{0.6 \\cdot a \\cdot c}{0.103+a}-(0.0102 \\cdot c)

  validateExpression = (expr) => {
    try {
      evaluate(expr, { x: 1, y: 1 });
      return true;
    } catch (error) {
      return false;
    }
  };

  handleMathQuillInputChange = (nameLatex, nameText) => (mathField) => {
    this.setState({
      [nameLatex]: mathField.latex(),
      [nameText]: mathField.text(),
      calculate: false,
    });
  };

  handleMathQuillInputSubmit = (event) => {
    event.preventDefault();

    if (this.validateExpression(this.state.SingleDiffChangeableText)) {
      this.setState({ calculate: true });
    } else {
      alert("invalid equation");
    }
  };

  render() {
    return (
      <div>
        <h1>Single ODE </h1>

        <form onSubmit={this.handleMathQuillInputSubmit}>
          <MyMathQuill
            firstBit={this.state.DyByDxLatex}
            latex={this.state.SingleDiffChangeableLatex}
            onInputChange={this.handleMathQuillInputChange(
              "SingleDiffChangeableLatex",
              "SingleDiffChangeableText"
            )}
          />
          <input type="submit" value="Submit" />
        </form>

        {this.state.calculate ? (
          <SolveDiffEquations
            h={0.5}
            X0={-5}
            Y0={-5}
            numberOfCycles={20}
            eqn={this.state.SingleDiffChangeableText}
          />
        ) : null}
      </div>
    );
  }
}

export default SingleODE;
