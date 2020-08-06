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
import DEFAULTEQUATIONSNEW from "../../../components/Calculations/Dynamic/SampleEquations/DEFAULTEQUATIONSnew";

import DEFAULTEQUATIONS from "../../../components/Calculations/Dynamic/SampleEquations/DEFAULTEQUATIONS";
import DEFAULTVARS from "../../../components/Calculations/Dynamic/SampleEquations/DEFAULTVARS";
import LinearCoupledButtonVariablesContainer from "../../../components/UI/ButtonContainer/LinearCoupledButtonVariablesContainer";
import LinearCoupledButtonGraphContainer from "../../../components/UI/ButtonContainer/LinearCoupledButtonGraphContainer";
import DEFAULTLAYOUT from "./DefaultLayout";
import DEFAULTGRAPHCONFIG from "./DefaultGraphConfignew";
import Model from "../../../components/Calculations/Dynamic/SampleEquations/Model";
import ModelWrapper from "../../../components/Calculations/Dynamic/SampleEquations/ModelWrapper";

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
    modelObj: { Config: {}, Eqns: [], Vars: [] },

    graphConfig: DEFAULTGRAPHCONFIG,

    myReactGridLayout: [],
  };

  // static getDerivedStateFromProps(props, state) {
  //   if (props.modelId !== state.modelId) {
  //     //NEW MODEL

  //     let newModelWrapper = new ModelWrapper(
  //       { ...DEFAULTGRAPHCONFIG, eqnsObj: DEFAULTEQUATIONS, vars: DEFAULTVARS },
  //       {
  //         calculate: false,
  //       }
  //     );
  //     console.log(newModelWrapper)
  //     console.log(newModelWrapper.Eqns)

  //     return {
  //       // calculate: props.modelObj.meta.calculate,
  //       // modelId: props.modelId,
  //       // Eqns: Eqns,
  //       // Vars: Vars,
  //       myReactGridLayout: DEFAULTLAYOUT(newModelWrapper),
  //       // graphConfig: graphConfig,
  //       // modelObj: props.modelObj,
  //       modelObj: newModelWrapper,
  //     };
  //   }

  //   return null;
  // }
  componentDidMount() {
   
    let newModelWrapper2 = new ModelWrapper(
      { ...DEFAULTGRAPHCONFIG, eqnsObj: DEFAULTEQUATIONSNEW, vars: DEFAULTVARS },
      {
        calculate: false,
      }
    );
    console.log(newModelWrapper2)
    this.setState({
      modelObj: newModelWrapper2,
      myReactGridLayout: DEFAULTLAYOUT(newModelWrapper2),
    });
  }
  // componentDidUpdate() {
  //   if (
  //     this.state.Eqns !== this.props.modelObj.Eqns ||
  //     this.state.Vars !== this.props.Vars
  //   ) {
  //     this.props.sendToParent(this.state.Eqns, this.state.Vars);
  //     this.setState({
  //       myReactGridLayout: DEFAULTLAYOUT(this.state),
  //     });
  //   }
  // }

  MATHQUILL_handleInputChange = (id, itemType) => (mathField) => {
    // if ( itemType == "Eqns") {
    //   let items = this.state.modelObj.eqns.textEqns
    // }
    let items = this.state.modelObj[itemType];

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

      // Check if item is a dup
      /**
      for (let i = 0; i < items.length; i++) {
        const latex = items[i].LatexForm;
        for (let j = 0; j < items.length; j++) {
          if (i != j) {
            const latexOther = items[j].LatexForm;
            if ( latex === latexOther){
              items[i].errorMessage = "Err"
            } else {
              items[i].errorMessage = null
            }

          }
        
      }
    }

    */
     
      let latexFormArr = items.map(function (item) {
        return item.LatexForm;
      });

      for (let i = 0; i < latexFormArr.length; i++) {
        const latex = latexFormArr[i];
        if (latexFormArr.indexOf(latex) === i) {
          items.forEach((item) => (item.errorMessage = null));
        }
      }
      var isDuplicate = latexFormArr.some(function (item, idx) {
        return latexFormArr.indexOf(item) !== idx;
      });

      if (isDuplicate) {
        item.errorMessage = "doesnt work";
      } else {
        item.errorMessage = null;
      }
      
    }

    items[idx] = item;

    let modelObj = { ...this.state.modelObj };
    modelObj[itemType] = items;
    modelObj.calculate = false;

    this.setState({ modelObj: modelObj });
  };
  MATHQUILL_handleInputSubmit = (event) => {
    event.preventDefault();
    let newEqns = [];
    let invalidIndex = this.state.modelObj.validateExpressions();

    invalidIndex.forEach((idx) => {
      newEqns.push(this.ITEMS_setErrorMessage(idx, <MyErrorMessage />));
    });
    let modelObj = { ...this.state.modelObj };
    modelObj.Eqns = newEqns;

    invalidIndex.length != 0
      ? (modelObj.calculate = false)
      : (modelObj.calculate = true);

    this.setState({ modelObj: modelObj });
  };

  ITEMS_setErrorMessage = (i, errorMessage) => {
    let Eqn = {
      ...this.state.modelObj.Eqns[i],
    };
    Eqn.errorMessage = errorMessage;
    return Eqn;
  };
  ITEMS_remove = (id, itemType) => {
    this.setState(
      (prevState) => {
        if (itemType === "Eqns") {
          // Line up the initial Condition corresponding to the vars
          let newGraphConfig = { ...prevState.modelObj.Config };
          let newInitialConditions = [...newGraphConfig.initialConditions];
          let lineNames = [...newGraphConfig.lineNames];

          const idx = prevState.modelObj.Eqns.findIndex((e) => {
            return e.id === id;
          });
      
          lineNames.splice(idx,1)
          newGraphConfig.lineNames=lineNames

          newInitialConditions.pop();
          newGraphConfig["initialConditions"] = newInitialConditions;
          console.log(newGraphConfig)
          let modelObj = { ...prevState.modelObj };
          modelObj.Config = newGraphConfig;

          let Eqns = prevState.modelObj.Eqns.filter((eqn) => {
            return eqn.id !== id;
          });
          modelObj.Eqns = Eqns;
          modelObj.calculate = false;
          console.log(modelObj);
          return {
            modelObj: modelObj,
          };
        } else {
          let modelObj = { ...prevState.modelObj };

          let Vars = prevState.modelObj.Vars.filter((element) => {
            return element.id !== id;
          });
          modelObj.calculate = false;

          modelObj.Vars = Vars;
          return {
            modelObj,
          };
        }
      },
      () => {
        console.log(this.state.modelObj);
      }
    );
  };
  ITEMS_reset = (itemType) => {
    let modelObj = { ...this.state.modelObj };
    modelObj.calculate = false;
    modelObj.Config = DEFAULTGRAPHCONFIG;
    itemType === "eqns"
      ? (modelObj.Eqns = DEFAULTEQUATIONS)
      : (modelObj.Vars = DEFAULTVARS);

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
    let items = this.state.modelObj.Vars;

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

    const deepItems = [...this.state.modelObj.Vars];
    deepItems[idx] = item;

    let modelObj = { ...this.state.modelObj };
    modelObj.Vars = deepItems;
    if (!calculate) {
      modelObj.calculate = false;
    }
    console.log(modelObj);

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
      modelObj.Vars = prevState.modelObj.Vars.concat(
        this.VARS_nextPossible(prevState, type)
      );
      modelObj.calculate = false;
      return {
        modelObj: modelObj,
      };
    });
  };

  EQNS_nextPossible = (prevState) => {
    let Eqns = DEFAULTEQUATIONS;

    const results = Eqns.filter(
      ({ id: id1 }) =>
        !prevState.modelObj.Eqns.some(({ id: id2 }) => id2 === id1)
    );

    return results[0];
  };
  EQNS_onIncrement = () => {
    this.setState((prevState) => {
      let newGraphConfig = { ...prevState.modelObj.Config };
      let newInitialConditions = [...newGraphConfig.initialConditions];
      newInitialConditions.push(0.5);
      newGraphConfig["initialConditions"] = newInitialConditions;
      let modelObj = { ...prevState.modelObj };
      modelObj.Config = newGraphConfig;
      modelObj.calculate = false;
      modelObj.Eqns = prevState.modelObj.Eqns.concat(
        this.EQNS_nextPossible(prevState)
      );

      return {
        modelObj: modelObj,
      };
    });
  };

  GRAPHCONFIG_onToggleView = () => {
    let graphConfig = { ...this.state.modelObj.Config };
    graphConfig.show = !this.state.modelObj.Config.show;
    graphConfig.submitted = true;

    let modelObj = { ...this.state.modelObj };
    modelObj.Config = graphConfig;

    this.setState({
      graphConfig: graphConfig,
    });
  };

  GRAPHCONFIG_onChange = (name) => (event, value) => {
    let graphConfig = { ...this.state.modelObj.Config };

    if (name === "initialConditions") {
      let arr = event.target.value.split(",");

      graphConfig.initialConditions = arr;
    } else {
      graphConfig[name] = event.target.value;
    }

    graphConfig.submitted = false;
    let modelObj = { ...this.state.modelObj };
    modelObj.Config = graphConfig;

    this.setState({ modelObj: modelObj });
  };
  GRAPHCONFIG_onSubmit = () => {
    let graphConfig = { ...this.state.modelObj.Config };

    let newInitialConditions = graphConfig.initialConditions.map(Number);
    if (newInitialConditions.length === this.state.modelObj.Eqns.length) {
      graphConfig.initialConditions = newInitialConditions;
      graphConfig.submitted = true;
    } else {
      graphConfig.submitted = false;
    }
    let modelObj = { ...this.state.modelObj };
    modelObj.Config = graphConfig;
    this.setState({ modelObj: modelObj });
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

    this.state.modelObj.Eqns.forEach((eqn) => {
      eqns.push(eqn.ParsedEqn);
    });
    let LineNames = [];
    this.state.modelObj.Eqns.forEach((eqn) => {
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

    this.state.modelObj.Vars.forEach((VarElement) => {
      vars[VarElement.LatexForm] = VarElement.VarCurrent;
    });
    let t0 = performance.now();

    console.log(this.state.modelObj)

    console.log(this.state.modelObj.solveDiffEqns())
    return (
      <Paper elevation={3} key="Graph">
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

  render() {
    let Eqns = (
      <EqnItems
        Eqns={this.state.modelObj.Eqns}
        removeItem={this.ITEMS_remove}
        handleMathQuillInputChange={this.MATHQUILL_handleInputChange}
      />
    );

    let Vars = (
      <VarItems
        Vars={this.state.modelObj.Vars}
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
            Eqns={this.state.modelObj.Eqns}
            onIncrementEqn={this.EQNS_onIncrement}
            resetForm={() => this.ITEMS_reset("eqns")}
            handleMathQuillInputSubmit={this.MATHQUILL_handleInputSubmit}
            onResetLayout={this.LAYOUT_onReset}
          />

          {Eqns}
        </Paper>

        <Paper key="Vars" className={classes.VarContainer} elevation={3}>
          <LinearCoupledButtonVariablesContainer
            Vars={this.state.modelObj.Vars}
            onIncrementVariable={this.VARS_onIncrement}
            resetForm={() => this.ITEMS_reset("vars")}
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
              Eqns={this.state.modelObj.Eqns}
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
