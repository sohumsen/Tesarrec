import React, { Component } from "react";
import GridLayout from "react-grid-layout";
import "../../../../node_modules/react-grid-layout/css/styles.css";

import EqnItems from "../../../components/UI/Eqns/EqnItems";
import VarItems from "../../../components/UI/Vars/VarItems";
import { evaluate, simplify, parse } from "mathjs";
import classes from "./LinearCoupled.module.css";
import MyErrorMessage from "../../../components/UI/MyErrorMessage/CustomizedErrorMessage";
import GraphConfig from "../../../components/UI/GraphConfig/GraphConfig";
import LinearCoupledDiffEquationGrapher from "../../../components/Calculations/Dynamic/LinearCoupled/LinearCoupledDiffEquationGrapher";
import { Paper, Modal, TextField } from "@material-ui/core";
import LinearCoupledButtonEqnsContainer from "../../../components/UI/ButtonContainer/LinearCoupledButtonEqnsContainer";
import DEFAULTEQUATIONSNEW from "../../../components/Calculations/Dynamic/SampleEquations/DEFAULTEQUATIONSnew";

import DEFAULTEQUATIONS from "../../../components/Calculations/Dynamic/SampleEquations/DEFAULTEQUATIONS";
import DEFAULTVARS from "../../../components/Calculations/Dynamic/SampleEquations/DEFAULTVARS";
import LinearCoupledButtonVariablesContainer from "../../../components/UI/ButtonContainer/LinearCoupledButtonVariablesContainer";
import LinearCoupledButtonGraphContainer from "../../../components/UI/ButtonContainer/LinearCoupledButtonGraphContainer";
import DEFAULTLAYOUT from "./DefaultLayout";
import DEFAULTGRAPHCONFIG from "./DefaultGraphConfignew";
import Model from "../../../components/Calculations/Dynamic/SampleEquations/Model";

import MyMathQuill from "../../../components/UI/Math/MyMathQuill";
class LinearCoupledNew extends Component {
  /**
   * Visual Component that contains the textbox for the equation and calculation outputs
   * plus some equation labels
   *
   */

  //y1=a, y2=b,y3=c

