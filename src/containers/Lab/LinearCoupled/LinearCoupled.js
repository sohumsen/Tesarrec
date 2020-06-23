import React, { Component } from "react";

import EqnItems from "../../../components/Calculations/Method/LinearCoupled/Eqns/EqnItems";
import { evaluate } from "mathjs";
import MyButton from "../../../components/UI/Button/GenericButton";
import classes from "./LinearCoupled.module.css";
import MyErrorMessage from "../../../components/UI/MyErrorMessage/MyErrorMessage";
import SettingButton from "../../../components/UI/Button/SettingButton";
import GraphConfig from "../../../components/UI/GraphConfig/GraphConfig";
import LinearCoupledDiffEqns from "../../../components/Calculations/Method/LinearCoupled/Calcs/LinearCoupledDiffEqns copy";
import FileController from "../../../components/Calculations/Method/FileController/FileController";
class LinearCoupled extends Component {
  /**
   * Visual Component that contains the textbox for the equation and calculation outputs
   * plus some equation labels
   *
   */

  //y1=a, y2=b,y3=c
  state = {
    calculate: false,
    pageId: "",
    allPageId: {},
    variableDescription: {
      a: "this is some stuff",
      b: "this is some stuff",
      c: "this is some stuff",
      d: "this is some stuff",
    },
    graphConfig: {
      show: false,
      submitted: true,
      LegendHorizontal: "left",
      LegendVertical: "top",
      DecimalPrecision: 2,
      initialConditions: [0.5, 0.5, 0.5, 0.5, 0.5],
    },

    Eqns: [
      {
        id: "qwert",
        line: "a",
        DByDLatex: "\\frac{da}{dt}=",
        LatexEqn: "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
        TextEqn: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
        errorMessage: null,
      },
      {
        id: "yuiop",
        line: "b",

        DByDLatex: "\\frac{db}{dt}=",
        LatexEqn: "\\frac{7.1ab}{0.103+a}-0.142b",
        TextEqn: "(7.1*a*b)/(0.103+a)-0.142*b",
        errorMessage: null,
      },
      {
        id: "asdfg",
        line: "c",

        DByDLatex: "\\frac{dc}{dt}=",
        LatexEqn: "\\frac{0.6ac}{0.103+a}-0.0102c",
        TextEqn: "(0.6*a*c)/(0.103+a)-0.0102*c",
        errorMessage: null,
      },
      {
        id: "hjklz",
        line: "d",

        DByDLatex: "\\frac{dd}{dt}=",
        LatexEqn: "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
        TextEqn: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
        errorMessage: null,
      },
    ],
  };

  validateExpression = (expr, line) => {
    let lineNames = { t: 1 };

    this.state.Eqns.forEach((Eqn) => {
      lineNames[Eqn.line] = 1;
    });
    try {
      evaluate(expr, lineNames);
      return true;
    } catch (error) {
      return false;
    }
  };

  handleMathQuillInputChange = (id) => (mathField) => {
    const EqnIndex = this.state.Eqns.findIndex((e) => {
      return e.id === id;
    });

    const Eqn = {
      ...this.state.Eqns[EqnIndex],
    };

    Eqn.TextEqn = mathField.text();
    Eqn.LatexEqn = mathField.latex();

    const Eqns = [...this.state.Eqns];
    Eqns[EqnIndex] = Eqn;

    this.setState({ Eqns: Eqns, calculate: false });
  };

  handleMathQuillInputSubmit = (event) => {
    let valid = [];
    event.preventDefault();
    this.state.Eqns.forEach((elementObj) => {
      if (this.validateExpression(elementObj.TextEqn, elementObj.line)) {
        valid.push("1");
      } else {
        valid.push("0");
      }
    });

    let validIndex = [];
    for (let i = 0; i < valid.length; i++) {
      if (valid[i] === "0") validIndex.push(i);
    }

    let newEqns = [];
    for (let i = 0; i < valid.length; i++) {
      const element = valid[i];

      if (element === "0") {
        newEqns.push(this.setErrorMessage(i, <MyErrorMessage />));
      } else {
        newEqns.push(this.setErrorMessage(i, null));
      }
    }
    this.setState({ Eqns: newEqns });

    if (valid.includes("0")) {
      this.setState({ calculate: false });
    } else {
      this.setState({ calculate: true });
    }
  };

