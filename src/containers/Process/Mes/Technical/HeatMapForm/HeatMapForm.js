import React, { Component } from "react";

import Form from "../../../../../components/UI/Form/Form";
import MySlider from "../../../../../components/UI/SliderContainer/Slider/Slider";
import MySliderContainer from "../../../../../components/UI/SliderContainer/SliderContainer";
import RightContent from '../../../../../components/Navigation/RightContent/RightContent'
import classes from "./HeatMapForm.module.css";
import OverallReactionAnodeCathode from "../../../../../components/Calculations/OverallReactionAnodeCathodeHeatMap";
//import Slider from '../../../../components/UI/Slider/Slider'
//import Slider from "@material-ui/core/Slider";
//import Grid from "@material-ui/core/Grid";
//import HeatMap from '../../../../../components/UI/MyHeatMap/MyHeatMap'
//import Input from '@material-ui/core/Input';

class HeatMapForm extends Component {
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

    AnodeSubstrateChemical: "Ethanol",
    CathodeProductChemical: "Acetic acid",
    chosenValue:"",

    AnodeSubstrateConcentration: 10,
    Volume: 10,
    efficiencyValue: 100,
  };

  HeatMapChangedOnClick = (x, y, value) => {
    this.setState({
      AnodeSubstrateChemical: this.state.HeatMapState.xLabels[x.x],CathodeProductChemical: this.state.HeatMapState.yLabels[y.y], chosenValue:value[y.y][x.x]
    });


  };

  componentDidMount(){
    //https://api.bmreports.com/BMRS/B1720/v1?APIKey=op174l2qrpu3s7t&SettlementDate=<SettlementDate>&Period=<Period>&ServiceType=<xml/csv>
  }
  

  SliderhandleChange = (name) => (event, value) => {
    this.setState({ [name]: value });
  };

  inputChangedHandler = (event) => {
    // event.target should have methods to tell us which component should handle this

    const target = event.target;
    let value = target.value;

    let name = target.name;

    this.setState({
      [name]: value,
    });
  };


  render() {

        

    

    return (
      <div>
        <RightContent
          AnodeSubstrateChemical={this.state.AnodeSubstrateChemical}
          CathodeProductChemical={this.state.CathodeProductChemical}
          chosenValue={this.state.chosenValue}
          AnodeSubstrateConcentration={this.state.AnodeSubstrateConcentration}
          Volume={this.state.Volume}
          efficiencyValue={this.state.efficiencyValue}
          SliderhandleChange={(val)=>this.SliderhandleChange(val)}
        />



        <div className={classes.HeatMap}>
          <OverallReactionAnodeCathode
            cathodeProduct={this.state.CathodeProductChemical}
            anodeSubstrate={this.state.AnodeSubstrateChemical}
            concentration={this.state.AnodeSubstrateConcentration}
            volume={this.state.Volume * 10}
            efficiency={this.state.efficiencyValue / 100}
            heatMapContents={this.state.HeatMapState}
            HeatMapChangedOnClick={this.HeatMapChangedOnClick}
          />
        </div>

        
      </div>
    );
  }
}

export default HeatMapForm;
