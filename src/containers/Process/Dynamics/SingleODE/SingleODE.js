import React, { Component } from "react";
import SolveDiffEquations from "../../../../components/Calculations/Method/SolveDiffEquations";

import MyMathQuill from "../../../../components/UI/Math/MyMathQuill";
import { evaluate } from "mathjs";
import MyButton from "../../../../components/UI/Button/Button";
import classes from "./SingleODE.module.css";
import CircularProgress from '@material-ui/core/CircularProgress';
import SelectInput from "@material-ui/core/Select/SelectInput";


class SingleODE extends Component {
  /**
   * Visual Component that contains the textbox for the equation and calculation outputs
   * plus some equation labels
   *
   */

  //y1=a, y2=b,y3=c
  state = {
    submitted: true,
    SingleDiffChangeableLatex: "e^x",
    SingleDiffChangeableText: "e^x",
    showSpinner:false,

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
    console.log(mathField.text());
    this.setState({
      [nameLatex]: mathField.latex(),
      [nameText]: mathField.text(),
      submitted: false,
      showSpinner:false
    });
  };

  handleMathQuillInputSubmit = (event) => {
    event.preventDefault();
    this.setState({showSpinner:true})
    if (this.validateExpression(this.state.SingleDiffChangeableText)) {
      this.setState({ submitted: true  });
    } else {
      alert("invalid equation");
    }
  };

  componentDidUpdate(){
    console.log("Now")
  }

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.Form}>

        <form onSubmit={this.handleMathQuillInputSubmit}>
          <MyMathQuill
            firstBit={this.state.DyByDxLatex}
            latex={this.state.SingleDiffChangeableLatex}
            onInputChange={this.handleMathQuillInputChange(
              "SingleDiffChangeableLatex",
              "SingleDiffChangeableText"
            )}
          />
          <div className={classes.ButtonPos}>
            <MyButton type="submit" value="Submit" />

          </div>
        </form>
        </div>
        <div className={classes.Graph}>
        {this.state.submitted ? (
          <SolveDiffEquations
            h={0.5}
            X0={-12.5}
            Y0={-12.5}
            numberOfCycles={50}
            eqn={this.state.SingleDiffChangeableText}
            LineNames={["Euler", "Midpoint", "Runge Kutta"]}

          />
        ) :null}
        { !this.state.showSpinner ? <CircularProgress/>:null}

      </div>
      </div>
    );
  }
}

export default SingleODE;
