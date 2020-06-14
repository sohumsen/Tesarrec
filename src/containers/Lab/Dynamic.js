import React, { Component } from "react";
import SingleODE from "./SingleODE/SingleODE";
import LinearCoupled from "./LinearCoupled/LinearCoupled";
import MyTabs from "../../components/UI/MyTabs/MyTabs";
import classes from './Dynamic.module.css'
class Dynamic extends Component {
  /**
   * Visual Component that contains the textbox for the equation and calculation outputs
   * plus some equation labels
   *
   */
  state = {
    choiceValue: 1,
  };
  handleTabChange = (event, val) => {
    this.setState({ choiceValue: val });
  };

  render() {
    return (
      <div className={classes.DynamicContainer}>
        <MyTabs
          value={this.state.choiceValue}
          handleChange={this.handleTabChange}
        />

        {this.state.choiceValue === 0 ? <SingleODE /> : <LinearCoupled />}
      </div>
    );
  }
}

export default Dynamic;
