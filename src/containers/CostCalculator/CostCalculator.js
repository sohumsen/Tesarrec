import React, { Component } from "react";
import classes from "./CostCalculator.module.css";
import Picker from './Picker'
class CostCalculator extends Component {
  render() {
    return (
      <div className={classes.Reference}>
        <h1>CostCalculator </h1>
        <Picker/>

      </div>
    );
  }
}

export default CostCalculator;
