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

import DEFAULTEQUATIONS from "../../../components/Calculations/Dynamic/SampleEquations/DEFAULTEQUATIONS";
import DEFAULTVARS from "../../../components/Calculations/Dynamic/SampleEquations/DEFAULTVARS";
import LinearCoupledButtonVariablesContainer from "../../../components/UI/ButtonContainer/LinearCoupledButtonVariablesContainer";
import LinearCoupledButtonGraphContainer from "../../../components/UI/ButtonContainer/LinearCoupledButtonGraphContainer";
import DEFAULTLAYOUT from "./DefaultLayout";
import DEFAULTGRAPHCONFIG from "./DefaultGraphConfig";
import Model from "../../../components/Calculations/Dynamic/SampleEquations/Model";
import MyMathQuill from "../../../components/UI/Math/MyMathQuill";
import ModelWrapper from "../../../components/Calculations/Dynamic/SampleEquations/ModelWrapper";
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
    model: null,

    graphConfig: DEFAULTGRAPHCONFIG,

    Eqns: [],
    Vars: [],

    myReactGridLayout: [],
  };

  defaultEqns = DEFAULTEQUATIONS;
  defaultVars = DEFAULTVARS;

  static getDerivedStateFromProps(props, state) {
    if (props.modelId !== state.modelId) {
      //NEW MODEL

      let graphConfig = { ...state.graphConfig };
      let arr = [];
      for (let i = 0; i < props.Eqns.length; i++) {
        //generates array of a,b,t 0.5 initial conditions
        arr.push(0.5);
      }
      graphConfig.initialConditions = arr;

      let eqnsText = props.Eqns.map((eqn) => {
        return eqn.TextEqn;
      });
      // let eqnsParsed = props.Eqns.map((eqn) => {
      //   console.log(eqn)
      //   return eqn.ParsedEqn;
      // });

      let lineNames = props.Eqns.map((eqn) => {
        return eqn.line;
      });

      let vars = {};

      props.Vars.forEach((VarElement) => {
        vars[VarElement.LatexForm] = VarElement.VarCurrent;
      });
      let newModel = new Model(
        {
          vars: vars,
          eqns: eqnsText,
          t0: graphConfig.t0,
          h: graphConfig.h,
          numOfCycles: 30,
          initialConditions: graphConfig.initialConditions,
          lineNames: lineNames,
          method: graphConfig.method,
        },
        {
          modelId: props.modelId,
          calculate: props.calculate,
        }
      );

      for (let i = 0; i < props.Eqns.length; i++) {
        props.Eqns[i].LatexEqn = newModel.eqns.latexEqns[i];
      }

      return {
        calculate: props.calculate,
        modelId: props.modelId,
        Eqns: props.Eqns,
        Vars: props.Vars,
        myReactGridLayout: DEFAULTLAYOUT(props),
        graphConfig: graphConfig,
        Model: newModel,
      };
    }

    return null;
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

  MODEL_transformStateToModelObj = () => {
    let eqnsText = this.state.Eqns.map((eqn) => {
      return eqn.TextEqn;
    });
    let eqnsParsed = this.state.Eqns.map((eqn) => {
      return eqn.ParsedEqn;
    });

    let lineNames = this.state.Eqns.map((eqn) => {
      return eqn.line;
    });

    let vars = {};

    this.state.Vars.forEach((VarElement) => {
      vars[VarElement.LatexForm] = VarElement.VarCurrent;
    });
    let t0 = performance.now();
    let newModel = new Model(
      {
        vars: vars,
        eqns: eqnsText,
        parsedEqns: eqnsParsed,
        t0: this.state.graphConfig.t0,
        h: this.state.graphConfig.h,
        numOfCycles: 30,
        initialConditions: this.state.graphConfig.initialConditions,
        lineNames: lineNames,
      },
      this.state.graphConfig.method
    );
    let t1 = performance.now();
    // console.log(t1 - t0);

    return newModel;
  };

  MATHQUILL_handleInputChange = (id, itemType) => (mathField) => {
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
  MATHQUILL_handleInputSubmit = (event) => {
    let valid = [];
    event.preventDefault();

    this.state.Eqns.forEach((elementObj) => {
      if (this.EQNS_validateExpression(elementObj.TextEqn, elementObj.line)) {
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
        newEqns.push(this.ITEMS_setErrorMessage(i, <MyErrorMessage />));
      } else {
        newEqns.push(this.ITEMS_setErrorMessage(i, null));
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

  ITEMS_setErrorMessage = (i, errorMessage) => {
    let Eqn = {
      ...this.state.Eqns[i],
    };
    Eqn.errorMessage = errorMessage;
    return Eqn;
  };
  ITEMS_remove = (id, itemType) => {
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

  VARS_reset = () => {
    this.props.sendToParent(this.state.Eqns, this.defaultVars);

    this.setState({
      calculate: false,
      modelId: "",

      graphConfig: DEFAULTGRAPHCONFIG,
    });
  };
  VARS_handleInputChange = (id, calculate) => (event, value) => {
    let items = this.state.Vars;

    const idx = items.findIndex((e) => {
      return e.id === id;
    });

    const item = {
      ...items[idx],
    };
    if (event.target.name === undefined) {
      item["VarCurrent"] = value;
    } else {
      item[event.target.name] = event.target.value;
    }

    const deepItems = [...this.state.Vars];
    deepItems[idx] = item;
    console.log(
      id,
      calculate,
      deepItems,
      event.target.name,
      event.target.value
    );
    calculate
      ? this.setState({ Vars: deepItems })
      : this.setState({ Vars: deepItems, calculate: false });
  };

  VARS_nextPossible = (prevState, type) => {
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
  VARS_onIncrement = (type) => {
    this.setState((prevState) => {
      return {
        Vars: prevState.Vars.concat(this.VARS_nextPossible(prevState, type)),
        calculate: false,
      };
    });
  };

  EQNS_reset = () => {
    this.props.sendToParent(this.defaultEqns, this.state.Vars);

    this.setState({
      calculate: false,
      modelId: "",

      graphConfig: DEFAULTGRAPHCONFIG,
    });
  };
  EQNS_nextPossible = (prevState) => {
    let Eqns = this.defaultEqns;

    const results = Eqns.filter(
      ({ id: id1 }) => !prevState.Eqns.some(({ id: id2 }) => id2 === id1)
    );

    return results[0];
  };
  EQNS_onIncrement = () => {
    this.setState((prevState) => {
      let newGraphConfig = { ...prevState.graphConfig };
      let newInitialConditions = [...newGraphConfig.initialConditions];
      newInitialConditions.push(0.5);
      newGraphConfig["initialConditions"] = newInitialConditions;
      return {
        graphConfig: newGraphConfig,

        Eqns: prevState.Eqns.concat(this.EQNS_nextPossible(prevState)),
        calculate: false,
      };
    });
  };
  EQNS_validateExpression = (expr, line) => {
    // console.log(this.MODEL_transformStateToModelObj())
    // console.log( this.MODEL_transformStateToModelObj().EQNS_validateExpression())

    // return this.MODEL_transformStateToModelObj().EQNS_validateExpression()

    // console.log();
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
      console.log(error);
      return false;
    }
  };

  GRAPHCONFIG_onOpen = () => {
    let graphConfig = { ...this.state.graphConfig };
    graphConfig.show = !this.state.graphConfig.show;
    graphConfig.submitted = true;

    this.setState({
      graphConfig: graphConfig,
    });
  };
  GRAPHCONFIG_onClose = () => {
    let graphConfig = { ...this.state.graphConfig };
    graphConfig.show = !this.state.graphConfig.show;
    graphConfig.submitted = true;

    this.setState({ graphConfig: graphConfig, calculate: true });
  };
  GRAPHCONFIG_onChange = (name) => (event, value) => {
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
  GRAPHCONFIG_onSubmit = () => {
    let graphConfig = { ...this.state.graphConfig };

    let newInitialConditions = graphConfig.initialConditions.map(Number);
    if (newInitialConditions.length === this.state.Eqns.length) {
      graphConfig.initialConditions = newInitialConditions;
      graphConfig.submitted = true;
    } else {
      graphConfig.submitted = false;
    }

    this.setState({ graphConfig: graphConfig });
  };

  LAYOUT_onChange = (layout) => {
    this.setState({ myReactGridLayout: layout });
  };
  LAYOUT_onReset = () => {
    this.setState({
      myReactGridLayout: DEFAULTLAYOUT(this.state),
    });
  };

  GRAPH_render = () => {
    let eqns = [];

    this.state.Eqns.forEach((eqn) => {
      eqns.push(eqn.ParsedEqn);
    });
    let LineNames = [];
    this.state.Eqns.forEach((eqn) => {
      LineNames.push(eqn.line);
    });

    let yAxis = this.state.graphConfig.yAxis;

    if (!(this.state.graphConfig.yAxis in LineNames)) {
      // the y axis is not a valid line name
      // let graphConfig={...this.state.graphConfig}
      // graphConfig.yAxis=LineNames[0]
      // this.setState({graphConfig:graphConfig})
      yAxis = LineNames[0];
    }

    let vars = {};

    this.state.Vars.forEach((VarElement) => {
      vars[VarElement.LatexForm] = VarElement.VarCurrent;
    });
    let t0 = performance.now();
    console.log(this.state.Model.eqns.textEqns, this.state.Eqns);
    
  
    // console.log(this.state.Model)

    // let Model = this.MODEL_transformStateToModelObj();

    // let t1=performance.now()
    // console.log(t1-t0)
    // console.log(Model.getTimeTaken())
    this.state.Model.onCalculate();
    console.log(this.state.Model);
    return (
      <Paper elevation={3} key="Graph">
        {/* <MyMathQuill
          firstBit={""}
          latex={Model.toLatex(this.state.Eqns[0].TextEqn)}
          //onDoubleClick={props.onDoubleClick}
          // \frac{ K\_2 a c}{ K\_1+ a}- K\_4 c
          // \frac{{K_2}}ac{{K_1}+a}-{K_4}c
          // \frac{ K\_2\cdot a\cdot c}{ K\_1+ a}- K\_4\cdot c

          onInputChange={this.handleMathQuillInputChange}
          width="60%"
        /> */}
        <LinearCoupledDiffEquationGrapher
          newcomputedResults2={this.state.Model.solutions.calcedSolution}
          h={this.state.graphConfig.h}
          numOfCycles={30}
          eqns={eqns} //send in parsed eqns
          vars={vars} // { K_1=0.27}
          LineNames={LineNames}
          t0={this.state.graphConfig.t0}
          method={this.state.graphConfig.method}
          axis={[this.state.graphConfig.xAxis, yAxis]}
          initialConditions={this.state.graphConfig.initialConditions} //includes t
          LegendVertical={this.state.graphConfig.LegendVertical}
          LegendHorizontal={this.state.graphConfig.LegendHorizontal}
          DecimalPrecision={this.state.graphConfig.DecimalPrecision}
        />
      </Paper>
    );
  };

  mathquillDidMount = (id, itemType) => (mathField) => {
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

  render() {
    let Eqns = (
      <EqnItems
        Eqns={this.state.Eqns}
        removeItem={this.ITEMS_remove}
        handleMathQuillInputChange={this.MATHQUILL_handleInputChange}
        mathquillDidMount={this.mathquillDidMount}
      />
    );

    let Vars = (
      <VarItems
        Vars={this.state.Vars}
        handleVariableInputChange={this.VARS_handleInputChange}
        removeItem={this.ITEMS_remove}
        handleMathQuillInputChange={this.MATHQUILL_handleInputChange}
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
          this.LAYOUT_onChange(layout, layouts)
        }
      >
        <Paper key="Eqns" className={classes.EqnContainer} elevation={3}>
          <LinearCoupledButtonEqnsContainer
            Eqns={this.state.Eqns}
            onIncrementEqn={this.EQNS_onIncrement}
            resetForm={this.EQNS_reset}
            handleMathQuillInputSubmit={this.MATHQUILL_handleInputSubmit}
            onResetLayout={this.LAYOUT_onReset}
          />

          {Eqns}
        </Paper>

        <Paper key="Vars" className={classes.VarContainer} elevation={3}>
          <LinearCoupledButtonVariablesContainer
            Vars={this.state.Vars}
            onIncrementVariable={this.VARS_onIncrement}
            resetForm={this.VARS_reset}
          />
          <Paper onMouseDown={(e) => e.stopPropagation()}>{Vars}</Paper>
        </Paper>

        {this.state.calculate ? (
          <div key="GraphButtons" className={classes.Graph}>
            <LinearCoupledButtonGraphContainer
              calculate={this.state.calculate}
              onGraphConfigOpen={this.GRAPHCONFIG_onOpen}
              onGraphClose={() => {
                this.setState({ calculate: false });
              }}
            />
          </div>
        ) : (
          <div key="GraphButtons" />
        )}

        {this.state.calculate && this.state.graphConfig.submitted ? (
          this.GRAPH_render()
        ) : (
          <div key="Graph" />
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
              method={this.state.graphConfig.method}
              t0={this.state.graphConfig.t0}
              h={this.state.graphConfig.h}
              Eqns={this.state.Eqns}
              onClose={this.GRAPHCONFIG_onClose}
              onChange={(val) => this.GRAPHCONFIG_onChange(val)}
              onSubmit={this.GRAPHCONFIG_onSubmit}
            />
          </div>
        ) : (
          <div key="GraphConfig" />
        )}
      </GridLayout>
    );
  }
}

export default LinearCoupled;
