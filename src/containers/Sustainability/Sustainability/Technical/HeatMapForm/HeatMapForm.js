import React, { Component } from "react";

import classes from "./styles.module.css";

import DonwloadButton from "../../../../../components/UI/Button/DownloadButton";

import RightContent from "../RightContent/RightContent";
import BioethanolCalc from "../../../../../components/Calculations/Sustainability/Bioethanol/Bioethanol";
import ChemicalCalc from "../../../../../components/Calculations/Sustainability/Chemical/Chemical";
import PyrolysisCalc from "../../../../../components/Calculations/Sustainability/Pyrolysis/Pyrolysis";
import BioJetFuelCalc from "../../../../../components/Calculations/Sustainability/BioJetFuel/BioJetFuel";
import BiodieselCalc from "../../../../../components/Calculations/Sustainability/Biodiesel/Biodiesel";

import bioethanolData from "../../../dataFiles/bioethanol.json";
import chemicalData from "../../../dataFiles/chemical.json";
import pyrolysisData from "../../../dataFiles/pyrolysis.json";
import bioJetFuelData from "../../../dataFiles/bioJetFuel.json";
import biodieselData from "../../../dataFiles/biodiesel.json";

import BioethanolWordDoc from "../../../../../assets/Bioethanol.pdf";
import ChemicalWordDoc from "../../../../../assets/Chemical.pdf";
import PyrolysisWordDoc from "../../../../../assets/Pyrolysis.pdf";
import BiodieselWordDoc from "../../../../../assets/Biodiesel.pdf";
import BiojetfuelWordDoc from "../../../../../assets/Biojetfuel.pdf";

class HeatMapForm extends Component {
  state = {
    data: {},

    type: "",
    wordDoc: "",
    fileData: [],
    doiLink: "",
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

    data[name] = parseFloat(value);
    this.setState({ data: data });
  };

  updateStateOnMount = (type) => {
    let wordDoc;
    let fileData;
    let doiLink;
    switch (type) {
      case "chemical":
        wordDoc = ChemicalWordDoc;
        fileData = chemicalData;
        doiLink = "https://doi.org/10.1039/C9GC00607A";
        break;

      case "bioethanol":
        wordDoc = BioethanolWordDoc;
        fileData = bioethanolData;
        doiLink = "https://doi.org/10.1016/j.biteb.2019.100230";
        break;

      case "pyrolysis":
        wordDoc = PyrolysisWordDoc;
        fileData = pyrolysisData;
        doiLink =
          "https://onlinelibrary.wiley.com/doi/book/10.1002/9781118698129";

        break;

      case "bio-jet-fuel":
        wordDoc = BiojetfuelWordDoc;
        fileData = bioJetFuelData;
        doiLink =
          "https://onlinelibrary.wiley.com/doi/book/10.1002/9781118698129";
        break;
      case "biodiesel":
        wordDoc = BiodieselWordDoc;
        fileData = biodieselData;
        doiLink =
          "https://onlinelibrary.wiley.com/doi/book/10.1002/9781118698129";

        break;
      default:
        break;
    }

    this.setState({
      wordDoc: wordDoc,
      fileData: fileData,
      doiLink: doiLink,

      data: this.formatFileData(fileData),
    });
  };
  formatFileData = (fileData) => {
    let newData = {};
    let source = fileData;
    source["Sheet1"].forEach((config) => {
      newData[config["VariableName"]] = parseFloat(config["Default"]);
    });
    return newData;
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    const { type } = params;

    this.setState({
      type: type,
    });
    this.updateStateOnMount(type);
  }

  render() {
    return (
      <div>
        <div className={classes.Main}>
          <div className={classes.Calcs}>
            <div style={{ fontSize: 11 }}>
              This license available under{" "}
              <a href={"https://creativecommons.org/licenses/by-sa/4.0/"}>
                https://creativecommons.org/licenses/by-sa/4.0/
              </a>{" "}
              lets you remix, adapt, and build upon this work even for
              commercial purposes, as long as you credit: ©
              <a href={"https://tesarrec.web.app"}>https://tesarrec.web.app</a>
              ,
              {" and "}
              {this.state.type==="bio-jet-fuel"? <a href={"https://www.sciencedirect.com/science/article/abs/pii/S0263876221003828"}>{"https://www.sciencedirect.com/science/article/abs/pii/S0263876221003828 "}</a> :null}
              <a href={this.state.doiLink}>{this.state.doiLink}</a>
            </div>

            <div
              style={{
                textAlign: "center",
                float: "left",
              }}
            >
              <h1>
                {(
                  this.state.type.charAt(0).toUpperCase() +
                  this.state.type.slice(1)
                )
                  .split("-")
                  .join(" ")}{" "}
              </h1>
            </div>
            <div
              style={{
                textAlign: "center",
                float: "right",
              }}
            >
              <form method="get" action={this.state.wordDoc} target="_blank">
                <DonwloadButton type="submit">Download!</DonwloadButton>
              </form>
            </div>

            {this.state.type === "bioethanol" ? (
              <BioethanolCalc state={this.state.data} />
            ) : null}

            {this.state.type === "chemical" ? (
              <ChemicalCalc state={this.state.data} />
            ) : null}

            {this.state.type === "pyrolysis" ? (
              <PyrolysisCalc state={this.state.data} />
            ) : null}

            {this.state.type === "bio-jet-fuel" ? (
              <BioJetFuelCalc state={this.state.data} />
            ) : null}

            {this.state.type === "biodiesel" ? (
              <BiodieselCalc state={this.state.data} />
            ) : null}
          </div>

          {this.state.fileData.length != 0 ? (
            <div className={classes.Right}>
              <RightContent
                state={this.state.data}
                source={this.state.fileData}
                InputhandleChange={this.InputhandleChange}
                SliderhandleChange={this.SliderhandleChange}
                updateNewState={() => this.updateStateOnMount(this.state.type)}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default HeatMapForm;
