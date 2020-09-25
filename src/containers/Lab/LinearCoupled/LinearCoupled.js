import React, { Component } from "react";
import "../../../../node_modules/react-grid-layout/css/styles.css";

import EqnItems from "../../../components/UI/Eqns/EqnItems";
import VarItems from "../../../components/UI/Vars/VarItems";
import { parse, simplify } from "mathjs";
import classes from "./LinearCoupled.module.css";
import MyErrorMessage from "../../../components/UI/MyErrorMessage/CustomizedErrorMessage";
import GraphConfig from "../../../components/UI/GraphConfig/GraphConfig";
import LinearCoupledDiffEquationGrapher from "../../../components/Calculations/Dynamic/LinearCoupled/LinearCoupledDiffEquationGrapher";
import { InputAdornment, Paper, TextField } from "@material-ui/core";
import LinearCoupledButtonEqnsContainer from "../../../components/UI/ButtonContainer/LinearCoupledButtonEqnsContainer";
import DEFAULTEQUATIONS from "../../../components/Calculations/Dynamic/SampleEquations/DEFAULTEQUATIONS";

import LinearCoupledButtonVariablesContainer from "../../../components/UI/ButtonContainer/LinearCoupledButtonVariablesContainer";
import LinearCoupledButtonGraphContainer from "../../../components/UI/ButtonContainer/LinearCoupledButtonGraphContainer";
import FileUpload from "../../../components/UI/FileUpload/FileUpload";

import Model from "../../../components/Calculations/Dynamic/SampleEquations/Model";
import Draggable from "react-draggable";
import Spinner from "../../../components/UI/Skeleton/Spinner";
import SnackbarError from "../../../components/UI/MyErrorMessage/SnackbarError";
import { withSnackbar, SnackbarProvider } from "notistack";

class LinearCoupled extends Component {
  /**
   * Visual Component that contains the textbox for the equation and calculation outputs
   * plus some equation labels
   *
   */

  //y1=a, y2=b,y3=c

  state = {
    modelId: "",

    localSolver: true, // this flag determines if we are using JS or remote Python Server
    completed: false, // onky relevant for remote Python server
    showMathQuillBox: true,
    error: false,
    controller: new AbortController(),

    modelObj: { Eqns: [], Vars: [], Config: {}, meta: {} }, // This hack is required to handle the modelObj default state
    // myReactGridLayout: DEFAULTLAYOUT(new Model()), //TODO should create a new model obj here
  };

