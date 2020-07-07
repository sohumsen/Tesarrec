import React, { Component } from "react";

import EqnItems from "../../../components/Calculations/Method/Eqns/EqnItems";
import VarItems from "../../../components/Calculations/Method/Eqns/VarItems";
import { evaluate } from "mathjs";
import MyButton from "../../../components/UI/Button/GenericButton";
import classes from "./LinearCoupled.module.css";
import MyErrorMessage from "../../../components/UI/MyErrorMessage/MyErrorMessage";
import SettingButton from "../../../components/UI/Button/SettingButton";
import GraphConfig from "../../../components/UI/GraphConfig/GraphConfig";
import LinearCoupledDiffEqns from "../../../components/Calculations/Method/LinearCoupled/Calcs/LinearCoupledDiffEqns";
import { Paper, Tooltip, IconButton } from "@material-ui/core";
import AddButton from "../../../components/UI/Button/AddButton";
import LinearCoupledButtonEqnsContainer from "../../../components/UI/ButtonContainer/LinearCoupledButtonEqnsContainer";
import Draggable from "react-draggable";
import ResizeableWrapper from "../../../components/UI/ResizableWrapper/ResizableWrapper";
import SettingsIcon from "@material-ui/icons/Settings";
import DraggableWrapper from "../../../components/UI/DraggableWrapper/DraggableWrapper";
import DEFAULTEQNS from '../DefaultStates/DefaultEqns';
import DEFAULTVARS from "../DefaultStates/DefaultVars";
import LinearCoupledButtonVariablesContainer from "../../../components/UI/ButtonContainer/LinearCoupledButtonVariablesContainer";

class LinearCoupled extends Component {
  /**
   * Visual Component that contains the textbox for the equation and calculation outputs
   * plus some equation labels
   *
   */

  //y1=a, y2=b,y3=c
  state = {
    calculate: false,
    modelId: "",

    graphConfig: {
      show: false,
      submitted: true,
      LegendHorizontal: "left",
      LegendVertical: "top",
      DecimalPrecision: 2,
      initialConditions: [0.5, 0.5, 0.5, 0.5, 0.5],
      xAxis: "t", //x,y,
      yAxis: "a",
    },

    Eqns: [],
    Vars: [],
  };

  defaultEqns = DEFAULTEQNS;
  defaultVars = DEFAULTVARS;

  componentDidMount() {
    this.setState({ Vars: this.defaultVars });
  }
  static getDerivedStateFromProps(props, state) {
    if (props.modelId !== state.modelId) {
      //NEW MODEL
      return {
        calculate: props.calculate,
        modelId: props.modelId,
        Eqns: props.Eqns,
      };
    }

    return null;
  }
  componentDidUpdate() {
    if (this.state.Eqns !== this.props.Eqns) {
      this.props.sendToParent(this.state.Eqns);
    }
  }
  validateExpression = (expr, line) => {
    let lineNames = { t: 1 };

    this.state.Eqns.forEach((Eqn) => {
      lineNames[Eqn.line] = 1;
    });
    this.state.Vars.forEach((Var) => {
      lineNames[Var.LatexForm] = 1;
    });
    try {
      evaluate(expr, lineNames);
      return true;
    } catch (error) {
      return false;
    }
  };

