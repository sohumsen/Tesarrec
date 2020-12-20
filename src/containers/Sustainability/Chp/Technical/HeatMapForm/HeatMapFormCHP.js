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

    CCGT: 100,
    Nuclear: 100,
    Biomass: 100,
    Coal: 100,
    Wind: 100,
    Solar: 100,
    Oil: 100,
    OCGT: 100,
    Hydroelectric: 100,
    PumpedHydro: 100,
    Other: 100,



    ProportionImportDenmark:0.000473,
    ProportionImportIreland:0.061649,
    ProportionImportBelgium:0.203841,
    ProportionImportNetherlands:0.24222,
    ProportionImportFrance:0.491818,






    BiomassFeedstockAvailability: 2670,
    MoistureContent: 25,
    CelluloseContent : 30,  XylanContent:15,
    GlucanContent: 3,
    ArabinanContent : 1.5,  MannanContent: 7,
    GalactanContent: 1.5,
    AshContent: 2,
    ExtractiveContent: 5,
    LigninContent: 15,
    BiomassCalorificValue: 19.3,

    InstallationFactor: 5,
    AnnualCapitalCharge: 0.13,
    IRRCost: 0.12,

    BiomassCost: 40,
    BioethanolPrice: 3.5,
  };

  SliderhandleChange = (name) => (event, value) => {
    this.setState({ [name]: value });
  };

  InputhandleChange = (name) => (event) => {
    let { value,  max } = event.target;

    // if (value !== "") {
    //   value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    // }

    if (+value > +max) {
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

          CCGT={this.state.CCGT}
          Nuclear={this.state.Nuclear}
          Biomass={this.state.Biomass}
          Coal={this.state.Coal}
          Wind={this.state.Wind}
          Solar={this.state.Solar}
          Oil={this.state.Oil}
          OCGT={this.state.OCGT}
          Hydroelectric={this.state.Hydroelectric}
          PumpedHydro={this.state.PumpedHydro}
          Other={this.state.Other}

          ProportionImportDenmark={this.state.ProportionImportDenmark}
          ProportionImportIreland={this.state.ProportionImportIreland}
          ProportionImportBelgium={this.state.ProportionImportBelgium}
          ProportionImportNetherlands={this.state.ProportionImportNetherlands}
          ProportionImportFrance={this.state.ProportionImportFrance}

          
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

            CCGT={this.state.CCGT}
            Nuclear={this.state.Nuclear}
            Biomass={this.state.Biomass}
            Coal={this.state.Coal}
            Wind={this.state.Wind}
            Solar={this.state.Solar}
            Oil={this.state.Oil}
            OCGT={this.state.OCGT}
            Hydroelectric={this.state.Hydroelectric}
            PumpedHydro={this.state.PumpedHydro}
            Other={this.state.Other}

            ProportionImportDenmark={this.state.ProportionImportDenmark}
            ProportionImportIreland={this.state.ProportionImportIreland}
            ProportionImportBelgium={this.state.ProportionImportBelgium}
            ProportionImportNetherlands={this.state.ProportionImportNetherlands}
            ProportionImportFrance={this.state.ProportionImportFrance}
          />
        </div>
      </div>
    );
  }
}

export default HeatMapFormMFC;
