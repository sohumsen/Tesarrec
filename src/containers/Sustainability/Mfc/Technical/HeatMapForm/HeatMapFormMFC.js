import React, { Component } from "react";

import LeftContent from "../LeftContent/LeftContent";
import RightContent from "../RightContent/RightContent";
import classes from "./HeatMapFormMFC.module.css";
import OverallReactionAnodeCathode from "../../../../../components/Calculations/Sustainability/MFC/OverallReactionAnodeCathodeHeatMapMFC";

class HeatMapFormMFC extends Component {
  state = {
    HeatMapState: {
      xLabels: [
        "Acetate",
        "Glucose",
        "Lactate",
        "Propionate",
        "Pyruvate",
        "Sucrose",
      ],
      yLabels: [
        "Acetic acid",
        "Butyric acid",
        "Caproic acid",
        "Formic acid",
        "Propionic acid",
        "Valeric acid",
      ],
      data: null,
    },

    AnodeSubstrateChemical: "Acetate",
    CathodeProductChemical: "Acetic acid",
    xCoordAnode:0,
    yCoordCathode:0,
    chosenValue: "",

    AnodeSubstrateConcentration: 10,
    Volume: 10,
    efficiencyValue: 1,

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

    AnodeCost: 15,
    CathodeCost: 15,
    LangFactorCost: 1.5,

    AnnualCapitalChargeCost: 0.13,
    IRRCost: 0.12,

    AnolyteCost: 0.0012,
    CatholyteCost: 0.5,
    ElectricityPriceCost: 0.15,
  };

  HeatMapChangedOnClick = (x, y, value) => {
    this.setState({
      xCoordAnode:x.x,
      yCoordCathode:y.y,
      AnodeSubstrateChemical: this.state.HeatMapState.xLabels[x.x],
      CathodeProductChemical: this.state.HeatMapState.yLabels[y.y],
      chosenValue: value[y.y][x.x],
    });
  };

  SliderhandleChange = (name) => (event, value) => {
    this.setState({ [name]: value });
  };

  InputhandleChange = (name) => (event) => {
    let { value, min, max } = event.target;

    if (value !== "") {
      value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    }


    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <LeftContent />

        <RightContent
          AnodeSubstrateChemical={this.state.AnodeSubstrateChemical}
          CathodeProductChemical={this.state.CathodeProductChemical}
          chosenValue={this.state.chosenValue}
          AnodeSubstrateConcentration={this.state.AnodeSubstrateConcentration}
          Volume={this.state.Volume}
          efficiencyValue={this.state.efficiencyValue}
          SliderhandleChange={(val) => this.SliderhandleChange(val)}
          InputhandleChange={(val) => this.InputhandleChange(val)}
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
          AnodeCost={this.state.AnodeCost}
          CathodeCost={this.state.CathodeCost}
          LangFactorCost={this.state.LangFactorCost}
          AnolyteCost={this.state.AnolyteCost}
          CatholyteCost={this.state.CatholyteCost}
          ElectricityPriceCost={this.state.ElectricityPriceCost}
          AnnualCapitalChargeCost={this.state.AnnualCapitalChargeCost}
          IRRCost={this.state.IRRCost}
        />

        <div className={classes.HeatMap}>
          <OverallReactionAnodeCathode
            cathodeProduct={this.state.CathodeProductChemical}
            anodeSubstrate={this.state.AnodeSubstrateChemical}
            concentration={this.state.AnodeSubstrateConcentration}
            volume={this.state.Volume}
            efficiency={this.state.efficiencyValue}
            heatMapContents={this.state.HeatMapState}
            HeatMapChangedOnClick={this.HeatMapChangedOnClick}
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
            AnodeCost={this.state.AnodeCost}
            CathodeCost={this.state.CathodeCost}
            LangFactorCost={this.state.LangFactorCost}
            AnolyteCost={this.state.AnolyteCost}
            CatholyteCost={this.state.CatholyteCost}
            ElectricityPriceCost={this.state.ElectricityPriceCost}
            AnnualCapitalChargeCost={this.state.AnnualCapitalChargeCost}
            IRRCost={this.state.IRRCost}
            xCoordAnode={this.state.xCoordAnode}
            yCoordCathode={this.state.yCoordCathode}
            
          />
        </div>
      </div>
    );
  }
}

export default HeatMapFormMFC;
