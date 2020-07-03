import React, { Component } from "react";

import EqnItems from "../../../components/Calculations/Method/Eqns/EqnItems";
import { evaluate } from "mathjs";
import MyButton from "../../../components/UI/Button/GenericButton";
import classes from "./LinearCoupled.module.css";
import MyErrorMessage from "../../../components/UI/MyErrorMessage/MyErrorMessage";
import SettingButton from "../../../components/UI/Button/SettingButton";
import GraphConfig from "../../../components/UI/GraphConfig/GraphConfig";
import LinearCoupledDiffEqns from "../../../components/Calculations/Method/LinearCoupled/Calcs/LinearCoupledDiffEqns";
import { Paper, Tooltip, IconButton } from "@material-ui/core";
import AddButton from "../../../components/UI/Button/AddButton";
import LinearCoupledButtonContainer from "../../../components/UI/ButtonContainer/LinearCoupledButtonContainer";
import Draggable from "react-draggable";
import ResizeableWrapper from "../../../components/UI/ResizableWrapper/ResizableWrapper";
import SettingsIcon from "@material-ui/icons/Settings";
import DraggableWrapper from "../../../components/UI/DraggableWrapper/DraggableWrapper";

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
  };

  defaultEqns = [
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
  ];

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

  renderGraph = () => {
    let eqns = [];
    this.state.Eqns.forEach((eqn) => {
      eqns.push(eqn.TextEqn);
    });

    let LineNames = [];
    this.state.Eqns.forEach((eqn) => {
      LineNames.push(eqn.line);
    });
    return (
      <Paper elevation={3}>
        <LinearCoupledDiffEqns
          h={0.05}
          numberOfCycles={30}
          eqns={eqns}
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
        removeEqn={this.removeEqn}
        handleMathQuillInputChange={this.handleMathQuillInputChange}
      />
    );

    return (
      <div className={classes.Container}>
        <Draggable
          position={this.props.eqnEditorPos}
          onStop={(e, data) => this.props.onStop(e, data, "eqnEditorPos")}
          nodeRef={this.props.nodeRef}
          enableUserSelectHack={false}
        >
          <Paper ref={this.props.nodeRef} elevation={3}>
            <div className={classes.Eqns}>
              <LinearCoupledButtonContainer
                calculate={this.state.calculate}
                Eqns={this.state.Eqns}
                onIncrementEqn={this.onIncrementEqn}
                resetForm={this.resetForm}
                handleMathQuillInputSubmit={this.handleMathQuillInputSubmit}
              />
              <Paper elevation={3}>
                <div className={classes.delete}  >{Eqns}</div>
              </Paper>
            </div>
          </Paper>
        </Draggable>
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
