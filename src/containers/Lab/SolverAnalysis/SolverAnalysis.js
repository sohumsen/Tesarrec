import React, { Component } from "react";
import SolverAnalysisGrapher from "../../../components/Calculations/Dynamic/LinearCoupled/SolverAnalysisSolver";
import classes from "./SolverAnalysis.module.css";
import { Paper } from "@material-ui/core";


class SolverAnalysis extends Component {
  /**
   * Visual Component that contains the textbox for the equation and calculation outputs
   * plus some equation labels
   *
   */
  state = {};

  render() {
    return (
      // can u inject a background-color: ranmdom lookup color if DEVMODE=TRUE

      <div className={classes.Container}>
        <SolverAnalysisGrapher />
      </div>
    );
  }
}

export default SolverAnalysis;
