import React, { Component } from "react";
import classes from "./RightContent.module.css";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import MySliderContainer from "../../../../../components/UI/SliderContainer/SliderContainer";

import SliderWithText from "../../../../../components/UI/SliderContainer/Slider/SliderWithText";
import { Paper } from "@material-ui/core";

class RightContent extends Component {
  state = {
    showSocialSliders: true,
  };

  showEnergySliderHandler = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };
  render() {

    let allSliders = this.props.source["Sheet1"].map((config) => {
      var fields = config["Range"].split("-");

      let lowestVal = parseFloat(fields[0]);
      let highestVal = parseFloat(fields[1]);
      return (
        <SliderWithText
          rootWidth={"90%"}
          inputWidth={72}
          displayCaption={config["User Navigation Bar"]}
          value={this.props.state[config["VariableName"]]}
          InputhandleChange={this.props.InputhandleChange(
            config["VariableName"]
          )}
          lowestVal={lowestVal}
          highestVal={highestVal}
          SliderhandleChange={this.props.SliderhandleChange(
            config["VariableName"]
          )}
        />
      );
    });

    return (
      <Paper className={classes.RightContent} elevation={3}>
        <h2>Settings</h2>
        <br />
          {allSliders}


      </Paper>
    );
  }
}
export default RightContent;
