import React, { Component } from "react";
import SolverAnalysisCalc from '../../../components/Calculations/Dynamic/LinearCoupled/SolverAnalysis'


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

      <div><p>hi</p><SolverAnalysisCalc/></div>
    );
  }
}

export default SolverAnalysis;
