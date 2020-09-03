import React, { Component } from "react";
import "../../../../node_modules/react-grid-layout/css/styles.css";

import EqnItems from "../../../components/UI/Eqns/EqnItems";
import VarItems from "../../../components/UI/Vars/VarItems";
import { simplify, parse } from "mathjs";
import classes from "./LinearCoupled.module.css";
import MyErrorMessage from "../../../components/UI/MyErrorMessage/CustomizedErrorMessage";
import GraphConfig from "../../../components/UI/GraphConfig/GraphConfig";
import LinearCoupledDiffEquationGrapher from "../../../components/Calculations/Dynamic/LinearCoupled/LinearCoupledDiffEquationGrapher";
import {
  Paper,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import LinearCoupledButtonEqnsContainer from "../../../components/UI/ButtonContainer/LinearCoupledButtonEqnsContainer";
import DEFAULTEQUATIONSNEW from "../../../components/Calculations/Dynamic/SampleEquations/DEFAULTEQUATIONSnew";

import LinearCoupledButtonVariablesContainer from "../../../components/UI/ButtonContainer/LinearCoupledButtonVariablesContainer";
import LinearCoupledButtonGraphContainer from "../../../components/UI/ButtonContainer/LinearCoupledButtonGraphContainer";
import FileUpload from "../../../components/UI/FileUpload/FileUpload";

import Model from "../../../components/Calculations/Dynamic/SampleEquations/Model";
import Draggable from "react-draggable";

class LinearCoupled extends Component {
  /**
   * Visual Component that contains the textbox for the equation and calculation outputs
   * plus some equation labels
   *
   */

  //y1=a, y2=b,y3=c

  state = {
    modelId: "",
    consoleMessages: [
      "Welcome to ModelBench!",
      "Select a model to get started",
    ],
    typistIndex: 0,
    showMathQuillBox: true,

    modelObj: { Eqns: [], Vars: [], Config: {}, meta: {} }, // This hack is required to handle the modelObj default state
    // myReactGridLayout: DEFAULTLAYOUT(new Model()), //TODO should create a new model obj here
  };

  static getDerivedStateFromProps(props, state) {
    if (props.modelId !== state.modelId) {
      let newModel = new Model(
        {
          Config: props.modelObj.Config,
          Eqns: props.modelObj.Eqns,
          Vars: props.modelObj.Vars,
        },
        {
          name: props.modelObj.meta.name,
          description: props.modelObj.meta.description,
          modelId: props.modelId,
        }
      );

      return {
        modelId: props.modelId,
        modelObj: newModel,
        consoleMessages: [
          "Welcome to ModelBench!",
          "Select a model to get started",
        ],
      };
    }

    return null;
  }

  componentDidUpdate() {
    // This flag is a signal from the parent component that any further updates to the state
    // in this component should be synced with the parent

    if (this.props.seekChildUpdates) {
      this.props.sendToParent(this.state.modelObj);
    }
  }
  TEXTEQNS_handleInputChange = (id) => (event, value) => {
    let Eqns = this.state.modelObj.Eqns;

    const idx = Eqns.findIndex((e) => {
      return e.id === id;
    });

    const Eqn = Eqns[idx];
    Eqn.textEqn = event.target.value;
    Eqn.latexEqn = this.state.modelObj.singleEqnToLatex(event.target.value);

    Eqns[idx] = Eqn;

    let modelObj = this.state.modelObj;
    modelObj.Eqns = Eqns;
    modelObj.Config.calculate = false;

    this.setState({ modelObj: modelObj });
  };

  MATHQUILL_handleInputChange = (id, itemType) => (mathField) => {
    let items = this.state.modelObj[itemType];
    const idx = items.findIndex((e) => {
      return e.id === id;
    });
    const item = items[idx];

    if (itemType === "Eqns") {
      item.textEqn = mathField.text();
      item.latexEqn = mathField.latex();
    } else {
      let modelObj = this.state.modelObj;

      let Eqns = this.state.modelObj.Eqns;

      if (item.VarType === "Dependent") {
        //TODO rename var for Vars the LatexForm can be y_1 or y2 which is being compared to eqn linename
        let index = Eqns.findIndex(
          (Eqn) => Eqn.lineName === this.state.modelObj.Vars[idx].LatexForm
        );

        let independentLatex = this.state.modelObj.Vars.find(
          (Var) => Var.VarType === "Independent"
        ).LatexForm;

        Eqns[index].DByDLatex =
          "\\frac{d" + mathField.latex() + "}{d" + independentLatex + "}=";
        Eqns[index].lineName = mathField.latex();

        modelObj.Eqns = Eqns;
      } else if (item.VarType === "Independent") {
        Eqns.forEach(
          (Eqn) =>
            (Eqn.DByDLatex =
              "\\frac{d" + Eqn.lineName + "}{d" + mathField.latex() + "}=")
        );
      }

      // this.setState({modelObj:modelObj})

      // for (let i = 0; i < Eqns.length; i++) {
      //   let textEqn = Eqns[i].textEqn
      //     .split(this.state.modelObj.Vars[idx].LatexForm) //find
      //     .join(mathField.text()); //replace
      //   // let txt2 = this.state.modelObj.Vars[idx].LatexForm.slice(0, 1) + "\\" + this.state.modelObj.Vars[idx].LatexForm.slice(1);
      //   // let txt3 = mathField.latex().slice(0, 1) + "\\" + mathField.latex().slice(1);

      //   // let latexEqn = Eqns[i].latexEqn
      //   //   .split(txt2)
      //   //   .join(txt3);

      //   Eqns[i].latexEqn = parse(
      //     parse(textEqn).toString({
      //       implicit: "hide",
      //       parenthesis: "auto",
      //     })
      //     // \frac{dY_1}{dx}=
      //   ).toTex({
      //     parenthesis: "auto",
      //     implicit: "hide",
      //   });
      //   // Eqns[i].textEqn = textEqn;
      // }

      // }
      item.LatexForm = mathField.latex();
      items[idx] = item;
      let invalidIdx = [];
      // Check if item is a dup
      for (let i = 0; i < items.length; i++) {
        for (let j = 0; j < items.length; j++) {
          if (i !== j) {
            if (items[i].LatexForm === items[j].LatexForm) {
              invalidIdx.push(i, j);
            } else {
              items[i].errorMessage = null;
              items[j].errorMessage = null;
            }
          }
        }
      }
      [...new Set(invalidIdx)].forEach(
        (idx) => (items[idx].errorMessage = "Err")
      );
    }

    items[idx] = item;

    let modelObj = this.state.modelObj;
    modelObj[itemType] = items;
    modelObj.Config.calculate = false;

    this.setState({ modelObj: modelObj });
  };
  MATHQUILL_handleInputSubmit = (event) => {
    event.preventDefault();
    let newEqns = [];
    let invalidIndex = this.state.modelObj.validateExpressions();

    for (let i = 0; i < this.state.modelObj.Eqns.length; i++) {
      const eqn = this.state.modelObj.Eqns[i];

      if (invalidIndex.includes(i)) {
        eqn.errorMessage = <MyErrorMessage />;
        newEqns.push(eqn);
      } else {
        eqn.errorMessage = null;
        eqn.parsedEqn = simplify(parse(eqn.textEqn));
        newEqns.push(eqn);
      }
    }
    let aModel = this.state.modelObj;

    if (invalidIndex.length === 0) {
      //valid

      let newEqns2 = this.state.modelObj.insertDifferentialIntoText(newEqns);
      if (
        newEqns2.some((eqn) => eqn.errorMessage !== null) ||
        this.state.modelObj.Vars.some((Var) => Var.errorMessage !== null)
      ) {
        //invalid
        aModel.Config.calculate = false;
        aModel.Eqns = newEqns2;
        let msg = [
          <p>
            ERROR: Please correct the equations or vars highlighted to be able
            to solve the model"
          </p>,
        ];
        let consoleMessages = [...this.state.consoleMessages];
        consoleMessages.push(msg);
        this.setState({ consoleMessages: msg });
      } else {
        aModel.Config.calculate = true;
        let msg = [<p>Calculating...</p>];
        let consoleMessages = [...this.state.consoleMessages];
        consoleMessages.push(msg);
        this.setState({ consoleMessages: msg });
        aModel.Eqns = newEqns2;
      }
    } else {
      aModel.Config.calculate = false;
    }

    let allPossibleAxes = this.state.modelObj.Vars.filter(
      (Var) => Var.VarType === "Independent" || Var.VarType === "Dependent"
    ).map((Var) => Var.LatexForm);
    let yAxis = this.state.modelObj.Config.yAxis;
    let xAxis = this.state.modelObj.Config.xAxis;

    if (!allPossibleAxes.includes(xAxis)) {
      xAxis = allPossibleAxes[0];
    }
    if (!allPossibleAxes.includes(yAxis)) {
      yAxis = allPossibleAxes[0];
    }

    aModel.Config.yAxis = yAxis;
    aModel.Config.xAxis = xAxis;

    this.setState({ modelObj: aModel });
  };

  ITEMS_remove = (id, itemType) => {
    let modelObj = this.state.modelObj;

    if (itemType === "Eqns") {
      // Line up the initial Condition corresponding to the vars
      let Config = this.state.modelObj.Config;

      const idx = this.state.modelObj.Eqns.findIndex((e) => {
        return e.id === id;
      });
      let Vars = this.state.modelObj.Vars.filter((Var) => {
        return Var.LatexForm !== this.state.modelObj.Eqns[idx].lineName;
      });

      let Eqns = this.state.modelObj.Eqns.filter((eqn) => {
        return eqn.id !== id;
      });

      // let lineNames = Eqns.map((eqn) => eqn.lineName);
      // let initialConditions = this.state.modelObj.Config.initialConditions.filter(
      //   (_, i) => {
      //     return i !== idx;
      //   }
      // );
      // Config.lineNames = lineNames;
      // Config.initialConditions = initialConditions;
      modelObj.Config = Config;
      modelObj.Eqns = Eqns;
      modelObj.Vars = Vars;

      modelObj.Config.calculate = false;

      this.setState({
        modelObj: modelObj,
      });
    } else {
      const idx = this.state.modelObj.Vars.findIndex((e) => {
        return e.id === id;
      });

      let Eqns = this.state.modelObj.Eqns.filter((eqn) => {
        return this.state.modelObj.Vars[idx].LatexForm !== eqn.lineName;
      });
      let Vars = this.state.modelObj.Vars.filter((element) => {
        return element.id !== id;
      });

      modelObj.Config.calculate = false;
      modelObj.Vars = Vars;
      modelObj.Eqns = Eqns;

      this.setState({
        modelObj: modelObj,
      });
    }
  };
  ITEMS_reset = (itemType) => {
    this.setState({
      modelObj: new Model(),
    });
  };

  VARS_handleInputChange = (id, calculate) => (event, value) => {
    let modelObj = this.state.modelObj;
    let Vars = modelObj.Vars;

    const idx = Vars.findIndex((e) => {
      return e.id === id;
    });

    const Var = Vars[idx];

    if (event.target.name === undefined) {
      isNaN(value)
        ? (Var["VarCurrent"] = 0)
        : (Var["VarCurrent"] = event.target.value);
      Var["VarCurrent"] = value;
    } else {
      isNaN(event.target.value)
        ? (Var[event.target.name] = 0)
        : (Var[event.target.name] = event.target.value);
    }
    if (event.target.name === "VarLow" && event.target.value === "") {
      Var["VarLow"] = 0;
    }

    Vars[idx] = Var;

    modelObj.Vars = Vars;
    if (calculate) {
      modelObj.Config.calculate = false;
    }

    this.setState({ modelObj: modelObj });
  };

  VARS_nextPossible = (prevState, type) => {
    let typeArr = prevState.modelObj.Vars.filter((Var) => {
      return Var.VarType === type;
    });

    let letterTypes = {
      Constant: "K",
      Dependent: "Y",
      Independent: "X",
    };

    let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    for (let i = 0; i < typeArr.length; i++) {
      const index = numbers.indexOf(
        typeArr[i].LatexForm[typeArr[i].LatexForm.length - 1]
      );

      numbers.splice(index, 1);
    }

    let VariableObj = {
      id: type + numbers[0] + new Date().getTime(),
      LatexForm: letterTypes[type] + "_" + numbers[0],
      errorMessage: null,
      VarType: type,
      VarCurrent: type === "Constant" ? 50 : 0.5,
    };
    if (type === "Constant") {
      VariableObj.VarLow = 0;
      VariableObj.VarHigh = 100;
    }
    // VariableObj.Unit = "cm";

    return VariableObj;
  };
  VARS_onIncrement = (type) => {
    let modelObj = this.state.modelObj;
    modelObj.Vars = modelObj.Vars.concat(
      this.VARS_nextPossible(this.state, type)
    );
    modelObj.Config.calculate = false;

    this.setState({
      modelObj: modelObj,
    });
  };

  EQNS_nextPossible = (prevState) => {
    let Eqns = DEFAULTEQUATIONSNEW;

    const results = Eqns.filter(({ lineName: a }) => {
      return !prevState.modelObj.Eqns.some(({ lineName: b }) => b === a);
    });
    let independentLatex = this.state.modelObj.Vars.find(
      (Var) => Var.VarType === "Independent"
    ).LatexForm;

    let EqnObj = {
      id: results[0].lineName,
      lineName: results[0].lineName,
      DByDLatex:
        "\\frac{d" + results[0].lineName + "}{d" + independentLatex + "}=",
      latexEqn: parse(
        parse(results[0].textEqn).toString({
          implicit: "hide",
          parenthesis: "auto",
        })
      ).toTex({
        parenthesis: "auto",
        implicit: "hide",
      }),
      textEqn: results[0].textEqn,
      parsedEqn: simplify(parse(results[0].textEqn)),
      errorMessage: null,
    };

    return EqnObj;
  };
  EQNS_onIncrement = () => {
    let modelObj = this.state.modelObj;
    let nextEqn = this.EQNS_nextPossible(this.state);
    modelObj.Eqns = modelObj.Eqns.concat(nextEqn);
    modelObj.Vars = modelObj.Vars.concat(
      {
        id: nextEqn.lineName + "2",
        LatexForm: nextEqn.lineName,
        errorMessage: null,

        VarType: "Dependent",
        VarCurrent: 0.5,
      }
      // this.VARS_nextPossible(this.state, "Dependent")
    );

    // modelObj.Config.initialConditions.push(0.5);
    // modelObj.Config.lineNames = modelObj.Eqns.map((eqn) => eqn.lineName);
    this.setState({
      modelObj: modelObj,
    });
  };

  GRAPHCONFIG_onClose = () => {
    let modelObj = this.state.modelObj;
    modelObj.Config.show = !this.state.modelObj.Config.show;
    this.setState({
      modelObj: modelObj,
    });
  };

  GRAPHCONFIG_onChange = (keyName) => (event, value) => {
    let modelObj = this.state.modelObj;

    modelObj.Config[keyName] = event.target.value;
    // this should be passed in from event source
    let GRAPHAXISNAMES = ["xAxis", "yAxis", "DecimalPrecision"];

    if (GRAPHAXISNAMES.includes(keyName)) {
      // pluck the data out from modelObj and plot
      this.GRAPH_renderCalced(modelObj.solutions.calcedSolution);
    } else {
      // Here we are waiting for a rerrun of the model
      modelObj.Config.calculate = false;
    }

    this.setState({ modelObj: modelObj });
  };
  GRAPHCONFIG_onSubmit = () => {
    let modelObj = this.state.modelObj;
    modelObj.Config.show = false;
    modelObj.Config.calculate = true;

    this.setState({ modelObj: modelObj });
  };

  GRAPH_renderCalced = (calcedSolution) => {
    return (
      <div key="Graph">
        <LinearCoupledDiffEquationGrapher
          computedResults={calcedSolution}
          modelObj={this.state.modelObj}
        />
      </div>
    );
  };

  GRAPH_render = () => {
    return this.GRAPH_renderCalced(this.state.modelObj.solveDiffEqns());
  };

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.EqnColumn}>
          <Paper key="Eqns" className={classes.EqnContainer} elevation={3}>
            <LinearCoupledButtonEqnsContainer
              Eqns={this.state.modelObj.Eqns}
              onIncrementEqn={this.EQNS_onIncrement}
              resetForm={() => this.ITEMS_reset("eqns")}
              handleMathQuillInputSubmit={this.MATHQUILL_handleInputSubmit}
              handleChangeShowMathQuillBox={() => {
                this.setState({
                  showMathQuillBox: !this.state.showMathQuillBox,
                });
              }}
            />
            <EqnItems
              Eqns={this.state.modelObj.Eqns}
              removeItem={this.ITEMS_remove}
              handleMathQuillInputChange={this.MATHQUILL_handleInputChange}
              showMathQuillBox={this.state.showMathQuillBox}
              handleTextEqnInputChange={this.TEXTEQNS_handleInputChange}
            />
          </Paper>

          <Paper
            key="Description"
            className={classes.MetaContainer}
            elevation={3}
          >
            {/* <div className={classes.uploadButton}>
            <FileUpload
              setDescription={(txt) => {
                let modelObj = this.state.modelObj;
                modelObj.Config.calculate = false;
                console.log(txt);
                modelObj.meta.description = txt;
                this.setState({ modelObj: modelObj });
              }}
            />

            </div> */}
            {/* <div className={classes.textfield}> */}
            <TextField
              id="outlined-multiline-static"
              multiline
              rowsMax={Infinity}
              defaultValue="Open a model to view descriptions"
              value={this.state.modelObj.meta.description}
              onChange={(e) => {
                let modelObj = this.state.modelObj;
                modelObj.Config.calculate = false;

                modelObj.meta.description = e.target.value;
                this.setState({ modelObj: modelObj });
              }}
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FileUpload
                      setDescription={(txt) => {
                        let modelObj = this.state.modelObj;
                        modelObj.Config.calculate = false;
                        console.log(txt);
                        modelObj.meta.description = txt;
                        this.setState({ modelObj: modelObj });
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              inputProps={{ style: { fontSize: 12 } }} // font size of input text
            />
            {/* </div> */}
          </Paper>

          {/* <Paper
            key="Console"
            className={classes.ConsoleContainer}
            elevation={3}
          >
            {this.state.consoleMessages.map((msg) => (
              <p>{">  " + msg}</p>
            ))}
          </Paper> */}
        </div>
        <div className={classes.VarColumn}>
          <Paper
            className={classes.VarContainer}
            // style={{ backgroundColor: "red" }}
          >
            <LinearCoupledButtonVariablesContainer
              Vars={this.state.modelObj.Vars}
              Eqns={this.state.modelObj.Eqns}
              onIncrementVariable={this.VARS_onIncrement}
              resetForm={() => this.ITEMS_reset("vars")}
            />
            <VarItems
              Vars={this.state.modelObj.Vars}
              handleVariableInputChange={this.VARS_handleInputChange}
              removeItem={this.ITEMS_remove}
              handleMathQuillInputChange={this.MATHQUILL_handleInputChange}
            />
          </Paper>
          {/* <Paper
            key="Console"
            className={classes.ConsoleContainer}
            elevation={3}
          >
            {this.state.consoleMessages.map((msg) => (
              <p>{">  " + msg}</p>
            ))}
          </Paper> */}
        </div>

        {this.state.modelObj.Config.calculate ? (
          <div key="GraphButtons" className={classes.Graph}>
            <LinearCoupledButtonGraphContainer
              calculate={this.state.modelObj.Config.calculate}
              onGraphConfigOpen={this.GRAPHCONFIG_onClose}
              onGraphClose={() => {
                let modelObj = { ...this.state.modelObj };
                modelObj.Config.calculate = false;
                this.setState({ modelObj: modelObj });
              }}
              modelObj={this.state.modelObj}
            />
            {this.GRAPH_render(
              this.state.modelObj.solutions.calcedSolution
                ? this.state.modelObj.solutions.calcedSolution
                : null
            )}
          </div>
        ) : (
          <div className={classes.Graph} key="GraphButtons" />
        )}

        {/* <Modal
                    open={this.state.modelObj.Config.show}
                    onClose={this.GRAPHCONFIG_onClose}
                > */}
        {this.state.modelObj.Config.show ? (
          <Draggable enableUserSelectHack={false}>
            <div key="GraphConfig" className={classes.graphConfig}>
              <GraphConfig
                modelObj={this.state.modelObj}
                onClose={this.GRAPHCONFIG_onClose}
                onChange={(val) => this.GRAPHCONFIG_onChange(val)}
                onSubmit={this.GRAPHCONFIG_onSubmit}
              />
            </div>
          </Draggable>
        ) : null}
        {/* </Modal> */}
      </div>
    );
  }
}

export default LinearCoupled;
