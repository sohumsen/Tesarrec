import React, { Component } from "react";
import classes from "./RightContent.module.css";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import MySliderContainer from "../../../../../components/UI/SliderContainer/SliderContainer";

import SliderWithText from "../../../../../components/UI/SliderContainer/Slider/SliderWithText";
import bioethanolSource from "../HeatMapForm/bioethanolSource.json";

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

    // if (this.state.showSocialSliders) {
    //   socialSliders = (
    //     <MySliderContainer>
    //       <h3>Social</h3>
    //       <SliderWithText
    //         rootWidth={"50%"}
    //         inputWidth={72}
    //         displayCaption={"Proportion import from Denmark"}
    //         value={this.props.ProportionImportDenmark}
    //         displayValue={this.props.ProportionImportDenmark}
    //         lowestVal={0}
    //         highestVal={1}
    //         SliderhandleChange={this.props.SliderhandleChange(
    //           "ProportionImportDenmark"
    //         )}
    //         InputhandleChange={this.props.InputhandleChange(
    //           "ProportionImportDenmark"
    //         )}
    //       />
    //       <SliderWithText
    //         rootWidth={"50%"}
    //         inputWidth={72}
    //         displayCaption={"Proportion import from Ireland"}
    //         value={this.props.ProportionImportIreland}
    //         displayValue={this.props.ProportionImportIreland}
    //         lowestVal={0}
    //         highestVal={1}
    //         SliderhandleChange={this.props.SliderhandleChange(
    //           "ProportionImportIreland"
    //         )}
    //         InputhandleChange={this.props.InputhandleChange(
    //           "ProportionImportIreland"
    //         )}
    //       />

    //       <SliderWithText
    //         rootWidth={"50%"}
    //         inputWidth={72}
    //         displayCaption={"Proportion import from Belgium"}
    //         value={this.props.ProportionImportBelgium}
    //         displayValue={this.props.ProportionImportBelgium}
    //         lowestVal={0}
    //         highestVal={1}
    //         SliderhandleChange={this.props.SliderhandleChange(
    //           "ProportionImportBelgium"
    //         )}
    //         InputhandleChange={this.props.InputhandleChange(
    //           "ProportionImportBelgium"
    //         )}
    //       />
    //       <SliderWithText
    //         rootWidth={"50%"}
    //         inputWidth={72}
    //         displayCaption={"Proportion import from Netherlands"}
    //         value={this.props.ProportionImportNetherlands}
    //         displayValue={this.props.ProportionImportNetherlands}
    //         lowestVal={0}
    //         highestVal={1}
    //         SliderhandleChange={this.props.SliderhandleChange(
    //           "ProportionImportNetherlands"
    //         )}
    //         InputhandleChange={this.props.InputhandleChange(
    //           "ProportionImportNetherlands"
    //         )}
    //       />
    //       <SliderWithText
    //         rootWidth={"50%"}
    //         inputWidth={72}
    //         displayCaption={"Proportion import from France"}
    //         value={this.props.ProportionImportFrance}
    //         displayValue={this.props.ProportionImportFrance}
    //         lowestVal={0}
    //         highestVal={1}
    //         SliderhandleChange={this.props.SliderhandleChange(
    //           "ProportionImportFrance"
    //         )}
    //         InputhandleChange={this.props.InputhandleChange(
    //           "ProportionImportFrance"
    //         )}
    //       />
    //     </MySliderContainer>
    //   );
    // }

    let allSliders = bioethanolSource["Sheet1"].map((config) => {
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
          />

          {this.state.showSocialSliders ? (
            <div className={classes.sliders}>{socialSliders}</div>
          ) : null}
        </MySliderContainer>
      </div>
    );
  }
}
export default RightContent;
