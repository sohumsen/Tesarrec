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
    selectedProcesses: [labels[1], labels[9]],

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
              This license available under https://creativecommons.org/licenses/by-sa/4.0/ lets you remix, adapt, and build upon this work even for commercial purposes, as long as you credit: ©https://tesarrec.web.app and ©Sadhukhan J., Ng KS. and Hernandez EM. 2014. Biorefineries and Chemical Processes: Design, Integration & Sustainability Analysis. Wiley. 10.1002/9781118698129
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
    color: "#FFF0F0",
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
console.log(labels);
// const labels = [
//   {
//     name: 'good first issue',
//     color: '#7057ff',
//     description: 'Good for newcomers',
//   },
//   {
//     name: 'help wanted',
//     color: '#008672',
//     description: 'Extra attention is needed',
//   },
//   {
//     name: 'priority: critical',
//     color: '#b60205',
//     description: '',
//   },
//   {
//     name: 'priority: high',
//     color: '#d93f0b',
//     description: '',
//   },
//   {
//     name: 'priority: low',
//     color: '#0e8a16',
//     description: '',
//   },
//   {
//     name: 'priority: medium',
//     color: '#fbca04',
//     description: '',
//   },
//   {
//     name: "status: can't reproduce",
//     color: '#fec1c1',
//     description: '',
//   },
//   {
//     name: 'status: confirmed',
//     color: '#215cea',
//     description: '',
//   },
//   {
//     name: 'status: duplicate',
//     color: '#cfd3d7',
//     description: 'This issue or pull request already exists',
//   },
//   {
//     name: 'status: needs information',
//     color: '#fef2c0',
//     description: '',
//   },
//   {
//     name: 'status: wont do/fix',
//     color: '#eeeeee',
//     description: 'This will not be worked on',
//   },
//   {
//     name: 'type: bug',
//     color: '#d73a4a',
//     description: "Something isn't working",
//   },
//   {
//     name: 'type: discussion',
//     color: '#d4c5f9',
//     description: '',
//   },
//   {
//     name: 'type: documentation',
//     color: '#006b75',
//     description: '',
//   },
//   {
//     name: 'type: enhancement',
//     color: '#84b6eb',
//     description: '',
//   },
//   {
//     name: 'type: epic',
//     color: '#3e4b9e',
//     description: 'A theme of work that contain sub-tasks',
//   },
//   {
//     name: 'type: feature request',
//     color: '#fbca04',
//     description: 'New feature or request',
//   },
//   {
//     name: 'type: question',
//     color: '#d876e3',
//     description: 'Further information is requested',
//   },
// ];
