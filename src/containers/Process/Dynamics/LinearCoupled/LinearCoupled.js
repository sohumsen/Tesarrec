import React, { Component } from "react";
import LinearCoupledDiffEquations from "../../../../components/Calculations/Method/LinearCoupledDiffEquations";

import MyMathQuill from "../../../../components/UI/Math/MyMathQuill";
import { evaluate } from "mathjs";
import MyButton from "../../../../components/UI/Button/Button";
import classes from "../SingleODE/SingleODE.module.css";

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
      "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
    Eqn1LinearCoupledDiffText: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
    Eqn2LinearCoupledDiffLatex: "\\frac{7.1ab}{0.103+a}-0.142b",
    Eqn2LinearCoupledDiffText: "(7.1*a*b)/(0.103+a)-0.142*b",
    Eqn3LinearCoupledDiffLatex: "\\frac{0.6ac}{0.103+a}-0.0102c",
    Eqn3LinearCoupledDiffText: "(0.6*a*c)/(0.103+a)-0.0102*c",
    DaByDtLatex: "\\frac{da}{dt}=",
    DbByDtLatex: "\\frac{db}{dt}=",
    DcByDtLatex: "\\frac{dc}{dt}=",
  };
  //\\frac{-0.09 \\cdot a \\cdot b}{0.103+a}-\\frac{0.84 \\cdot a \\cdot c}{0.425+a}
  //\\frac{7.1 \\cdot a \\cdot b}{0.103+a}-(0.142 \\cdot b)
  //\\frac{0.6 \\cdot a \\cdot c}{0.103+a}-(0.0102 \\cdot c)

  validateExpression = (expr) => {
    try {
      evaluate(expr, { a: 1, b: 1, c: 1 });
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

    if (
      this.validateExpression(this.state.Eqn1LinearCoupledDiffText) &&
      this.validateExpression(this.state.Eqn2LinearCoupledDiffText) &&
      this.validateExpression(this.state.Eqn3LinearCoupledDiffText)
    ) {
      this.setState({ calculate: true });
    } else {
      alert("invalid equation");
    }
  };

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.Form}>

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
            <div className={classes.ButtonPos}>
              <MyButton type="submit" value="Submit" />
            </div>
          </form>
        </div>
        <div className={classes.Graph}>
          {this.state.calculate ? (
            <LinearCoupledDiffEquations
              h={0.05}
              numberOfCycles={40}
              eqn1={this.state.Eqn1LinearCoupledDiffText}
              eqn2={this.state.Eqn2LinearCoupledDiffText}
              eqn3={this.state.Eqn3LinearCoupledDiffText}
              LineNames={["a", "b", "c"]}

              a={1}
              b={0.5}
              c={0.75}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default LinearCoupled;
