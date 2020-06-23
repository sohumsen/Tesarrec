import React, { Component } from "react";
import SingleODE from "./SingleODE/SingleODE";
import LinearCoupled from "./LinearCoupled/LinearCoupled";
import MyTabs from "../../components/UI/MyTabs/MyTabs";
import classes from "./ModelBench.module.css";
class Dynamic extends Component {
  /**
   * Visual Component that contains the textbox for the equation and calculation outputs
   * plus some equation labels
   *
   */

  render() {
    return (
      <div className={classes.ModelBenchContainer}>
{/*        <FileController/>
        <TemplateController/>*/}
      
          <SingleODE />
          <LinearCoupled userId={this.props.userId} token={this.props.token} />
      </div>
    );
  }
}

export default Dynamic;