  setErrorMessage = (i, errorMessage) => {
    let Eqn = {
      ...this.state.Eqns[i],
    };
    Eqn.errorMessage = errorMessage;
    return Eqn;
  };
  removeEqn = (id) => {
    this.setState((prevState) => {
      let newGraphConfig = { ...prevState.graphConfig };
      let newInitialConditions = [...newGraphConfig.initialConditions];
      newInitialConditions.pop();
      newGraphConfig["initialConditions"] = newInitialConditions;
      return {
        calculate: false,
        graphConfig: newGraphConfig,
        Eqns: prevState.Eqns.filter((element) => {
          return element.id !== id;
        }),
      };
    });
  };
  resetForm = () => {
    this.setState({
      calculate: true,
      pageId: "",
      variableDescription: {
        a: "this is some stuff",
        b: "this is some stuff",
        c: "this is some stuff",
        d: "this is some stuff",
      },
      graphConfig: {
        show: false,
        submitted: true,
        LegendHorizontal: "left",
        LegendVertical: "top",
        DecimalPrecision: 2,
        initialConditions: [0.5, 0.5, 0.5, 0.5, 0.5],
      },

      Eqns: [
        {
          id: "qwert",
          line: "a",
          DByDLatex: "\\frac{da}{dt}=",
          LatexEqn: "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
          TextEqn: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
          errorMessage: null,
        },
        {
          id: "yuiop",
          line: "b",

          DByDLatex: "\\frac{db}{dt}=",
          LatexEqn: "\\frac{7.1ab}{0.103+a}-0.142b",
          TextEqn: "(7.1*a*b)/(0.103+a)-0.142*b",
          errorMessage: null,
        },
        {
          id: "asdfg",
          line: "c",

          DByDLatex: "\\frac{dc}{dt}=",
          LatexEqn: "\\frac{0.6ac}{0.103+a}-0.0102c",
          TextEqn: "(0.6*a*c)/(0.103+a)-0.0102*c",
          errorMessage: null,
        },
        {
          id: "hjklz",
          line: "d",

          DByDLatex: "\\frac{dd}{dt}=",
          LatexEqn: "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
          TextEqn: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
          errorMessage: null,
        },
      ],
    });
  };
  nextPossibleEqn = (prevState) => {
    let Eqns = [
      {
        id: "qwert",
        line: "a",
        DByDLatex: "\\frac{da}{dt}=",
        LatexEqn: "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
        TextEqn: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
      },
      {
        id: "yuiop",
        line: "b",

        DByDLatex: "\\frac{db}{dt}=",
        LatexEqn: "\\frac{7.1ab}{0.103+a}-0.142b",
        TextEqn: "(7.1*a*b)/(0.103+a)-0.142*b",
      },
      {
        id: "asdfg",
        line: "c",

        DByDLatex: "\\frac{dc}{dt}=",
        LatexEqn: "\\frac{0.6ac}{0.103+a}-0.0102c",
        TextEqn: "(0.6*a*c)/(0.103+a)-0.0102*c",
      },
      {
        id: "hjklz",
        line: "d",

        DByDLatex: "\\frac{dd}{dt}=",
        LatexEqn: "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
        TextEqn: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
      },
    ];

    const results = Eqns.filter(
      ({ id: id1 }) => !prevState.Eqns.some(({ id: id2 }) => id2 === id1)
    );

    return results[0];
  };

