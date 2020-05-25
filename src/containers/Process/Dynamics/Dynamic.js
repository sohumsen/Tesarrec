import React, { Component } from "react";
import SolveDiffEquations from "../../../components/Calculations/Method/SolveDiffEquations";
import LinearCoupledDiffEquations from "../../../components/Calculations/Method/LinearCoupledDiffEquations";

import MyMathQuill from "../../../components/UI/Math/MyMathQuill";
import { evaluate } from "mathjs";

class Dynamic extends Component {
  /**
   * Visual Component that contains the textbox for the equation and calculation outputs
   * plus some equation labels
   *
   */

   //y1=a, y2=b,y3=c
  state = {
    calculateSingleDiff: true,
    SingleDiffChangeableLatex: "e^x",
    SingleDiffChangeableText: "e^x",
    Eqn1LinearCoupledDiffLatex:
      "\\frac{-0.09 \\cdot a \\cdot b}{0.103+a}-\\frac{0.84 \\cdot a \\cdot c}{0.425+a}",
    Eqn1LinearCoupledDiffText:
      "(-0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
    Eqn2LinearCoupledDiffLatex:
      "\\frac{7.1 \\cdot a \\cdot b}{0.103+a}-(0.142 \\cdot b)",
    Eqn2LinearCoupledDiffText: "((7.1*a*b)/(0.103+a))-(0.142*b)",
    Eqn3LinearCoupledDiffLatex:
      "\\frac{0.6 \\cdot a \\cdot c}{0.103+a}-(0.0102 \\cdot c)",
    Eqn3LinearCoupledDiffText: "((0.6*a*c)/(0.103+a))-(0.0102*c)",
  };
  validateExpression = (expr) => {
    try {
      evaluate(expr, { x: 1, y: 1 });
      return true;
    } catch (error) {
      return false;
    }
  };

  handleMathQuillInputChange = (nameLatex, nameText) => (mathField) => {
    console.log(this.state)

    console.log(nameLatex,nameText, mathField.text())
    this.setState({
      [nameLatex]:mathField.latex(),
      [nameText]: mathField.text(),
      calculateSingleDiff: false,
    });
    console.log(this.state)

  };

  handleMathQuillInputSubmit = (event) => {
    event.preventDefault();

    console.log(this.state)

    if (this.validateExpression(this.state.SingleDiffChangeableText)) {
      this.setState({ calculateSingleDiff: true });
    } else {
      alert("invalid equation");
    }
  };

  render() {
    return (
      <div>
        <h1>Dynamic </h1>

        <form onSubmit={this.handleMathQuillInputSubmit}>
          <MyMathQuill
            latex={this.state.SingleDiffChangeableLatex}
            onInputChange={this.handleMathQuillInputChange(
              "SingleDiffChangeableLatex",
              "SingleDiffChangeableText"
            )}
          />
          <input type="submit" value="Submit" />
        </form>

        {this.state.calculateSingleDiff ? (
          <SolveDiffEquations
            h={0.5}
            X0={-5}
            Y0={-5}
            numberOfCycles={20}
            eqn={this.state.SingleDiffChangeableText}
          />
        ) : null}

        <form onSubmit={this.handleMathQuillInputSubmit}>
          <MyMathQuill
            latex={this.state.Eqn1LinearCoupledDiffLatex}
            onInputChange={this.handleMathQuillInputChange(
              "Eqn1LinearCoupledDiffLatex",
              "Eqn1LinearCoupledDiffText"
            )}
          />
          <MyMathQuill
            latex={this.state.Eqn2LinearCoupledDiffLatex}
            onInputChange={this.handleMathQuillInputChange(
              "Eqn2LinearCoupledDiffLatex",
              "Eqn2LinearCoupledDiffText"
            )}
          />
          <MyMathQuill
            latex={this.state.Eqn3LinearCoupledDiffLatex}
            onInputChange={this.handleMathQuillInputChange(
              "Eqn3LinearCoupledDiffLatex",
              "Eqn3LinearCoupledDiffText"
            )}
          />
          <input type="submit" value="Submit" />
        </form>

        <LinearCoupledDiffEquations
          h={0.1}
          numberOfCycles={20}
          eqn1={this.state.Eqn1LinearCoupledDiffText}
          eqn2={this.state.Eqn2LinearCoupledDiffText}
          eqn3={this.state.Eqn3LinearCoupledDiffText}
          a={1}
          b={0.5}
          c={0.75}
        />
      </div>
    );
  }
}

export default Dynamic;
