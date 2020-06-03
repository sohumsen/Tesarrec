import React, { Component } from "react";
import SolveDiffEquations from "../../../components/Calculations/Method/SolveDiffEquations";

import MyMathQuill from "../../../components/UI/Math/MyMathQuill";
import { evaluate } from "mathjs";
import MyButton from "../../../components/UI/Button/GenericButton";
import classes from "./SingleODE.module.css";
import GraphConfig from '../../../components/UI/GraphConfig/GraphConfig'
import SettingButton from '../../../components/UI/Button/SettingButton'

class SingleODE extends Component {
  /**
   * Visual Component that contains the textbox for the equation and calculation outputs
   * plus some equation labels
   *
   */

  //y1=a, y2=b,y3=c
  state = {
    graphConfig: {
      show: false,
      LegendHorizontal: "left",
      LegendVertical: "top",
    },
    submitted: true,
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
      submitted: false,
    });
  };

  handleMathQuillInputSubmit = (event) => {
    event.preventDefault();
    if (this.validateExpression(this.state.SingleDiffChangeableText)) {
      this.setState({ submitted: true });
    } else {
      alert("invalid equation");
    }
  };

  resetForm = (event) => {
    this.setState({
      submitted: true,
      SingleDiffChangeableLatex: "e^x",
      SingleDiffChangeableText: "e^x",
    });
    console.log(this.state.submitted);
  };
  configureChart = () => {
    let graphConfig = { ...this.state.graphConfig };
    graphConfig.show = !this.state.graphConfig.show;
    console.log(graphConfig)

    this.setState({ graphConfig: graphConfig });
  };
  onGraphConfigChange = (name) => (event, value) => {

    let graphConfig = { ...this.state.graphConfig };
    graphConfig[name] = event.target.value;
    console.log(graphConfig)

    this.setState({ graphConfig: graphConfig });
  };

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.Form}>
          <form onSubmit={this.handleMathQuillInputSubmit}>
            <div className={classes.Eqn}>

            <MyMathQuill
              firstBit={this.state.DyByDxLatex}
              latex={this.state.SingleDiffChangeableLatex}
              onInputChange={this.handleMathQuillInputChange(
                "SingleDiffChangeableLatex",
                "SingleDiffChangeableText"
              )}
            />
            </div>

            <div className={classes.ButtonPos}>
              <MyButton type="submit" value="Submit" displayValue="SUBMIT" />
              <MyButton
                type="reset"
                value="Reset"
                displayValue="RESET"
                onClick={this.resetForm}
              />
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
              LegendHorizontal={this.state.graphConfig.LegendHorizontal}
              LegendVertical={this.state.graphConfig.LegendVertical}

            />
          ) : null}
        </div>
        <div className={classes.Button}>
                <SettingButton
                  type="button"
                  value="config"
                  displayValue="CONFIG"
                  onClick={this.configureChart}
                />
              </div>
        {this.state.graphConfig.show ? (
          <GraphConfig
            LegendHorizontal={this.state.graphConfig.LegendHorizontal}
            LegendVertical={this.state.graphConfig.LegendVertical}
            onChange={(val) => this.onGraphConfigChange(val)}
          />
        ) : null}
      </div>
    );
  }
}

export default SingleODE;