  onIncrementEqn = () => {
    this.setState((prevState) => {
      let newGraphConfig = { ...prevState.graphConfig };
      let newInitialConditions = [...newGraphConfig.initialConditions];
      newInitialConditions.push(0.5);
      newGraphConfig["initialConditions"] = newInitialConditions;
      return {
        graphConfig: newGraphConfig,

        Eqns: prevState.Eqns.concat(this.nextPossibleEqn(prevState)),
        calculate: false,
      };
    });
  };
  toggleChartShow = () => {
    let graphConfig = { ...this.state.graphConfig };
    graphConfig.show = !this.state.graphConfig.show;
    this.setState({ graphConfig: graphConfig });
  };
  onGraphConfigChange = (name) => (event, value) => {
    let graphConfig = { ...this.state.graphConfig };

    if (name === "initialConditions") {
      let arr = event.target.value.split(",");

      graphConfig.initialConditions = arr;
    } else {
      graphConfig[name] = event.target.value;
    }

    graphConfig.submitted = false;

    this.setState({ graphConfig: graphConfig });
  };

  onGraphConfigSubmit = () => {
    let graphConfig = { ...this.state.graphConfig };

    let newInitialConditions = graphConfig.initialConditions.map(Number);
    if (newInitialConditions.length === this.state.Eqns.length + 1) {
      console.log("valid");
      graphConfig.initialConditions = newInitialConditions;
      graphConfig.submitted = true;
    } else {
      graphConfig.submitted = false;
    }

    this.setState({ graphConfig: graphConfig });
  };

  componentDidMount() {
    this.createNewFile(); //post, stores a page and recieves its id
    this.getAllFiles(); //get, gets page id of all files

    //this.getDataFromDb(this.state.pageId); //get, gets eqns given page id
    console.log(this.state.pageId);
  }

