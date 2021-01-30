import React, { Component } from "react";

import classes from "./styles.module.css";



import HeatMapForm from "./Technical/HeatMapForm/HeatMapForm";

class Sustainability extends Component {

  render() {
    return (
      <div className={classes.parentContainer} elevation={3}>
        <HeatMapForm
      
        />
      </div>
    );
  }
}

export default Sustainability;
