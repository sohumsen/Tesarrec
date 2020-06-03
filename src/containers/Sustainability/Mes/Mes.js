import React, { Component } from "react";


import classes from './Mes.module.css'
//import Economic from './Economic/Economic'
//import Environmental from './Environmental/Environmental'
//import Social from './Social/Social'
import HeatMapForm from './Technical/HeatMapForm/HeatMapFormMES'
class Mes extends Component {
  render() {

    
    return (
      <div className={classes.parentContainer}>
        <h1>Microbial Electrosynthesis</h1>

        <HeatMapForm/>

      </div>
    );
  }
}

export default Mes;
