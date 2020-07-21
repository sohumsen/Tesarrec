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
import { Paper } from "@material-ui/core";
import LinearCoupledButtonEqnsContainer from "../../../components/UI/ButtonContainer/LinearCoupledButtonEqnsContainer";

import DEFAULTEQNS from "../DefaultStates/DefaultEqns";
import DEFAULTVARS from "../DefaultStates/DefaultVars";
import LinearCoupledButtonVariablesContainer from "../../../components/UI/ButtonContainer/LinearCoupledButtonVariablesContainer";
import LinearCoupledButtonGraphContainer from "../../../components/UI/ButtonContainer/LinearCoupledButtonGraphContainer";
import DEFAULTLAYOUT from "../DefaultStates/DefaultLayout";
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

    myReactGridLayout: [],
  };

  defaultEqns = DEFAULTEQNS;
  defaultVars = DEFAULTVARS;

  static getDerivedStateFromProps(props, state) {
    if (props.modelId !== state.modelId) {
      //NEW MODEL

      let graphConfig = { ...state.graphConfig };
      let arr = [];
      for (let i = 0; i <= props.Eqns.length; i++) {
        //generates array of a,b,t 0.5 initial conditions
        arr.push(0.5);
      }

      graphConfig.initialConditions = arr;
      return {
        calculate: props.calculate,
        modelId: props.modelId,
        Eqns: props.Eqns,
        Vars: props.Vars,
        myReactGridLayout: DEFAULTLAYOUT(props),
        graphConfig: graphConfig,
      };
    }

    return null;
  }
  componentDidMount(){
    this.setState({myReactGridLayout:DEFAULTLAYOUT(this.state)})
  }

  componentDidUpdate() {
    if (
      this.state.Eqns !== this.props.Eqns ||
      this.state.Vars !== this.props.Vars
    ) {
      this.props.sendToParent(this.state.Eqns, this.state.Vars);
      this.setState({
        myReactGridLayout: DEFAULTLAYOUT(this.state),
      });
    }
  }
  validateExpression = (expr, line) => {
    let lineNames = { t: 1 };
    // console.log(this.state.Eqns);
    this.state.Eqns.forEach((Eqn) => {
      lineNames[Eqn.line] = 1;
    });
    this.state.Vars.forEach((Var) => {
      lineNames[Var.LatexForm] = 1;
    });
    // console.log(expr, lineNames);
    // console.log(typeof(expr))

    //console.log(evaluate(expr, lineNames));
    // console.log(
    //   evaluate("b+1", {
    //     t: 1,
    //     a: 1,
    //     Y_1: 1,
    //     Y_2: 1,
    //   })
    // );

    try {
      evaluate(expr, lineNames);
      // console.log("valid");
      return true;
    } catch (error) {
      // console.log("invalid");

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
      //console.log(mathField);
      //mathField.select();
    } else {
      item.LatexForm = mathField.latex();
      items[idx] = item;

      var valueArr = items.map(function (item) {
        return item.LatexForm;
      });

      for (let i = 0; i < valueArr.length; i++) {
        const latex = valueArr[i];
        if (valueArr.indexOf(latex) === i) {
          items.forEach((item) => (item.errorMessage = null));
        }
      }
      var isDuplicate = valueArr.some(function (item, idx) {
        //console.log(item,idx)
        return valueArr.indexOf(item) !== idx;
      });

      if (isDuplicate) {
        item.errorMessage = "doesnt work";
      } else {
        item.errorMessage = null;
      }
    }

    items[idx] = item;
    this.setState({ [itemType]: items, calculate: false });
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
    const deepItems = [...this.state.Eqns];

    for (let i = 0; i < newEqns.length; i++) {
      const eqn = { ...newEqns[i] };
      eqn.ParsedEqn = simplify(parse(eqn.TextEqn));

      deepItems[i] = eqn;
    }
    this.setState({ Eqns: deepItems });

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
    // console.log(event.target.name, event.target.value);

    item[event.target.name] = event.target.value;

    const deepItems = [...this.state.Vars];
    deepItems[idx] = item;

    this.setState({ Vars: deepItems, calculate: false });
  };

  sliderHandleChange = (name, id) => (event, value) => {
    // console.log("jdkfskd");
    let items = this.state.Vars;

    const idx = items.findIndex((e) => {
      return e.id === id;
    });

    const item = {
      ...items[idx],
    };
    item[name] = value;
    console.log(value);

    const deepItems = [...this.state.Vars];
    deepItems[idx] = item;

    this.setState({ Vars: deepItems });
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
  resetVars = () => {
    this.props.sendToParent(this.state.Eqns, this.defaultVars);

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
  resetEqns = () => {
    this.props.sendToParent(this.defaultEqns, this.state.Vars);

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
    // console.log(numbers, numbers[0]);
    let VariableObj = {
      id: type + numbers[0] + new Date().getTime(),
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
  onLayoutChange = (layout) => {
    this.setState({ myReactGridLayout: layout });
  };
  onResetLayout = () => {
    this.setState({
      myReactGridLayout: DEFAULTLAYOUT(this.state),
    });
  };

  renderGraph = () => {
    let eqns = [];

    this.state.Eqns.forEach((eqn) => {
      eqns.push(eqn.ParsedEqn);
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
      <Paper elevation={3} key="Graph">
        <LinearCoupledDiffEquationGrapher
          h={0.5}
          numberOfCycles={30}
          eqns={eqns} //send in parsed eqns
          vars={VarObj} // { K_1=0.27}
          LineNames={LineNames}
          t0={0}
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
        //onDoubleClickMathQuill={this.onDoubleClickMathQuill}
      />
    );

    let Vars = (
      <VarItems
        Vars={this.state.Vars}
        handleVariableInputChange={this.handleVariableInputChange}
        removeItem={this.removeItem}
        handleMathQuillInputChange={this.handleMathQuillInputChange}
        SliderHandleChange={this.sliderHandleChange}
      />
    );

    return (
      <GridLayout
        className={classes.Container}
        layout={this.state.myReactGridLayout}
        cols={12}
        rowHeight={30}
        width={1300}
        style={{ position: "relative" }}
        autoSize
        onLayoutChange={(layout, layouts) =>
          this.onLayoutChange(layout, layouts)
        }
      >
        <Paper key="Eqns" className={classes.EqnContainer} elevation={3}>
          <LinearCoupledButtonEqnsContainer
            Eqns={this.state.Eqns}
            onIncrementEqn={this.onIncrementEqn}
            resetForm={this.resetEqns}
            handleMathQuillInputSubmit={this.handleMathQuillInputSubmit}
            onResetLayout={this.onResetLayout}
          />

          {Eqns}
        </Paper>

        <Paper key="Vars" className={classes.VarContainer} elevation={3}>
          <LinearCoupledButtonVariablesContainer
            Vars={this.state.Vars}
            onIncrementVariable={this.onIncrementVariable}
            resetForm={this.resetVars}
          />
          <Paper onMouseDown={(e) => e.stopPropagation()}>{Vars}</Paper>
        </Paper>

        {this.state.calculate ? (
          <div key="GraphButtons" className={classes.Graph}>
            <LinearCoupledButtonGraphContainer
              calculate={this.state.calculate}
              onGraphConfigOpen={this.onGraphConfigOpen}
              onGraphClose={() => {
                this.setState({ calculate: false });
              }}
            />
          </div>
        ) : (
          <div />
        )}

        {this.state.calculate && this.state.graphConfig.submitted ? (
          this.renderGraph()
        ) : (
          <div />
        )}

        {this.state.graphConfig.show && this.state.calculate ? (
          <div key="GraphConfig" className={classes.graphConfig}>
            <GraphConfig
              configPos={this.props.configPos}
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
        ) : (
          <div />
        )}
      </GridLayout>
    );
  }
}

export default LinearCoupled;