  static getDerivedStateFromProps(props, state) {
    /* This can be called by children of LinearCoupled ie ModelBench or Graph / GraphConfig/VariableItems/EquationItems
     */

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
    // When editing LHS of equations, we need to handle it and
    // console.log(id, itemType, mathField.latex());
    let modelObj = this.state.modelObj;
    let items = modelObj["Eqns"];
    let idx = items.findIndex((e) => {
      return e.id === id;
    });
    let item = items[idx];

    if (itemType === "LHSEqns") {
      let latex = mathField.latex();

      item.LHSLatexEqn = latex;

      let dependentLatex = item.lineName;
      //try to figure out what the lineName is given a LHS
      if (/frac({d.*}){2}=/.test(latex)) {
        //its a valid fraction

        dependentLatex = latex.substring(
          latex.indexOf("d") + 1,
          latex.indexOf("}")
        );
        let idxOfIndependent = this.state.modelObj.Vars.findIndex(
          (Var) => Var.VarType === "Independent"
        );
        let independentLatex = latex.substring(
          latex.lastIndexOf("d") + 1,
          latex.lastIndexOf("}")
        );
        modelObj.Vars[idxOfIndependent].LatexForm = independentLatex;

        if (dependentLatex.includes("{")) {
          dependentLatex = dependentLatex + "}";
        }
      } else if (/.+=/.test(latex)) {
        //its E=
        dependentLatex = latex.substring(0, latex.indexOf("="));
      }

      //returns dependentlatex (the new user input)

      //TODO make sure lineName is NEVER ""

      //replaces all item.lineNames instances with the new user input
      // if (dependentLatex === "") {
      //   dependentLatex = "a";
      // }

      //lineName=S,dependent="",lineName=""
      //lineName=S,dependent="",lineName=""
      //lineName=S,dependent="",lineName=""
      //   console.log(
      //     "item.lineName " + item.lineName,
      //     "dependentLatex " + dependentLatex
      //   );
      //   modelObj.Eqns.forEach((Eqn) => {
      //     Eqn.textEqn = Eqn.textEqn.replace(item.lineName, dependentLatex);
      //     Eqn.latexEqn = this.state.modelObj.tryConvertToLatex(Eqn.textEqn)

      //   });
      //   console.log(modelObj.Eqns)
      //finds the index of the Var with item.lineName
      let idxOfVars = this.state.modelObj.Vars.findIndex(
        (Var) => Var.LatexForm === item.lineName
      );
      modelObj.Vars[idxOfVars].LatexForm = dependentLatex;

      //sets new lineName as new user input
      item.lineName = dependentLatex;

      items[idx] = item;
      modelObj["Eqns"] = items;

      modelObj.Config.calculate = false;

      this.setState({ modelObj: modelObj });
    } else if (itemType === "Eqns") {
      item.textEqn = mathField.text();
      item.latexEqn = mathField.latex();
      items[idx] = item;
      modelObj[itemType] = items;
      modelObj.Config.calculate = false;

      this.setState({ modelObj: modelObj });
    } else {
      // Editing the Vars
      let items = modelObj["Vars"];
      let idx = items.findIndex((e) => {
        return e.id === id;
      });
      let item = items[idx];

      let Eqns = this.state.modelObj.Eqns;

      if (item.VarType === "Dependent") {
        //TODO rename var for Vars the LatexForm can be y_1 or y2 which is being compared to eqn linename
        let index = Eqns.findIndex(
          (Eqn) => Eqn.lineName === this.state.modelObj.Vars[idx].LatexForm
        );

        let independentLatex = this.state.modelObj.Vars.find(
          (Var) => Var.VarType === "Independent"
        ).LatexForm;

        if (/frac({d.*}){2}/.test(Eqns[index].LHSLatexEqn)) {
          //its a valid fraction

          Eqns[index].LHSLatexEqn =
            "\\frac{d" + mathField.latex() + "}{d" + independentLatex + "}=";
        }
        if (/(\w+=)/.test(Eqns[index].LHSLatexEqn)) {
          //its E=
          Eqns[index].LHSLatexEqn = mathField.latex() + "=";
        }

        Eqns[index].lineName = mathField.latex();

        modelObj.Eqns = Eqns;
      } else if (item.VarType === "Independent") {
        Eqns.forEach((Eqn) => {
          if (/frac({d.*}){2}/.test(Eqn.LHSLatexEqn)) {
            //its a valid fraction
            Eqn.LHSLatexEqn =
              "\\frac{d" + Eqn.lineName + "}{d" + mathField.latex() + "}=";
          }
          // else if (/(\w+=)/.test(Eqns.LHSLatexEqn)) {
          //   //its E=
          //   Eqns[index].LHSLatexEqn = mathField.latex() + "=";
          //   Eqn.LHSLatexEqn = mathField.latex() + "=";
          // }
        });
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
        (idx) =>
          (items[idx].errorMessage = (
            <MyErrorMessage
              msg={
                <div>
                  <b>{items[idx].LatexForm}</b> <u>is a duplicate</u>
                </div>
              }
              //   msg={items[idx].LatexForm + "is a duplicate"}
            />
          ))
      );
      items[idx] = item;
      modelObj[itemType] = items;
      modelObj.Config.calculate = false;

      this.setState({ modelObj: modelObj });
    }
  };

