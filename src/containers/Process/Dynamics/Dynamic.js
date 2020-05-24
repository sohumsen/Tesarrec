import React, { Component } from "react";
import SolveDiffEquations from "../../../components/Calculations/Method/SolveDiffEquations";
import Input from "../../../components/UI/DEAD/Input/Input";
import MyMathJax from "../../../components/UI/Math/MyMathJax";
import MathJax from "react-mathjax";
import MyMathQuill from "../../../components/UI/Math/MyMathQuill";
import { evaluate } from "mathjs";

class Dynamic extends Component {
  /**
   * Visual Component that contains the textbox for the equation and calculation outputs
   * plus some equation labels
   *
   */
  state = {
    calculate: true,
    latex: "e^x",
    text: "e^x",
  };

  validateExpression = (expr) => {
    try {
      evaluate(expr, { x: 1, y: 1 });
      return true;
    } catch (error) {
      return false;
    }
  };

  handleMathQuillInputChange = (mathField) => {
    this.setState({
      latex: mathField.latex(),
      text: mathField.text(),
      calculate: false,
    });
  };

  handleMathQuillInputSubmit = (event) => {
    event.preventDefault();

    if (this.validateExpression(this.state.text)) {
      this.setState({ calculate: true });
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
            latex={this.state.latex}
            onInputChange={this.handleMathQuillInputChange}
          />
          <input type="submit" value="Submit" />
        </form>

        {this.state.calculate ? (
          <SolveDiffEquations
            h={0.5}
            X0={-5}
            Y0={-5}
            numberOfCycles={20}
            eqn={this.state.text}
          />
        ) : null}
      </div>
    );
  }
}

export default Dynamic;
