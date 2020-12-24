import React, { Component } from "react";

import RightContent from "../RightContent/RightContent";
import OverallReactionAnodeCathode from "../../../../../components/Calculations/Sustainability/Bioethanol/Bioethanol";
import source from "./bioethanolSource.json";
import { nullDependencies } from "mathjs";
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

  componentDidMount() {
    let newData = {};

    source["Sheet1"].forEach((config) => {
      newData[config["VariableName"]] = parseFloat(config["Default"]);
    });
    this.setState({
      data: newData,
    });
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

            <div >
              <OverallReactionAnodeCathode state={this.state} />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default HeatMapForm;
