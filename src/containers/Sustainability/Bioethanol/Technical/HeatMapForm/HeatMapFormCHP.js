import React, { Component } from "react";

import LeftContent from "../LeftContent/LeftContent";
import RightContent from "../RightContent/RightContent";
import classes from "./HeatMapFormBioethanol.module.css";
import OverallReactionAnodeCathode from "../../../../../components/Calculations/Sustainability/Bioethanol/Bioethanol";
import source from "./bioethanolSource.json";
import { nullDependencies } from "mathjs";
class HeatMapForm extends Component {
  state = {
    data: {},
    // BiomassFeedstockAvailability: 2670,
    // MoistureContent: 25,
    // CelluloseContent: 30,
    // XylanContent: 15,
    // GlucanContent: 3,
    // ArabinanContent: 1.5,
    // MannanContent: 7,
    // GalactanContent: 1.5,
    // AshContent: 2,
    // ExtractiveContent: 5,
    // LigninContent: 15,
    // BiomassCalorificValue: 19.3,
    // InstallationFactor: 5,
    // AnnualCapitalCharge: 0.13,
    // IRRCost: 0.12,
    // BiomassCost: 40,
    // BioethanolPrice: 3.5,
  };

  SliderhandleChange = (name) => (event, value) => {

    let data={...this.state.data}

    data[name]=value
    this.setState({ data: data });
  };

  InputhandleChange = (name) => (event) => {
    let { value, max } = event.target;

    if (+value > +max) {
      value = max;
    }
    let data={...this.state.data}

    data[name]=value
    this.setState({ data: data });
  };

  componentDidMount() {

    let newData = {};

    source["Sheet1"].forEach((config) => {
      newData[config["VariableName"]] = parseFloat(config["Default"]);
    });
    this.setState({
      data: newData,
    }
    );
  }

  render() {
  
    return (
      <div>
        {Object.keys(this.state.data).length !== 0 ||
        this.state.data.constructor !== Object ? (
          <div>
            <RightContent
              state={this.state.data}
              InputhandleChange={this.InputhandleChange}
              SliderhandleChange={this.SliderhandleChange}
            />

            <div className={classes.HeatMap}>
              <OverallReactionAnodeCathode state={this.state} />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default HeatMapForm;
