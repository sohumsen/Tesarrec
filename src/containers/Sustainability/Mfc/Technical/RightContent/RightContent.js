import React, { Component } from "react";
import classes from "./RightContent.module.css";

import MySliderContainer from "../../../../../components/UI/SliderContainer/SliderContainer";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import SliderWithText from "../../../../../components/UI/SliderContainer/Slider/SliderWithText";
import FormGroup from "@material-ui/core/FormGroup";

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
    showEnergySliders: false,
    showCostSliders: false,
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
            rootWidth={"43%"}
            inputWidth={52}
            displayCaption={"CCGT "}
            value={this.props.CCGT}
            displayValue={this.props.CCGT}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange("CCGT")}
            InputhandleChange={this.props.InputhandleChange("CCGT")}
          />
          <SliderWithText
            rootWidth={"43%"}
            inputWidth={52}
            displayCaption={"Nuclear "}
            value={this.props.Nuclear}
            displayValue={this.props.Nuclear}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange("Nuclear")}
            InputhandleChange={this.props.InputhandleChange("Nuclear")}
          />
          <SliderWithText
            rootWidth={"43%"}
            inputWidth={52}
            displayCaption={"Biomass "}
            value={this.props.Biomass}
            displayValue={this.props.Biomass}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange("Biomass")}
            InputhandleChange={this.props.InputhandleChange("Biomass")}
          />
          <SliderWithText
            rootWidth={"43%"}
            inputWidth={52}
            displayCaption={"Coal "}
            value={this.props.Coal}
            displayValue={this.props.Coal}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange("Coal")}
            InputhandleChange={this.props.InputhandleChange("Coal")}
          />
          <SliderWithText
            rootWidth={"43%"}
            inputWidth={52}
            displayCaption={"Wind "}
            value={this.props.Wind}
            displayValue={this.props.Wind}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange("Wind")}
            InputhandleChange={this.props.InputhandleChange("Wind")}
          />
          <SliderWithText
            rootWidth={"43%"}
            inputWidth={52}
            displayCaption={"Solar "}
            value={this.props.Solar}
            displayValue={this.props.Solar}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange("Solar")}
            InputhandleChange={this.props.InputhandleChange("Solar")}
          />
          <SliderWithText
            rootWidth={"43%"}
            inputWidth={52}
            displayCaption={"Oil "}
            value={this.props.Oil}
            displayValue={this.props.Oil}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange("Oil")}
            InputhandleChange={this.props.InputhandleChange("Oil")}
          />
          <SliderWithText
            rootWidth={"43%"}
            inputWidth={52}
            displayCaption={"OCGT "}
            value={this.props.OCGT}
            displayValue={this.props.OCGT}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange("OCGT")}
            InputhandleChange={this.props.InputhandleChange("CCGT")}
          />
          <SliderWithText
            rootWidth={"43%"}
            inputWidth={52}
            displayCaption={"Hydroelectric "}
            value={this.props.Hydroelectric}
            displayValue={this.props.Hydroelectric}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange("Hydroelectric")}
            InputhandleChange={this.props.InputhandleChange("Hydroelectric")}
          />
          <SliderWithText
            rootWidth={"43%"}
            inputWidth={52}
            displayCaption={"PumpedHydro "}
            value={this.props.PumpedHydro}
            displayValue={this.props.PumpedHydro}
            lowestVal={0}
            highestVal={100}
            SliderhandleChange={this.props.SliderhandleChange("PumpedHydro")}
            InputhandleChange={this.props.InputhandleChange("PumpedHydro")}
          />
          <SliderWithText
            rootWidth={"43%"}
            inputWidth={52}
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

    let costSliders = null;

    if (this.state.showCostSliders) {
      costSliders = (
        <MySliderContainer>
          <h3>Delivered cost</h3>
          <SliderWithText
            rootWidth={"43%"}
            inputWidth={52}
            displayCaption={"Anode €/m²"}
            value={this.props.AnodeCost}
            displayValue={this.props.AnodeCost}
            lowestVal={5}
            highestVal={20}
            SliderhandleChange={this.props.SliderhandleChange("AnodeCost")}
            InputhandleChange={this.props.InputhandleChange("AnodeCost")}
          />
          <SliderWithText
            rootWidth={"43%"}
            inputWidth={52}
            displayCaption={"Cathode €/m²"}
            value={this.props.CathodeCost}
            displayValue={this.props.CathodeCost}
            lowestVal={5}
            highestVal={20}
            SliderhandleChange={this.props.SliderhandleChange("CathodeCost")}
            InputhandleChange={this.props.InputhandleChange("CathodeCost")}
          />

          <SliderWithText
            rootWidth={"43%"}
            inputWidth={52}
            displayCaption={"Lang Factor "}
            value={this.props.LangFactorCost}
            displayValue={this.props.LangFactorCost}
            lowestVal={1.5}
            highestVal={5}
            SliderhandleChange={this.props.SliderhandleChange("LangFactorCost")}
            InputhandleChange={this.props.InputhandleChange("LangFactorCost")}
          />

          <h3>Variables for NPV calculations </h3>
          <SliderWithText
            rootWidth={"43%"}
            inputWidth={52}
            displayCaption={"Annual Capital Charge "}
            value={this.props.AnnualCapitalChargeCost}
            displayValue={this.props.AnnualCapitalChargeCost}
            lowestVal={0.05}
            highestVal={0.15}
            SliderhandleChange={this.props.SliderhandleChange(
              "AnnualCapitalChargeCost"
            )}
            InputhandleChange={this.props.InputhandleChange(
              "AnnualCapitalChargeCost"
            )}
          />

          <SliderWithText
            rootWidth={"43%"}
            inputWidth={52}
            displayCaption={"IRR "}
            value={this.props.IRRCost}
            displayValue={this.props.IRRCost}
            lowestVal={0.05}
            highestVal={0.15}
            SliderhandleChange={this.props.SliderhandleChange("IRRCost")}
            InputhandleChange={this.props.InputhandleChange("IRRCost")}
          />

          <h3>Price of utility</h3>
          <SliderWithText
            rootWidth={"43%"}
            inputWidth={52}
            displayCaption={"Anolyte €/m³"}
            value={this.props.AnolyteCost}
            displayValue={this.props.AnolyteCost}
            lowestVal={0.001}
            highestVal={0.002}
            SliderhandleChange={this.props.SliderhandleChange("AnolyteCost")}
            InputhandleChange={this.props.InputhandleChange("AnolyteCost")}
          />
          <SliderWithText
            rootWidth={"43%"}
            inputWidth={52}
            displayCaption={"Catholyte €/m³"}
            value={this.props.CatholyteCost}
            displayValue={this.props.CatholyteCost}
            lowestVal={0.1}
            highestVal={1}
            SliderhandleChange={this.props.SliderhandleChange("CatholyteCost")}
            InputhandleChange={this.props.InputhandleChange("CatholyteCost")}
          />
          <SliderWithText
            rootWidth={"43%"}
            inputWidth={52}
            displayCaption={"Electricity Price €/kWh"}
            value={this.props.ElectricityPriceCost}
            displayValue={this.props.ElectricityPriceCost}
            lowestVal={0.05}
            highestVal={0.2}
            SliderhandleChange={this.props.SliderhandleChange(
              "ElectricityPriceCost"
            )}
            InputhandleChange={this.props.InputhandleChange(
              "ElectricityPriceCost"
            )}
          />
        </MySliderContainer>
      );
    }
    return (
      <div className={classes.RightContent}>
        <h2>Settings</h2>
        <br />
        <p>
          X-axis -<b>Anode Substrate:</b> {this.props.AnodeSubstrateChemical}
        </p>
        <p>
          Y-axis -<b>Electricity</b>
        </p>
        <p>
          <b>Value :</b> {this.props.chosenValue}
        </p>

        <MySliderContainer>
          <SliderWithText
            rootWidth={"90%"}
            inputWidth={42}
            displayCaption={"Anode substrate concentration in g/L "}
            value={this.props.AnodeSubstrateConcentration}
            InputhandleChange={this.props.InputhandleChange(
              "AnodeSubstrateConcentration"
            )}
            lowestVal={0}
            highestVal={10}
            SliderhandleChange={this.props.SliderhandleChange(
              "AnodeSubstrateConcentration"
            )}
          />
          <SliderWithText
            rootWidth={"53%"}
            inputWidth={52}
            displayCaption={"Volumetric flowrate L/h"}
            value={this.props.Volume}
            InputhandleChange={this.props.InputhandleChange("Volume")}
            lowestVal={0}
            highestVal={1000}
            SliderhandleChange={this.props.SliderhandleChange("Volume")}
          />
          <SliderWithText
            rootWidth={"40%"}
            inputWidth={52}
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

        <div className={classes.toggleSlider}>
          <FormGroup row>
            <FormControlLabel
              control={
                <PurpleSwitch
                  checked={this.state.showEnergySliders}
                  onChange={this.showEnergySliderHandler}
                  name="showEnergySliders"
                  color="primary"
                />
              }
              label="Environment"
              labelPlacement="start"
            />

            <FormControlLabel
              control={
                <PurpleSwitch
                  checked={this.state.showCostSliders}
                  onChange={this.showEnergySliderHandler}
                  name="showCostSliders"
                  color="primary"
                />
              }
              label="Cost"
              labelPlacement="start"
            />
            {environmentSliders}

            {costSliders}
          </FormGroup>
        </div>
      </div>
    );
  }
}
export default RightContent;
