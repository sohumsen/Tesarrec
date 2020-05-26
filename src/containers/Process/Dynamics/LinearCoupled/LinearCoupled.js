import React, { Component } from "react";
import LinearCoupledDiffEquations from "../../../../components/Calculations/Method/LinearCoupledDiffEquations";

import MyMathQuill from "../../../../components/UI/Math/MyMathQuill";
import { evaluate } from "mathjs";
import {toTex} from 'algebra.js'
import { parse, simplify } from "mathjs";


class LinearCoupled extends Component {
  /**
   * Visual Component that contains the textbox for the equation and calculation outputs
   * plus some equation labels
   *
   */

  //y1=a, y2=b,y3=c
  state = {
    calculate: true,

    Eqn1LinearCoupledDiffLatex:
      "(-0.09a*b)/(0.103+a)-(0.84a*c)/(0.425+a)",
    Eqn1LinearCoupledDiffText: "(-0.09a*b)/(0.103+a)-(0.84a*c)/(0.425+a)",
    Eqn2LinearCoupledDiffLatex:
      "((7.1a*b)/(0.103+a))-(0.142b)",
    Eqn2LinearCoupledDiffText: "((7.1a*b)/(0.103+a))-(0.142b)",
    Eqn3LinearCoupledDiffLatex:
      "((0.6a*c)/(0.103+a))-(0.0102c)",
    Eqn3LinearCoupledDiffText: "((0.6a*c)/(0.103+a))-(0.0102c)",
    DaByDtLatex: "\\frac{da}{dt}=",
    DbByDtLatex: "\\frac{db}{dt}=",
    DcByDtLatex: "\\frac{dc}{dt}=",
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


    if (this.validateExpression(this.state.Eqn1LinearCoupledDiffText)&&this.validateExpression(this.state.Eqn2LinearCoupledDiffText)&&this.validateExpression(this.state.Eqn3LinearCoupledDiffText)) {
      this.setState({ calculateSingleDiff: true });
    } else {
      alert("invalid equation");
    }
  };

  render() {
    return (
      <div>
        <h1>LinearCoupled </h1>


        <form onSubmit={this.handleMathQuillInputSubmit}>
          <MyMathQuill
            firstBit={this.state.DaByDtLatex}
            latex={this.state.Eqn1LinearCoupledDiffLatex}
            onInputChange={this.handleMathQuillInputChange(
              "Eqn1LinearCoupledDiffLatex",
              "Eqn1LinearCoupledDiffText"
            )}
          />
          <MyMathQuill
            firstBit={this.state.DbByDtLatex}
            latex={this.state.Eqn2LinearCoupledDiffLatex}
            onInputChange={this.handleMathQuillInputChange(
              "Eqn2LinearCoupledDiffLatex",
              "Eqn2LinearCoupledDiffText"
            )}
          />
          <MyMathQuill
            firstBit={this.state.DcByDtLatex}
            latex={this.state.Eqn3LinearCoupledDiffLatex}
            onInputChange={this.handleMathQuillInputChange(
              "Eqn3LinearCoupledDiffLatex",
              "Eqn3LinearCoupledDiffText"
            )}
          />
          <input type="submit" value="Submit" />
        </form>

        {this.state.calculate ? (

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
        ) : null}
      </div>
    );
  }
}

export default LinearCoupled;