  handleMathQuillInputChange = (id, itemType) => (mathField) => {
    let items = this.state[itemType];

    const idx = items.findIndex((e) => {
      return e.id === id;
    });

    const item = {
      ...items[idx],
    };
    if (itemType === "Eqns") {
      //Parse mathField.latex() and only allow ur vars
      //replace mathField.latex() with another version which is the VarRange
      item.TextEqn = mathField.text();
      item.LatexEqn = mathField.latex();
    } else {
      item.LatexForm = mathField.latex();
    }

    const deepItems = [...this.state[itemType]];
    deepItems[idx] = item;

    this.setState({ [itemType]: deepItems, calculate: false });
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

  handleVariableInputChange = (id) => (event) => {
    let items = this.state.Vars;

    const idx = items.findIndex((e) => {
      return e.id === id;
    });

    const item = {
      ...items[idx],
    };
    if (event.target.value !== "") {
      item[event.target.name] = parseFloat(event.target.value);
    } else {
      item[event.target.name] = "";
    }
    const deepItems = [...this.state.Vars];
    deepItems[idx] = item;

    this.setState({ Vars: deepItems, calculate: false });
  };
  setErrorMessage = (i, errorMessage) => {
    let Eqn = {
      ...this.state.Eqns[i],
    };
    Eqn.errorMessage = errorMessage;
    return Eqn;
  };

  removeItem = (id, itemType) => {
    this.setState((prevState) => {
      let newGraphConfig = null;
      if (itemType === "Eqns") {
        // Line up the initial Condition corresponding to the vars
        let newGraphConfig = { ...prevState.graphConfig };
        let newInitialConditions = [...newGraphConfig.initialConditions];
        newInitialConditions.pop();
        newGraphConfig["initialConditions"] = newInitialConditions;
        return {
          calculate: false,
          graphConfig: newGraphConfig,
          Eqns: prevState[itemType].filter((element) => {
            return element.id !== id;
          }),
        };
      } else {
        return {
          calculate: false,
          Vars: prevState[itemType].filter((element) => {
            return element.id !== id;
          }),
        };
      }
    });
  };

  resetForm = () => {
    this.props.sendToParent(this.defaultEqns);

    this.setState({
      calculate: false,
      modelId: "",

      graphConfig: {
        show: false,
        submitted: true,
        LegendHorizontal: "left",
        LegendVertical: "top",
        DecimalPrecision: 2,
        initialConditions: [0.5, 0.5, 0.5, 0.5, 0.5],
        xAxis: "t", //x,y,
        yAxis: "a",
      },

      Vars:this.defaultVars
    });
  };
  nextPossibleEqn = (prevState) => {
    let Eqns = this.defaultEqns;

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

  onGraphConfigOpen = () => {
    let graphConfig = { ...this.state.graphConfig };
    graphConfig.show = !this.state.graphConfig.show;
    graphConfig.submitted = true;

    this.setState({ graphConfig: graphConfig });
  };
  onGraphConfigClose = () => {
    let graphConfig = { ...this.state.graphConfig };
    graphConfig.show = !this.state.graphConfig.show;
    graphConfig.submitted = true;

    this.setState({ graphConfig: graphConfig, calculate: true });
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
      graphConfig.initialConditions = newInitialConditions;
      graphConfig.submitted = true;
    } else {
      graphConfig.submitted = false;
    }

    this.setState({ graphConfig: graphConfig });
  };

  sliderHandleChange = (name, id) => (event, value) => {

    let items = this.state.Vars;

    const idx = items.findIndex((e) => {
      return e.id === id;
    });

    const item = {
      ...items[idx],
    };
    item[name] = value;

    const deepItems = [...this.state.Vars];
    deepItems[idx] = item;

    this.setState({ Vars: deepItems });
  };

  sliderTextHandleChange = (name, id) => (event) => {
    let { value, min, max } = event.target;
    console.log(value,min,max)

    if (value !== "") {
      value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    }

    let items = this.state.Vars;

    const idx = items.findIndex((e) => {
      return e.id === id;
    });

    const item = {
      ...items[idx],
    };
    item[name] = value;

    const deepItems = [...this.state.Vars];
    deepItems[idx] = item;

    this.setState({ Vars: deepItems });
  };
  nextPossibleVariable = (prevState, type) => {
    let typeArr = prevState.Vars.filter((Var) => {
      return Var.VarType === type;
    });
    let letter = "";
    if (type === "Constant") {
      letter = "K";
    }
    if (type === "Dependent") {
      letter = "Y";
    }
    if (type === "Independent") {
      letter = "X";
    }
    let numbers = [];

    for (let i = 1; i < 15; i++) {
      numbers.push(i.toString());
    }
    for (let i = 0; i < typeArr.length; i++) {
      const obj = typeArr[i];

      const index = numbers.indexOf(obj.LatexForm[obj.LatexForm.length - 1]);

      numbers.splice(index, 1);
    }

    let VariableObj = {
      id: type + numbers[0],
      LatexForm: letter + "_" + numbers[0],
      errorMessage: null,
      VarType: type,
      VarLow: 0,
      VarCurrent: 50,
      VarHigh: 100,
    };
    if (type !== "Constant") {
      VariableObj.Unit = "cm";
    }

    return VariableObj;
  };
  onIncrementVariable = (type) => {
    this.setState((prevState) => {
      return {
        Vars: prevState.Vars.concat(this.nextPossibleVariable(prevState, type)),
        calculate: false,
      };
    });
  };

  renderGraph = () => {
    let eqns = [];
    this.state.Eqns.forEach((eqn) => {
      eqns.push(eqn.TextEqn);
    });

    let LineNames = [];
    this.state.Eqns.forEach((eqn) => {
      LineNames.push(eqn.line);
    });

    let VarObj = {};

    this.state.Vars.forEach((VarElement) => {
      VarObj[VarElement.LatexForm] = VarElement.VarCurrent;
    });
    return (
      <Paper elevation={3}>
        <LinearCoupledDiffEqns
          h={0.05}
          numberOfCycles={30}
          eqns={eqns}
          vars={VarObj} // { K_1=0.27}
          LineNames={LineNames}
          axis={[this.state.graphConfig.xAxis, this.state.graphConfig.yAxis]}
          initialConditions={this.state.graphConfig.initialConditions} //includes t
          LegendVertical={this.state.graphConfig.LegendVertical}
          LegendHorizontal={this.state.graphConfig.LegendHorizontal}
          DecimalPrecision={this.state.graphConfig.DecimalPrecision}
        />
      </Paper>
    );
  };

  render() {
    let Eqns = (
      <EqnItems
        Eqns={this.state.Eqns}
        removeItem={this.removeItem}
        handleMathQuillInputChange={this.handleMathQuillInputChange}
      />
    );

    let Vars = (
      <VarItems
        Vars={this.state.Vars}
        handleVariableInputChange={this.handleVariableInputChange}
        removeItem={this.removeItem}
        handleMathQuillInputChange={this.handleMathQuillInputChange}
        SliderHandleChange={this.sliderHandleChange}
        SliderTextHandleChange={this.sliderTextHandleChange}
      />
    );

    return (
      <div className={classes.Container}>
        <Paper ref={this.props.nodeRef} elevation={3}>
          <div className={classes.EqnContainer}>
            <LinearCoupledButtonEqnsContainer
              Eqns={this.state.Eqns}
              onIncrementEqn={this.onIncrementEqn}
              resetForm={this.resetForm}
              handleMathQuillInputSubmit={this.handleMathQuillInputSubmit}
            />

            <Paper elevation={3}>
              <div className={classes.singleItem}>{Eqns}</div>
            </Paper>
            <div className={classes.VarContainer}>
            <LinearCoupledButtonVariablesContainer
              calculate={this.state.calculate}
              onIncrementVariable={this.onIncrementVariable}
              resetForm={this.resetForm}
            />

            <Paper elevation={3}>
              <div className={classes.Vars}>{Vars}</div>
            </Paper>
          </div>
          </div>
          
        </Paper>

        <Paper ref={this.props.nodeRef} elevation={3}>
          
        </Paper>

        <Draggable
          nodeRef={this.props.nodeRef}
          position={this.props.graphPos}
          onStop={(e, data) => this.props.onStop(e, data, "graphPos")}
        >
          <div ref={this.props.nodeRef} className={classes.Graph}>
            {this.state.calculate ? (
              <Tooltip title="Config Equations" placement="top" arrow>
                <span>
                  <IconButton
                    disabled={!this.state.calculate}
                    edge="end"
                    aria-label="config"
                    onClick={this.onGraphConfigOpen}
                  >
                    <SettingsIcon />
                  </IconButton>
                </span>
              </Tooltip>
            ) : null}
            {this.state.calculate && this.state.graphConfig.submitted
              ? this.renderGraph()
              : null}
          </div>
        </Draggable>
        {this.state.graphConfig.show && this.state.calculate ? (
          <div className={classes.graphConfig}>
            <GraphConfig
              configPos={this.props.configPos}
              onStop={this.props.onStop}
              errorMessage={!this.state.graphConfig.submitted}
              LegendHorizontal={this.state.graphConfig.LegendHorizontal}
              LegendVertical={this.state.graphConfig.LegendVertical}
              DecimalPrecision={this.state.graphConfig.DecimalPrecision}
              initialConditions={this.state.graphConfig.initialConditions}
              xAxis={this.state.graphConfig.xAxis}
              yAxis={this.state.graphConfig.yAxis}
              Eqns={this.state.Eqns}
              onClose={this.onGraphConfigClose}
              onChange={(val) => this.onGraphConfigChange(val)}
              onSubmit={this.onGraphConfigSubmit}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default LinearCoupled;
