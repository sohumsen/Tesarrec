import React, { Component } from "react";

import LeftContent from "../LeftContent/LeftContent";
import RightContent from "../RightContent/RightContent";
import classes from "./HeatMapFormCHP.module.css";
import OverallReactionAnodeCathode from "../../../../../components/Calculations/Sustainability/CHP/OverallReactionAnodeCathodeHeatMapCHP";

class HeatMapFormMFC extends Component {
  state = {
    BiomassMoistureContent: 15,
    BiomassCarbonContent: 52,
    BiomassHydrogenContent: 6,
    BiomassCalorificValue: 19.3,

    BoilerEfficiency: 0.85,
    IsentropicEfficiency: 0.85,
    MechanicalEfficiency: 0.9,

    ElectricityDemand: 5,

    LangFactor: 1.5,
    AnnualCapitalCharge: 0.13,

    ElectricityPrice: 0.07,
    SteamPrice: 22,

    BiomassCost: 40,

    IRRCost: 0.12,
  };

  SliderhandleChange = (name) => (event, value) => {
    this.setState({ [name]: value });
  };

  InputhandleChange = (name) => (event) => {
    let { value,  max } = event.target;

    // if (value !== "") {
    //   value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    // }
    console.log(value,max)

    if (+value > +max) {
      console.log("here")
      value = max;
    }

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <LeftContent />

        <RightContent
          BiomassMoistureContent={this.state.BiomassMoistureContent}
          BiomassCarbonContent={this.state.BiomassCarbonContent}
          BiomassHydrogenContent={this.state.BiomassHydrogenContent}
          BiomassCalorificValue={this.state.BiomassCalorificValue}
          BoilerEfficiency={this.state.BoilerEfficiency}
          IsentropicEfficiency={this.state.IsentropicEfficiency}
          MechanicalEfficiency={this.state.MechanicalEfficiency}
          ElectricityDemand={this.state.ElectricityDemand}
          LangFactor={this.state.LangFactor}
          AnnualCapitalCharge={this.state.AnnualCapitalCharge}
          ElectricityPrice={this.state.ElectricityPrice}
          SteamPrice={this.state.SteamPrice}
          BiomassCost={this.state.BiomassCost}
          IRRCost={this.state.IRRCost}
          InputhandleChange={this.InputhandleChange}
          SliderhandleChange={this.SliderhandleChange}
        />

        <div className={classes.HeatMap}>
          <OverallReactionAnodeCathode
            BiomassMoistureContent={this.state.BiomassMoistureContent}
            BiomassCarbonContent={this.state.BiomassCarbonContent}
            BiomassHydrogenContent={this.state.BiomassHydrogenContent}
            BiomassCalorificValue={this.state.BiomassCalorificValue}
            BoilerEfficiency={this.state.BoilerEfficiency}
            IsentropicEfficiency={this.state.IsentropicEfficiency}
            MechanicalEfficiency={this.state.MechanicalEfficiency}
            ElectricityDemand={this.state.ElectricityDemand}
            LangFactor={this.state.LangFactor}
            AnnualCapitalCharge={this.state.AnnualCapitalCharge}
            ElectricityPrice={this.state.ElectricityPrice}
            SteamPrice={this.state.SteamPrice}
            BiomassCost={this.state.BiomassCost}
            IRRCost={this.state.IRRCost}
          />
        </div>
      </div>
    );
  }
}

export default HeatMapFormMFC;
