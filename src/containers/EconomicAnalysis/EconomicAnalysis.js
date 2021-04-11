import { Container, Grid } from "@material-ui/core";
import React, { Component } from "react";
import classes from "./EconomicAnalysis.module.css";
import Picker from "./Picker";
import RightContent from "./RightContent/RightContent";
import EconomicAnalysisData from "./EconomicAnalysisData.json";
import UserNav from "./UserNav.json";
import Calculations from "../../components/Calculations/EconomicAnalysis/EconomicAnalysis";
import DonwloadButton from "../../components/UI/Button/DownloadButton";
import WordDoc from "./economic.pdf";

class EconomicAnalys extends Component {
  state = {
    selectedProcesses: initialSelectedProcesses,

    userNavData: {},
  };

  componentDidMount() {
    this.setState({
      userNavData: this.formatuserNavData(UserNav),
    });
  }

  setSelected = (val) => {
    console.log(this.state.selectedProcesses);
    this.setState({
      selectedProcesses: val,
    });
  };

  setSliderORInput = (name, value) => {
    let selected = [...this.state.selectedProcesses];

    var foundIndex = selected.findIndex((el) => el["Name"] === name);
    if (foundIndex === -1) {
      let userNavData = { ...this.state.userNavData };
      userNavData[name] = value;
      this.setState({ userNavData: userNavData });
    } else {
      selected[foundIndex]["BaseSizeDefault"] = "" + value + "";
      this.setState({ selectedProcesses: selected });
    }
  };

  SliderhandleChange = (name) => (event, value) => {
    this.setSliderORInput(name, value);
  };

  InputhandleChange = (name) => (event) => {
    let { value, max } = event.target;
    this.setSliderORInput(name, value);
  };

  formatuserNavData = (userNavData) => {
    let newData = {};
    let source = userNavData;
    source.forEach((config) => {
      newData[config["VariableName"]] = parseFloat(config["Default"]);
    });
    return newData;
  };
  render() {
    return (
      <div className={classes.Reference}>
        <Container maxWidth={"xl"}>
          <form method="get" action={WordDoc} target="_blank" style={{}}>
            <h1>Economic Analysis</h1>

            <p
              style={{
                fontSize: "10px",
              }}
            >
              This license available under
              <a href={"https://creativecommons.org/licenses/by-sa/4.0/"}>
                https://creativecommons.org/licenses/by-sa/4.0/
              </a>{" "}
              lets you remix, adapt, and build upon this work even for
              commercial purposes, as long as you credit: ©
              <a href={"https://tesarrec.web.app"}>https://tesarrec.web.app</a>{" "}
              and <br />
              ©Sadhukhan J., Ng KS. and Hernandez EM. 2014. Biorefineries and
              Chemical Processes: Design, Integration & Sustainability Analysis.
              Wiley.{" "}
              <a
                href={
                  "https://onlinelibrary.wiley.com/doi/book/10.1002/9781118698129"
                }
                target={"_blank"}
              >
                https://onlinelibrary.wiley.com/doi/book/10.1002/9781118698129
              </a>
            </p>
            <DonwloadButton type="submit">Download!</DonwloadButton>
          </form>

          <Grid container spacing={3}>
            <Grid item xs={9} spacing={3}>
              <Picker
                SliderhandleChange={this.SliderhandleChange}
                InputhandleChange={this.InputhandleChange}
                setSelected={this.setSelected}
                labels={labels}
                selected={this.state.selectedProcesses}
              />
            </Grid>
            <Grid item xs={3} spacing={3}>
              {Object.keys(this.state.userNavData).length !== 0 ? (
                <RightContent
                  userNavData={this.state.userNavData}
                  InputhandleChange={this.InputhandleChange}
                  SliderhandleChange={this.SliderhandleChange}
                />
              ) : null}
            </Grid>

            <Grid item xs={11} spacing={3}>
              <Calculations
                selectedProcesses={this.state.selectedProcesses}
                userNavData={this.state.userNavData}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default EconomicAnalys;

const labels = EconomicAnalysisData.map((el) => {
  return {
    ...el,
    // color:
    //   "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
    //  color: "#FFF0F0",
    color:
      "hsl(" +
      360 * Math.random() +
      "," +
      (25 + 70 * Math.random()) +
      "%," +
      (85 + 10 * Math.random()) +
      "%)",
  };
});
let initialSelectedProcesses = labels.filter(
  (el) =>
    el["Name"] === "Gas turbine and heat recovery steam generator" ||
    el["Name"] ===
      "Distillation, Fractionater, Splitter, Reboiler, Condenser, Reflux drum (thermochemical processing)" ||
    el["Name"] === "Hydrocracker unit" ||
    el["Name"] === "Membrane for hydrogen purification" ||
    el["Name"] === "Pyrolyser (circulating fluid bed)" ||
    el["Name"] === "Pressure swing adsorption for hydrogen purification" ||
    el["Name"] === "Steam reformer" ||
    el["Name"] === "Steam turbine and steam system"
);

console.log(labels);