  state = {
    modelId: "",
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
      };
    }

    return null;
  }

  componentDidUpdate() {
    if (this.props.saveSnapshot) {
      console.log(this.state.modelObj);
      this.props.sendToParent(this.state.modelObj);
    }
  }

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
      if (!(item.errorMessage === "Err")) {
        console.log("its valid, make the change");
        let Eqns = [...this.state.modelObj.Eqns];
        let eqnObj=Eqns.find(eqn=>eqn.lineName===this.state.modelObj.Vars[idx].LatexForm)
        eqnObj.DByDLatex=2
        for (let i = 0; i < Eqns.length; i++) {
          // console.log(this.state.modelObj.Vars[idx].LatexForm,mathField.latex(),Eqns[i].textEqn)
          console.log(mathField.latex(), mathField.text());
          let textEqn = Eqns[i].textEqn
            .split(this.state.modelObj.Vars[idx].LatexForm) //find
            .join(mathField.text()); //replace
          // let txt2 = this.state.modelObj.Vars[idx].LatexForm.slice(0, 1) + "\\" + this.state.modelObj.Vars[idx].LatexForm.slice(1);
          // let txt3 = mathField.latex().slice(0, 1) + "\\" + mathField.latex().slice(1);

          // console.log(txt2)
          // let latexEqn = Eqns[i].latexEqn
          //   .split(txt2)
          //   .join(txt3);


          console.log(textEqn);
          Eqns[i].latexEqn = parse(
            parse(textEqn).toString({
              implicit: "hide",
              parenthesis: "auto",
            })
            // \frac{dY_1}{dx}=
          ).toTex({
            parenthesis: "auto",
            implicit: "hide",
          });
          // Eqns[i].textEqn = textEqn;
        }

        console.log(Eqns);
      }
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
      // let newEqns2 = this.EQNS_insertDifferential(newEqns);
      let newEqns2 = this.state.modelObj.insertDifferentialIntoText(newEqns);

      if (newEqns.some((eqn) => eqn.errorMessage !== null)) {
        //invalid
        aModel.Config.calculate = false;
        aModel.Eqns = newEqns2;
      } else {
        aModel.Config.calculate = true;
        aModel.Eqns = newEqns2;
      }
    } else {
      aModel.Config.calculate = false;
    }

    let yAxis = this.state.modelObj.Config.yAxis;

    if (!this.state.modelObj.Config.lineNames.includes(yAxis)) {
      yAxis = this.state.modelObj.Config.lineNames[0];
    }
    // aModel.Eqns = newEqns;

    aModel.Config.yAxis = yAxis;

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

      let lineNames = Eqns.map((eqn) => eqn.lineName);
      let initialConditions = this.state.modelObj.Config.initialConditions.filter(
        (_, i) => {
          return i !== idx;
        }
      );
      Config.lineNames = lineNames;
      Config.initialConditions = initialConditions;
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
    // console.log(
    //   id,
    //   calculate,
    //   value,
    //   event.target.name,
    //   event.target.value,
    //   isNaN(event.target.value)
    // );

    const idx = Vars.findIndex((e) => {
      return e.id === id;
    });

    const Var = Vars[idx];
    if (event.target.name === undefined) {
      Var["VarCurrent"] = value;
    } else {
      isNaN(event.target.value)
        ? (Var[event.target.name] = +event.target.value)
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
    let EqnObj = {
      id: results[0].lineName,
      lineName: results[0].lineName,
      DByDLatex: "\\frac{d" + results[0].lineName + "}{dt}=",
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
    modelObj.Eqns = modelObj.Eqns.concat(this.EQNS_nextPossible(this.state));
    modelObj.Vars = modelObj.Vars.concat(
      this.VARS_nextPossible(this.state, "Dependent")
    );

    modelObj.Config.initialConditions.push(0.5);
    modelObj.Config.lineNames = modelObj.Eqns.map((eqn) => eqn.lineName);
    this.setState({
      modelObj: modelObj,
    });
  };

  GRAPHCONFIG_onToggleView = () => {
    let modelObj = this.state.modelObj;
    modelObj.Config.show = !this.state.modelObj.Config.show;
    modelObj.Config.submitted = true;

    this.setState({
      modelObj: modelObj,
    });
  };

  GRAPHCONFIG_onChange = (name) => (event, value) => {
    let modelObj = this.state.modelObj;
    if (name.includes("initialConditions")) {
      let idx = name[name.length - 1];
      modelObj.Config.initialConditions[idx] = event.target.value;
    } else {
      modelObj.Config[name] = event.target.value;
    }

    modelObj.Config.submitted = false;

    this.setState({ modelObj: modelObj });
  };
  GRAPHCONFIG_onSubmit = () => {
    let modelObj = this.state.modelObj;

    let newInitialConditions = modelObj.Config.initialConditions.map(Number);
    if (newInitialConditions.length === this.state.modelObj.Eqns.length) {
      modelObj.Config.initialConditions = newInitialConditions;
      modelObj.Config.submitted = true;
    } else {
      modelObj.Config.submitted = false;
    }
    modelObj.Config.show = false;

    this.setState({ modelObj: modelObj });
  };

  GRAPH_render = () => {
    let vars = {};

    this.state.modelObj.Vars.forEach((VarElement) => {
      vars[VarElement.LatexForm] = VarElement.VarCurrent;
    });
    return (
      <div key="Graph">
        <LinearCoupledDiffEquationGrapher
          computedResults={this.state.modelObj.solveDiffEqns()}
          modelObj={this.state.modelObj}
        />
      </div>
    );
  };

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.Column}>
          <Paper key="Eqns" className={classes.EqnContainer} elevation={3}>
            <LinearCoupledButtonEqnsContainer
              Eqns={this.state.modelObj.Eqns}
              onIncrementEqn={this.EQNS_onIncrement}
              resetForm={() => this.ITEMS_reset("eqns")}
              handleMathQuillInputSubmit={this.MATHQUILL_handleInputSubmit}
            />
            <EqnItems
              Eqns={this.state.modelObj.Eqns}
              removeItem={this.ITEMS_remove}
              handleMathQuillInputChange={this.MATHQUILL_handleInputChange}
            />
          </Paper>

          <Paper key="meta" className={classes.MetaContainer} elevation={3}>
            <TextField
              id="outlined-multiline-static"
              label="Model description"
              multiline
              rows={4}
              defaultValue="Open a model to view descriptions"
              value={this.state.modelObj.meta.description || ""}
              onChange={(e) => {
                let modelObj = this.state.modelObj;
                modelObj.Config.calculate = false;

                modelObj.meta.description = e.target.value;
                this.setState({ modelObj: modelObj });
              }}
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{ style: { fontSize: 12 } }} // font size of input text
            />
          </Paper>
        </div>

        <Paper key="Vars" className={classes.VarContainer} elevation={3}>
          <LinearCoupledButtonVariablesContainer
            Vars={this.state.modelObj.Vars}
            onIncrementVariable={this.VARS_onIncrement}
            resetForm={() => this.ITEMS_reset("vars")}
          />
          <Paper onMouseDown={(e) => e.stopPropagation()}>
            <VarItems
              Vars={this.state.modelObj.Vars}
              handleVariableInputChange={this.VARS_handleInputChange}
              removeItem={this.ITEMS_remove}
              handleMathQuillInputChange={this.MATHQUILL_handleInputChange}
            />
          </Paper>
        </Paper>

        {this.state.modelObj.Config.calculate ? (
          <div key="GraphButtons" className={classes.Graph}>
            <LinearCoupledButtonGraphContainer
              calculate={this.state.modelObj.Config.calculate}
              onGraphConfigOpen={this.GRAPHCONFIG_onToggleView}
              onGraphClose={() => {
                let modelObj = { ...this.state.modelObj };
                modelObj.Config.calculate = false;
                this.setState({ modelObj: modelObj });
              }}
            />
            {this.state.modelObj.Config.submitted ? this.GRAPH_render() : null}
          </div>
        ) : (
          <div className={classes.Graph} key="GraphButtons" />
        )}

        <Modal
          open={this.state.modelObj.Config.show}
          onClose={this.GRAPHCONFIG_onToggleView}
        >
          <div key="GraphConfig" className={classes.graphConfig}>
            <GraphConfig
              configPos={this.props.configPos}
              Vars={this.state.modelObj.Vars}
              errorMessage={!this.state.modelObj.Config.submitted}
              LegendHorizontal={this.state.modelObj.Config.LegendHorizontal}
              LegendVertical={this.state.modelObj.Config.LegendVertical}
              DecimalPrecision={this.state.modelObj.Config.DecimalPrecision}
              initialConditions={this.state.modelObj.Config.initialConditions}
              lineNames={this.state.modelObj.Config.lineNames}
              xAxis={this.state.modelObj.Config.xAxis}
              yAxis={this.state.modelObj.Config.yAxis}
              method={this.state.modelObj.Config.method}
              t0={this.state.modelObj.Config.t0}
              h={this.state.modelObj.Config.h}
              Eqns={this.state.modelObj.Eqns}
              onClose={this.GRAPHCONFIG_onToggleView}
              onChange={(val) => this.GRAPHCONFIG_onChange(val)}
              onSubmit={this.GRAPHCONFIG_onSubmit}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default LinearCoupledNew;
