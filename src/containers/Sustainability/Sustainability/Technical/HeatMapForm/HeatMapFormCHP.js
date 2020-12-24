import React, { Component } from "react";

import RightContent from "../RightContent/RightContent";
import BioethanolCalc from "../../../../../components/Calculations/Sustainability/Bioethanol/Bioethanol";
import ChemicalCalc from "../../../../../components/Calculations/Sustainability/Chemical/Chemical";

import bioethanolData from "../../../dataFiles/bioethanol.json";
import chemicalData from "../../../dataFiles/chemical.json";

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
        // code block

        return bioethanolData;
      case "chemical":
        // code block

        return chemicalData;
      default:
        return bioethanolData;

      // code block
    }
  };
  static getderivedstate

  updateNewState=()=>{
    let newData = {};
    let source = this.getDataFile();
    source["Sheet1"].forEach((config) => {
      newData[config["VariableName"]] = parseFloat(config["Default"]);
    });

    this.setState({
      data: newData,
    });
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // do things with nextProps.someProp and prevState.cachedSomeProp

  //   if (nextProps.data!==prevState.data){
  //     this.updateNewState()

  //   }
  //   return {
  //     // ... other derived state properties
  //   };
  // }

  componentDidMount() {
    this.updateNewState()
  }

  render() {
    return (
      <div>
        {Object.keys(this.state.data).length !== 0 ||
        this.state.data.constructor !== Object ? (
          <div>
            <RightContent
              state={this.state.data}
              source={this.getDataFile()}
              InputhandleChange={this.InputhandleChange}
              SliderhandleChange={this.SliderhandleChange}
            />

            {this.props.type === "bioethanol" ? (
              <BioethanolCalc state={this.state} />
            ) : null}

            {this.props.type === "chemical" ? (
              <ChemicalCalc state={this.state} />
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default HeatMapForm;
