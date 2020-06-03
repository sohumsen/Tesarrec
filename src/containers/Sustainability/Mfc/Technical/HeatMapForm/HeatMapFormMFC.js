import React, { Component } from "react";

import LeftContent from "../../../../../hoc/Layout/LeftContent/LeftContent";
import RightContent from "../../../../../hoc/Layout/RightContent/RightContent";
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


  };

  HeatMapChangedOnClick = (x, y, value) => {
    this.setState({
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
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));

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
          handleBlur={(val) => this.handleBlur(val)}
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
          />
        
        </div>
      </div>
    );
  }
}

export default HeatMapFormMFC;
