import React, { Component } from "react";

import RightContent from "../RightContent/RightContent";
import BioethanolCalc from "../../../../../components/Calculations/Sustainability/Bioethanol/Bioethanol";
import ChemicalCalc from "../../../../../components/Calculations/Sustainability/Chemical/Chemical";
import PyrolysisCalc from "../../../../../components/Calculations/Sustainability/Pyrolysis/Pyrolysis";

import bioethanolData from "../../../dataFiles/bioethanol.json";
import chemicalData from "../../../dataFiles/chemical.json";
import pyrolysisData from "../../../dataFiles/pyrolysis.json";
import classes from "./styles.module.css";

class HeatMapForm extends Component {
  state = {
    data: {},
  };

  SliderhandleChange = (name) => (event, value) => {
    let data = { ...this.state.data };

    data[name] = value;
    this.setState({ data: data });
  };

  InputhandleChange = (name) => (event) => {
    let { value, max } = event.target;

    if (+value > +max) {
      value = max;
    }
    let data = { ...this.state.data };

    data[name] = value;
    this.setState({ data: data });
  };

  getDataFile = () => {
    switch (this.props.type) {
      case "bioethanol":
        return bioethanolData;
      case "chemical":
        return chemicalData;

      case "pyrolysis":
        return pyrolysisData;

      default:
        return bioethanolData;

      // code block
    }
  };

  updateNewState = () => {
    let newData = {};
    let source = this.getDataFile();
    source["Sheet1"].forEach((config) => {
      newData[config["VariableName"]] = parseFloat(config["Default"]);
    });

    this.setState({
      data: newData,
    });
  };

  componentDidMount() {
    this.updateNewState();
  }

  render() {
    return (
      <div>
        {Object.keys(this.state.data).length !== 0 ||
        this.state.data.constructor !== Object ? (
          <div className={classes.Main}>
            <div className={classes.Calcs}>
              {this.props.type === "bioethanol" ? (
                <BioethanolCalc state={this.state} />
              ) : null}

              {this.props.type === "chemical" ? (
              <ChemicalCalc state={this.state} />
            ) : null}

              {this.props.type === "pyrolysis" ? (
                <PyrolysisCalc state={this.state} />
              ) : null}
            </div>
            <div className={classes.Right}>
              <RightContent
                state={this.state.data}
                source={this.getDataFile()}
                InputhandleChange={this.InputhandleChange}
                SliderhandleChange={this.SliderhandleChange}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default HeatMapForm;
