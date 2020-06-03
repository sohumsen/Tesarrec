import React, { Component } from "react";


import classes from './Mfc.module.css'

import HeatMapForm from './Technical/HeatMapForm/HeatMapFormMFC'
class MFC extends Component {
  render() {

    
    return (
      <div className={classes.parentContainer}>
        <h1>Microbial Fuel Cell</h1>

        <HeatMapForm/>

      </div>
    );
  }
}

export default MFC;
