import React, { Component } from "react";
import classes from "./RightContent.module.css";

import RefreshIcon from "@material-ui/icons/Refresh";
import SliderWithText from "../../../components/UI/SliderContainer/Slider/SliderWithText";
import { Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import UserNav from "./../UserNav.json";

class RightContent extends Component {
  state = {
    showSocialSliders: true,
  };

  showEnergySliderHandler = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };
  render() {  
    console.log(UserNav)
    let allSliders = UserNav.map((config) => {
      var fields = config["Range"].split("-");
      console.log(fields)
      let lowestVal = parseFloat(fields[0]);
      let highestVal = parseFloat(fields[1]);


      return (
        <SliderWithText
          rootWidth={300}
          inputWidth={72}
          displayCaption={config["User Navigation Bar"]}
          value={this.props.userNavData[config["VariableName"]]}
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
        <IconButton
          style={{
            float: "right",
            position: "absolute",
            right: 10,
            top: 0,
          }}
          onClick={
            ()=>{
              this.props.updateNewState()
            }
          }
        >
          <RefreshIcon />
        </IconButton>
        {allSliders}
      </Paper>
    );
  }
}
export default RightContent;
