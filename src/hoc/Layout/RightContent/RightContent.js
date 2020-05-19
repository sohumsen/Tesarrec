import React, { Component } from "react";
import classes from "./RightContent.module.css";
import MESPic from "../../../components/UI/MESandMFCPics/MESPic/MESPic";
import MFCPic from "../../../components/UI/MESandMFCPics/MFCPic/MFCPic";

import MySliderContainer from "../../../components/UI/SliderContainer/SliderContainer";
import MySlider from "../../../components/UI/SliderContainer/Slider/Slider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import SliderWithText from "../../../components/UI/SliderContainer/Slider/SliderWithText";


const PurpleSwitch = withStyles({
  switchBase: {
    color: "white",
    "&$checked": {
      color: "white",
    },
    "&$checked + $track": {
      backgroundColor: "white",
    },
  },
  checked: {},
  track: {},
})(Switch);

class RightContent extends Component {
  state = {
    showEnergySliders: false,
  };

  showEnergySliderHandler = (event) => {
    console.log(event.target.checked);

    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    let environmentSliders = null;

    if (this.state.showEnergySliders) {
      environmentSliders = (

        <MySliderContainer>

          <SliderWithText
            displayCaption={"CCGT "}
            value={this.props.CCGT}
            displayValue={this.props.CCGT}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange("CCGT")}
            InputhandleChange={this.props.InputhandleChange("CCGT")}

          />
          <SliderWithText
            displayCaption={"Nuclear "}
            value={this.props.Nuclear}
            displayValue={this.props.Nuclear}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange("Nuclear")}
            InputhandleChange={this.props.InputhandleChange("Nuclear")}

          />
          <SliderWithText
            displayCaption={"Biomass "}
            value={this.props.Biomass}
            displayValue={this.props.Biomass}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange("Biomass")}
            InputhandleChange={this.props.InputhandleChange("Biomass")}

          />
          <SliderWithText
            displayCaption={"Coal "}
            value={this.props.Coal}
            displayValue={this.props.Coal}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange("Coal")}

            InputhandleChange={this.props.InputhandleChange("Coal")}

          />
          <SliderWithText
            displayCaption={"Wind "}
            value={this.props.Wind}
            displayValue={this.props.Wind}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange("Wind")}
            InputhandleChange={this.props.InputhandleChange("Wind")}

          />
          <SliderWithText
            displayCaption={"Solar "}
            value={this.props.Solar}
            displayValue={this.props.Solar}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange("Solar")}
            InputhandleChange={this.props.InputhandleChange("Solar")}

          />
          <SliderWithText
            displayCaption={"Oil "}
            value={this.props.Oil}
            displayValue={this.props.Oil}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange("Oil")}
            InputhandleChange={this.props.InputhandleChange("Oil")}

          />
          <SliderWithText
            displayCaption={"OCGT "}
            value={this.props.OCGT}
            displayValue={this.props.OCGT}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange("OCGT")}
            InputhandleChange={this.props.InputhandleChange("CCGT")}

          />
          <SliderWithText
            displayCaption={"Hydroelectric "}
            value={this.props.Hydroelectric}
            displayValue={this.props.Hydroelectric}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange("Hydroelectric")}
            InputhandleChange={this.props.InputhandleChange("Hydroelectric")}

          />
          <SliderWithText
            displayCaption={"PumpedHydro "}
            value={this.props.PumpedHydro}
            displayValue={this.props.PumpedHydro}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange("PumpedHydro")}
            InputhandleChange={this.props.InputhandleChange("PumpedHydro")}

          />
          <SliderWithText
            displayCaption={"Other "}
            value={this.props.Other}
            displayValue={this.props.Other}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange("Other")}
            InputhandleChange={this.props.InputhandleChange("Other")}

          />
        </MySliderContainer>
      );
    }
    return (
      <div className={classes.RightContent}>

        
        {this.props.MES ? <MESPic height={200}/>:<MFCPic height={200}/>}

        <p>
          X-axis -<b>Anode Substrate:</b> {this.props.AnodeSubstrateChemical}
        </p>
        <p>
          Y-axis -<b>Cathode Product :</b> {this.props.CathodeProductChemical}
        </p>
        <p>
          <b>Value :</b> {this.props.chosenValue}
        </p>

        <MySliderContainer>
          <SliderWithText
            displayCaption={"Anode substrate concentration in g/L "}
            value={this.props.AnodeSubstrateConcentration}
            InputhandleChange={this.props.InputhandleChange("AnodeSubstrateConcentration")}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange(
              "AnodeSubstrateConcentration"
            )
          }
          />
          <SliderWithText
            displayCaption={"Cell volume in L"}
            value={this.props.Volume}
            InputhandleChange={this.props.InputhandleChange("Volume")}
            lowestVal={0}
            highestVal={1000}
            SliderhandleChange={this.props.SliderhandleChange("Volume")}
          />
          <SliderWithText
            displayCaption={"Efficiency "}
            value={this.props.efficiencyValue}
            InputhandleChange={this.props.InputhandleChange("efficiencyValue")}
            lowestVal={0}
            highestVal={1}
            SliderhandleChange={this.props.SliderhandleChange(
              "efficiencyValue"
            )}
          />
        </MySliderContainer>

        <FormControlLabel
          control={
            <PurpleSwitch
              checked={this.state.showEnergySliders}
              onChange={this.showEnergySliderHandler}
              name="showEnergySliders"
              color="primary"
            />
          }
          label="Show Environment"
        />
        {environmentSliders}
      </div>
    );
  }
}
export default RightContent;
