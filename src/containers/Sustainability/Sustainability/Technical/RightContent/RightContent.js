import React, { Component } from "react";
import classes from "./RightContent.module.css";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import MySliderContainer from "../../../../../components/UI/SliderContainer/SliderContainer";

import SliderWithText from "../../../../../components/UI/SliderContainer/Slider/SliderWithText";

const PurpleSwitch = withStyles({
  switchBase: {
    color: "black",
    "&$checked": {
      color: "black",
    },
    "&$checked + $track": {
      backgroundColor: "black",
    },
  },
  checked: {},
  track: {},
})(Switch);
class RightContent extends Component {
  state = {
    showSocialSliders: true,
  };

  showEnergySliderHandler = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };
  render() {
    let socialSliders = null;


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
      <div className={classes.RightContent}>
        <h2>Settings</h2>
        <br />
        <MySliderContainer>
        {allSliders}

        
{/* 
          <FormControlLabel
            control={
              <PurpleSwitch
                checked={this.state.showSocialSliders}
                onChange={this.showEnergySliderHandler}
                name="showSocialSliders"
                color="primary"
              />
            }
            label="Social"
            labelPlacement="start"
          /> */}

          {this.state.showSocialSliders ? (
            <div className={classes.sliders}>{socialSliders}</div>
          ) : null}
        </MySliderContainer>
      </div>
    );
  }
}
export default RightContent;