  getDataFromDb = (pageId) => {
    const queryParams = "?auth=" + this.props.token; //+'&orderBy="userId"&equalTo="'+this.props.userId+'"'
    fetch(
      "https://tesarrec.firebaseio.com/eqns/" +
        this.props.userId +
        "/" +
        pageId +
        ".json" +
        queryParams,
      {
        method: "get",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          console.log("its fine");
          console.log(data);
          // console.log(Object.values(data)[0].Eqns);
          //this.setState({Eqns:Object.values(data)[0].Eqns,calculate:false})
          this.setState({
            Eqns: data.Eqns,
            calculate: false,
          });
        } else {
          console.log("its not fine" + data.error.message);
          console.log(data);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  createNewFile = () => {
    this.setState({
      Eqns: [
        {
          id: "qwert",
          line: "a",
          DByDLatex: "\\frac{da}{dt}=",
          LatexEqn: "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
          TextEqn: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
          errorMessage: null,
        },
        {
          id: "yuiop",
          line: "b",

          DByDLatex: "\\frac{db}{dt}=",
          LatexEqn: "\\frac{7.1ab}{0.103+a}-0.142b",
          TextEqn: "(7.1*a*b)/(0.103+a)-0.142*b",
          errorMessage: null,
        },
        {
          id: "asdfg",
          line: "c",

          DByDLatex: "\\frac{dc}{dt}=",
          LatexEqn: "\\frac{0.6ac}{0.103+a}-0.0102c",
          TextEqn: "(0.6*a*c)/(0.103+a)-0.0102*c",
          errorMessage: null,
        },
        {
          id: "hjklz",
          line: "d",

          DByDLatex: "\\frac{dd}{dt}=",
          LatexEqn: "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
          TextEqn: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
          errorMessage: null,
        },
      ],
    });
    const Eqns = {
      Eqns: this.state.Eqns,
      // userId:this.props.userId
    };
    fetch(
      "https://tesarrec.firebaseio.com/eqns/" +
        this.props.userId +
        ".json?auth=" +
        this.props.token,
      {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Eqns),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          console.log("its fine");
          console.log(data);
          this.setState({ pageId: data.name }, () => {
            console.log(this.state);
          });
        } else {
          console.log("its not fine" + data.error.message);
          console.log(data);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  getAllFiles = () => {
    const queryParams = "?auth=" + this.props.token; //+'&orderBy="userId"&equalTo="'+this.props.userId+'"'
    fetch(
      "https://tesarrec.firebaseio.com/eqns/" +
        this.props.userId +
        ".json" +
        queryParams,
      {
        method: "get",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          console.log("its fine");
          console.log(data);
          this.setState({ allPageId: data });
          // console.log(Object.values(data)[0].Eqns);
          //this.setState({Eqns:Object.values(data)[0].Eqns,calculate:false})
        } else {
          console.log("its not fine" + data.error.message);
          console.log(data);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  saveFileToDb = () => {
    const Eqns = {
      Eqns: this.state.Eqns,
      // userId:this.props.userId
    };
    console.log(this.state);
    //https://tesarrec.firebaseio.com/eqns/QXVRwu8vuHRTsLST6wMWOA9jt3b2/-MAQkzE9AFzlCAuvn6hs
    //https://tesarrec.firebaseio.com/eqns/QXVRwu8vuHRTsLST6wMWOA9jt3b2/-MAR6iLb8WpOpXylIzfW.json?auth=eyJhbGciOiJSUzI1NiIsImtpZCI6ImMzZjI3NjU0MmJmZmU0NWU5OGMyMGQ2MDNlYmUyYmExMTc2ZWRhMzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGVzYXJyZWMiLCJhdWQiOiJ0ZXNhcnJlYyIsImF1dGhfdGltZSI6MTU5MjgzMDc0NywidXNlcl9pZCI6IlFYVlJ3dTh2dUhSVHNMU1Q2d01XT0E5anQzYjIiLCJzdWIiOiJRWFZSd3U4dnVIUlRzTFNUNndNV09BOWp0M2IyIiwiaWF0IjoxNTkyODMwNzQ3LCJleHAiOjE1OTI4MzQzNDcsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QHRlc3QuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Hz_kxHOryao7zmRcEfrEEtM-sbZpPsnWBiLwLlhK2bOW27BloKRcIY_FLW87zhZj6OkCmSWn-LlZik3cqgfmEI5tOE474k0Wgr1HW2f_CU9-TvVdfqnzbYqs8PlAn0XSF2WfjubOLI9EHitEQxYn_7SNYATLJSJrti6gvfAQVZ-JG7eDlMQLbR3P6FBq3yCFPhepCCH5O4RnQKKqjPPKjZapf6ugZYrsS8mTP98U8bSHXLRCyg3nlMGrwdDlZigzZamiUQpXXi6hdrVx8cK2Bv1W0d4J8UWF73PtRlmFKYAIPpcvE7s4S9acfUS2WqVbL984ihS8kU3o_TNUymsGwQ
    fetch(
      "https://tesarrec.firebaseio.com/eqns/" +
        this.props.userId +
        "/" +
        this.state.pageId +
        ".json?auth=" +
        this.props.token,
      {
        method: "put",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Eqns),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          console.log("its fine");
          console.log(data);
        } else {
          console.log("its not fine" + data.error.message);
          console.log(data);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  onClickFileLink = (pageId) => {
    console.log(pageId)
    this.getDataFromDb(pageId);
  };

  onRemoveFileLink=(pageId)=>{

  }
  renderGraph = () => {
    let eqns = [];
    this.state.Eqns.forEach((eqn) => {
      eqns.push(eqn.TextEqn);
    });

    let LineNames = [];
    this.state.Eqns.forEach((eqn) => {
      LineNames.push(eqn.line);
    });

    return this.state.graphConfig.submitted ? (
      <LinearCoupledDiffEqns
        h={0.05}
        numberOfCycles={30}
        eqns={eqns}
        LineNames={LineNames}
        initialConditions={this.state.graphConfig.initialConditions}
        LegendVertical={this.state.graphConfig.LegendVertical}
        LegendHorizontal={this.state.graphConfig.LegendHorizontal}
        DecimalPrecision={this.state.graphConfig.DecimalPrecision}
      />
    ) : null;
  };

  copyAllEqnsText = () => {
    var allTextEqns = [];

    for (let i = 0; i < this.state.Eqns.length; i++) {
      let Eqn = {
        ...this.state.Eqns[i],
      };
      allTextEqns.push(Eqn.TextEqn);
    }
    navigator.clipboard.writeText(allTextEqns);
  };
  render() {
    let Eqns = (
      <EqnItems
        Eqns={this.state.Eqns}
        removeEqn={this.removeEqn}
        handleMathQuillInputChange={this.handleMathQuillInputChange}
      />
    );
    let Files = null;
    //console.log("dfkjgkdfjgkfdjjgfdkljgfd"+Object.keys(this.state.allPageId))

    // this.state.allPageId.length !== 0
    //   ? (Files = (
    //       <FileController
    //         onRemoveFileLink={this.onRemoveFileLink}
    //         allPageId={this.state.allPageId}
    //         onClick={this.onClickFileLink}
    //       />
    //     ))
    //   : (Files = null);

    return (
      <div className={classes.Container}>
        <p>files herre</p>
                        {Files}

        <form onSubmit={this.handleMathQuillInputSubmit}>
          <div className={classes.Eqns}>
            {Eqns}
            <div className={classes.ButtonContainer}>
              <div className={classes.Button}>
                <SettingButton
                  disabled={!this.state.calculate}
                  type="button"
                  value="config"
                  displayValue="CONFIG"
                  onClick={this.toggleChartShow}
                />
              </div>
              <div className={classes.Button}>
                <MyButton
                  type="button"
                  value="addODE"
                  disabled={this.state.Eqns.length === 4}
                  displayValue="Add ODE"
                  onClick={this.onIncrementEqn}
                />
              </div>
              <div className={classes.Button}>
                <MyButton
                  type="reset"
                  value="Reset"
                  displayValue="RESET"
                  onClick={this.resetForm}
                />
              </div>

              <div className={classes.Button}>
                <MyButton type="submit" value="Submit" displayValue="SUBMIT" />
              </div>
              <div className={classes.Button}>
                <MyButton
                  type="button"
                  value="Copy"
                  displayValue="COPY model"
                  onClick={this.copyAllEqnsText}
                />
              </div>
              <div className={classes.Button}>
                <MyButton
                  type="button"
                  value="Save"
                  displayValue="SAVE eqn"
                  onClick={this.saveFileToDb}
                />
              </div>
              <div className={classes.Button}>
                <MyButton
                  type="button"
                  value="Create"
                  displayValue="CREATE model"
                  onClick={this.createNewFile}
                />
              </div>
            </div>
          </div>
        </form>

        <div className={classes.Graph}>
          {/*   <div className={classes.Legend}>
            <InteractiveTextBox
              variableDescriptionObj={this.state.variableDescription}
            />
    </div>*/}

          {this.state.calculate ? this.renderGraph() : null}
        </div>

        {this.state.graphConfig.show && this.state.calculate ? (
          <GraphConfig
            errorMessage={!this.state.graphConfig.submitted}
            LegendHorizontal={this.state.graphConfig.LegendHorizontal}
            LegendVertical={this.state.graphConfig.LegendVertical}
            DecimalPrecision={this.state.graphConfig.DecimalPrecision}
            initialConditions={this.state.graphConfig.initialConditions}
            onClose={this.toggleChartShow}
            onChange={(val) => this.onGraphConfigChange(val)}
            onSubmit={this.onGraphConfigSubmit}
          />
        ) : null}
      </div>
    );
  }
}

export default LinearCoupled;