  MATHQUILL_handleInputSubmit = (event) => {
    event.preventDefault();
    let newEqns = [];
    let invalidIndex = this.state.modelObj.validateExpressions();

    for (let i = 0; i < this.state.modelObj.Eqns.length; i++) {
      const eqn = this.state.modelObj.Eqns[i];

      if (invalidIndex.includes(i)) {
        eqn.errorMessage = (
          <MyErrorMessage
            msg={
              <div>
                <b>{eqn.lineName}</b> <u> uses a unknown variable</u>
              </div>
            }
          />
        );
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
      this.props.enqueueSnackbar("Valid model", {
        variant: "success",
      });
      let newEqns2 = this.state.modelObj.insertDifferentialIntoText(newEqns);
      if (
        newEqns2.some((eqn) => eqn.errorMessage !== null) ||
        this.state.modelObj.Vars.some((Var) => Var.errorMessage !== null)
      ) {
        //invalid
        aModel.Config.calculate = false;
        aModel.Eqns = newEqns2;
        this.props.enqueueSnackbar("Invalid model", {
          variant: "error",
        });
      } else {
        aModel.Eqns = newEqns2;
        aModel.Config.calculate = true;

        if (this.state.localSolver) {
          let solution = this.state.modelObj.solveDiffEqns();
          aModel.solutions.calcedSolution = solution;
          this.setState({ modelObj: aModel });
        } else {
          this.getDAESolution();
          // this.getODESolution()
        }
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
  ITEMS_reset = () => {
    this.props.enqueueSnackbar("Reset model", {
      variant: "success",
    });
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
      console.log(isNaN(event.target.value), event.target.value[0] !== "-");
      isNaN(event.target.value) &&
      event.target.value[0] !== "-" &&
      event.target.value[0] !== "+"
        ? (Var[event.target.name] = 0)
        : (Var[event.target.name] = event.target.value);
    }
    if (event.target.name === "VarLow" && event.target.value === "") {
      Var["VarLow"] = 0;
    }

    Vars[idx] = Var;

    modelObj.Vars = Vars;
    if (this.state.modelObj.Config.calculate) {
      if (this.state.localSolver) {
        let solution = modelObj.solveDiffEqns();
        modelObj.solutions.calcedSolution = solution;
        this.setState({ modelObj: modelObj });
      } else {
        this.getDAESolution();
        // this.getODESolution()
      }
    }

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
    let Eqns = DEFAULTEQUATIONS;

    const results = Eqns.filter(({ lineName: a }) => {
      return !prevState.modelObj.Eqns.some(({ lineName: b }) => b === a);
    });

    let EqnObj = {
      id: results[0].lineName,
      lineName: results[0].lineName,
      LHSLatexEqn: results[0].LHSLatexEqn,
      latexEqn: parse(parse(results[0].textEqn).toString({})).toTex({}),
      textEqn: results[0].textEqn,
      // parsedEqn: simplify(parse(results[0].textEqn)),
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

  getDAESolution = () => {
    /**
     * This makes a call to a python server with the equations
     */
    console.log("going to python");

    let modelObj = this.state.modelObj;
    modelObj.Config.calculate = true;
    // modelObj.solutions.calcedSolution = [];

    this.setState({
      modelObj: modelObj,
      localSolver: false,
      completed: false,
      error: false,
    });

    //Eqns frac MUST have "\\frac{da}{dt}"
    const signal = this.state.controller.signal;
    console.log(this.state.modelObj);

    fetch("https://tesarrec.herokuapp.com/solve_dae", {
      method: "POST",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.modelObj),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
        modelObj.solutions.calcedSolution = json;
        this.props.enqueueSnackbar("Request succeeded", {
          variant: "success",
        });
        this.setState({
          error: false,

          modelObj: modelObj,
          completed: true,
        });
        return json;
      })
      .catch((err) => {
        console.log(err);
        modelObj.Config.calculate = false;

        if (err.name === "AbortError") {
          this.props.enqueueSnackbar("Request aborted", {
            variant: "error",
          });
          this.setState({
            modelObj: modelObj,
            error: false,
            completed: true,
          });
        } else {
          this.props.enqueueSnackbar("Request failed", {
            variant: "error",
          });
          this.setState({
            modelObj: modelObj,
            error: true,
            completed: true,
          });
        }
      });
  };

  GRAPH_renderCalced = (calcedSolution) => {
    if (calcedSolution !== null && calcedSolution !== undefined) {
      return (
        <div key="Graph">
          <LinearCoupledDiffEquationGrapher
            computedResults={calcedSolution}
            modelObj={this.state.modelObj}
          />
        </div>
      );
    }
  };

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.EqnColumn}>
          <Paper key="Eqns" className={classes.EqnContainer} elevation={3}>
            <LinearCoupledButtonEqnsContainer
              Eqns={this.state.modelObj.Eqns}
              onIncrementEqn={this.EQNS_onIncrement}
              resetForm={() => this.ITEMS_reset()}
              handleMathQuillInputSubmit={this.MATHQUILL_handleInputSubmit}
              handleChangeShowMathQuillBox={() => {
                this.setState({
                  showMathQuillBox: !this.state.showMathQuillBox,
                });
              }}
              handleChangeLocalToServer={() => {
                let modelObj = this.state.modelObj;
                modelObj.Config.calculate = false;
                this.setState({
                  modelObj: modelObj,
                  localSolver: !this.state.localSolver,
                  error: false,
                });
              }}
              localSolver={this.state.localSolver}
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
                        modelObj.meta.description = txt;
                        this.setState({ modelObj: modelObj });
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              inputProps={{ style: { fontSize: 12 } }} // font size of input text
            />
          </Paper>
        </div>

        <div className={classes.VarColumn}>
          <Paper className={classes.VarContainer}>
            <LinearCoupledButtonVariablesContainer
              Vars={this.state.modelObj.Vars}
              Eqns={this.state.modelObj.Eqns}
              onIncrementVariable={this.VARS_onIncrement}
            />
            <VarItems
              Vars={this.state.modelObj.Vars}
              handleVariableInputChange={this.VARS_handleInputChange}
              removeItem={this.ITEMS_remove}
              handleMathQuillInputChange={this.MATHQUILL_handleInputChange}
            />
          </Paper>

          {/* <Paper className={classes.PicContainer}>
            <img
              style={{ maxWidth: "100%", maxHeight: "100%" }}
              src="https://www.lewuathe.com/assets/img/posts/2020-03-11-covid-19-dynamics-with-sir-model/sir.png"
              alt="new"
            />
          </Paper> */}
        </div>

        {this.state.modelObj.Config.calculate ? (
          <div key="GraphButtons" className={classes.Graph}>
            <LinearCoupledButtonGraphContainer
              calculate={this.state.modelObj.Config.calculate}
              onGraphConfigOpen={this.GRAPHCONFIG_onClose}
              onGraphClose={() => {
                // this.state.controller.abort();
                // this.abortFetch()

                let modelObj = { ...this.state.modelObj };
                modelObj.Config.calculate = false;
                this.setState({ modelObj: modelObj });
              }}
              modelObj={this.state.modelObj}
            />
            {/*if remote solver and not completed show the spinner*/}

            {!this.state.localSolver && !this.state.completed ? (
              <div> <Spinner /><p className={classes.loadingText}>Loading...</p></div>

             
            ) : null}

            {this.state.completed || this.state.localSolver
              ? this.GRAPH_renderCalced(
                  this.state.modelObj.solutions.calcedSolution
                )
              : null}
          </div>
        ) : (
          <div className={classes.Graph} key="GraphButtons" />
        )}
        {/* {this.state.error ? <SnackbarError /> : null} */}

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

// export default withSnackbar(LinearCoupled);
export default LinearCoupled;
