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
    modelObj: null,

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

      return {
        // calculate: props.modelObj.meta.calculate,
        // modelId: props.modelId,
        // Eqns: Eqns,
        // Vars: Vars,
        // myReactGridLayout: DEFAULTLAYOUT(props),
        // graphConfig: graphConfig,
        modelObj: props.modelObj,
      };
    }

    return null;
  }

  componentDidUpdate() {
    if (
      this.state.Eqns !== this.props.modelObj.Eqns ||
      this.state.Vars !== this.props.Vars
    ) {
      this.props.sendToParent(this.state.Eqns, this.state.Vars);
      this.setState({
        myReactGridLayout: DEFAULTLAYOUT(this.state),
      });
    }
  }

  MATHQUILL_handleInputChange = (id, itemType) => (mathField) => {
    // if ( itemType == "Eqns") {
    //   let items = this.state.modelObj.eqns.textEqns
    // }
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

      let valueArr = items.map(function (item) {
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
    newModel.eqns = this.state.modelObj + changes;

    items[idx] = item;
    this.setState({ [itemType]: items, calculate: false, modelObj: newModel });
  };
  MATHQUILL_handleInputSubmit = (event) => {
    event.preventDefault();
    let newEqns = [];
    let invalidIndex = this.state.modelObj.validateExpressions();

    invalidIndex.forEach((idx) => {
      newEqns.push(this.ITEMS_setErrorMessage(idx, <MyErrorMessage />));
    });
    let modelObj = { ...this.state.modelObj };
    modelObj.eqns = newEqns;

    invalidIndex.length != 0
      ? (modelObj.meta.calculate = false)
      : (modelObj.meta.calculate = true);

    this.setState({ modelObj: modelObj });
  };

  ITEMS_setErrorMessage = (i, errorMessage) => {
    let Eqn = {
      ...this.state.modelObj.eqns[i],
    };
    Eqn.errorMessage = errorMessage;
    return Eqn;
  };
  ITEMS_remove = (id, itemType) => {
    this.setState((prevState) => {
      if (itemType === "Eqns") {
        // Line up the initial Condition corresponding to the vars
        let newGraphConfig = { ...prevState.modelObj.config };
        let newInitialConditions = [...newGraphConfig.initialConditions];
        newInitialConditions.pop();
        newGraphConfig["initialConditions"] = newInitialConditions;

        let modelObj = { ...prevState.modelObj };
        modelObj.config = newGraphConfig;

        let Eqns = prevState.modelObj.eqns.filter((eqn) => {
          return eqn.id !== id;
        });
        modelObj.eqns = Eqns;
        modelObj.meta.calculate = false;
        return {
          modelObj: modelObj,
        };
      } else {
        let modelObj = { ...prevState.modelObj };

        let Vars = prevState.modelObj.vars.filter((element) => {
          return element.id !== id;
        });
        modelObj.meta.calculate = false;

        modelObj.vars = Vars;
        return {
          modelObj,
        };
      }
    });
  };
  ITEMS_reset = (itemType) => {
    let modelObj = { ...this.state.modelObj };
    modelObj.meta.calculate = false;
    modelObj.config = DEFAULTGRAPHCONFIG;
    itemType === "eqns"
      ? (modelObj.eqns = DEFAULTEQUATIONS)
      : (modelObj.vars = DEFAULTVARS);

    this.setState(
      {
        modelId: "",
        modelObj: modelObj,
      },
      () => {
        this.props.sendToParent(modelObj);
      }
    );
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

    calculate
      ? this.setState({ Vars: deepItems })
      : this.setState({ Vars: deepItems, calculate: false });
  };

  VARS_nextPossible = (prevState, type) => {
    let typeArr = prevState.modelObj.vars.filter((Var) => {
      return Var.VarType === type;
    });
    let letterTypes = {
      Constant: "K",
      Dependent: "Y",
      Independent: "X",
    };
    let letter = letterTypes.Constant;

    let numbers = [];

    for (let i = 1; i < 15; i++) {
      numbers.push(i.toString());
    }
    for (let i = 0; i < typeArr.length; i++) {
      const index = numbers.indexOf(
        typeArr[i].LatexForm[typeArr[i].LatexForm.length - 1]
      );

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
      let modelObj = { ...this.state.modelObj };
      modelObj.vars = prevState.modelObj.vars.concat(
        this.VARS_nextPossible(prevState, type)
      );
      modelObj.meta.calculate = false;
      return {
        modelObj: modelObj,
      };
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
      let newGraphConfig = { ...prevState.modelObj.config };
      let newInitialConditions = [...newGraphConfig.initialConditions];
      newInitialConditions.push(0.5);
      newGraphConfig["initialConditions"] = newInitialConditions;
      let modelObj = { ...prevState.modelObj };
      modelObj.config = newGraphConfig;
      modelObj.meta.calculate = false;
      modelObj.eqns = prevState.modelObj.eqns.concat(
        this.EQNS_nextPossible(prevState)
      );

      return {
        modelObj: modelObj,
      };
    });
  };

  GRAPHCONFIG_onToggleView = () => {
    let graphConfig = { ...this.state.graphConfig };
    graphConfig.show = !this.state.graphConfig.show;
    graphConfig.submitted = true;

    this.setState({
      graphConfig: graphConfig,
    });
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
    // console.log(this.state.Model.solveDiffEqns())
    // this.state.Model.solveDiffEqns()
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
          numberOfCycles={30}
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
            resetForm={this.ITEMS_reset("eqns")}
            handleMathQuillInputSubmit={this.MATHQUILL_handleInputSubmit}
            onResetLayout={this.LAYOUT_onReset}
          />

          {Eqns}
        </Paper>

        <Paper key="Vars" className={classes.VarContainer} elevation={3}>
          <LinearCoupledButtonVariablesContainer
            Vars={this.state.Vars}
            onIncrementVariable={this.VARS_onIncrement}
            resetForm={this.ITEMS_reset("vars")}
          />
          <Paper onMouseDown={(e) => e.stopPropagation()}>{Vars}</Paper>
        </Paper>

        {this.state.calculate ? (
          <div key="GraphButtons" className={classes.Graph}>
            <LinearCoupledButtonGraphContainer
              calculate={this.state.calculate}
              onGraphConfigOpen={this.GRAPHCONFIG_onToggleView}
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
              onClose={this.GRAPHCONFIG_onToggleView}
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
