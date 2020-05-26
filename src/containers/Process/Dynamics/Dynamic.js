import React, { Component } from "react";
import SingleODE from './SingleODE/SingleODE'
import LinearCoupled from './LinearCoupled/LinearCoupled'



class Dynamic extends Component {
  /**
   * Visual Component that contains the textbox for the equation and calculation outputs
   * plus some equation labels
   *
   */


  render() {
    return (
      <div>
        <h1>Dynamic </h1>
        <SingleODE/>
        <LinearCoupled/>

      </div>
    );
  }
}

export default Dynamic;
