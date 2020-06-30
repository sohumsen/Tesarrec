import React, { Component } from "react";
import MyTabs from "../../components/UI/MyTabs/MyTabs";
import classes from "./Dynamic.module.css";
import Mes from "./Mes/Mes";
class Dynamic extends Component {
  /**
   * Visual Component that contains the textbox for the equation and calculation outputs
   * plus some equation labels
   *
   */
  state = {
    choiceValue: 0,
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
          labels={["MES","MFC"]}
        />

        {this.state.choiceValue === 0 ? 
          <Mes />
       : <p>hi</p>}
      </div>
    );
  }
}

export default Dynamic;
