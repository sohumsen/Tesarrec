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
import { Paper, Modal } from "@material-ui/core";
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
    modelObj: { Eqns: [], Vars: [], Config: {} }, // This hack is required to handle the modelObj default state
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
          name: "Untitled",
          description: "this is a default Model",
          modelId: "dfjskf",
        }
      );

      return {
        // calculate: props.modelObj.meta.calculate,
        modelId: props.modelId,
        // Eqns: Eqns,
        // Vars: Vars,
        // myReactGridLayout: DEFAULTLAYOUT(props.modelObj),
        // graphConfig: graphConfig,
        // modelObj: props.modelObj,
        modelObj: newModel,
      };
    }

    return null;
  }

  // componentDidMount() {
  //   let aNewModel = new Model();
  //   this.setState({
  //     modelObj: aNewModel,
  //     myReactGridLayout: DEFAULTLAYOUT(aNewModel),
  //   });
  // }
  // componentDidUpdate(prevState, nextState) {
  //   if (
  //     prevState.modelObj.Eqns !== nextState.modelObj.Eqns ||
  //     prevState.modelObj.Vars !== nextState.modelObj.Vars
  //   ) {
  //     this.props.sendToParent(nextState.modelObj);
  //     // this.setState({
  //     //   modelObj:nextState.modelObj,
  //     //   myReactGridLayout: DEFAULTLAYOUT(this.state.modelObj),
  //     // });
  //   }
  // }
  componentDidUpdate() {
    if (this.props.saveSnapshot) {
      this.props.sendToParent(this.state.modelObj);
    }
  }

  MATHQUILL_handleInputChange = (id, itemType) => (mathField) => {
    // this.state.modelObj.Config="dsfds"
    let items = this.state.modelObj[itemType];
    const idx = items.findIndex((e) => {
      return e.id === id;
    });
    const item = items[idx];

    if (itemType === "Eqns") {
      item.textEqn = mathField.text();
      item.latexEqn = mathField.latex();
    } else {
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
    let invalidIndex = this.state.modelObj.validateExpressions2();

    for (let i = 0; i < this.state.modelObj.Eqns.length; i++) {
      const eqn = this.state.modelObj.Eqns[i];

      if (invalidIndex.includes(i)) {
        //newEqns.push(this.setErrorMessageOnEqns(i, <MyErrorMessage />));
        eqn.errorMessage = <MyErrorMessage />;
        newEqns.push(eqn);
      } else {
        //newEqns.push(this.setErrorMessageOnEqns(i, null));
        eqn.errorMessage = null;
        eqn.parsedEqn = simplify(parse(eqn.textEqn));
        newEqns.push(eqn);
      }
    }
    let aModel = this.state.modelObj;
    aModel.Eqns = newEqns;

    invalidIndex.length != 0
      ? (aModel.Config.calculate = false)
      : (aModel.Config.calculate = true);

    let yAxis = this.state.modelObj.Config.yAxis;

    if (!( this.state.modelObj.Config.lineNames.includes(yAxis))) {
      yAxis = this.state.modelObj.Config.lineNames[0];
    }
    aModel.Config.yAxis = yAxis;

    this.setState({ modelObj: aModel });
  };

  ITEMS_remove = (id, itemType) => {
    this.setState((prevState) => {
      let modelObj = prevState.modelObj;

      if (itemType === "Eqns") {
        // Line up the initial Condition corresponding to the vars
        let Config = prevState.modelObj.Config;

        const idx = prevState.modelObj.Eqns.findIndex((e) => {
          return e.id === id;
        });

        let Eqns = prevState.modelObj.Eqns.filter((eqn) => {
          return eqn.id !== id;
        });

        let lineNames = Eqns.map((eqn) => eqn.lineName);
        let initialConditions = prevState.modelObj.Config.initialConditions.filter(
          (_, i) => {
            return i !== idx;
          }
        );
        Config.lineNames = lineNames;
        Config.initialConditions = initialConditions;

        modelObj.Config = Config;
        modelObj.Eqns = Eqns;
        modelObj.Config.calculate = false;

        // this.state.modelObj.Config = Config;
        return {
          modelObj: modelObj,
        };
      } else {
        let Vars = prevState.modelObj.Vars.filter((element) => {
          return element.id !== id;
        });

        modelObj.Config.calculate = false;
        modelObj.Vars = Vars;
        return {
          modelObj,
        };
      }
    });
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
      Var["VarCurrent"] = value;
    } else {
      Var[event.target.name] = event.target.value;
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
      LatexForm: letterTypes.Constant + "_" + numbers[0],
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
      let modelObj = this.state.modelObj;
      modelObj.Vars = prevState.modelObj.Vars.concat(
        this.VARS_nextPossible(prevState, type)
      );
      modelObj.Config.calculate = false;
      return {
        modelObj: modelObj,
      };
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
    modelObj.Config.initialConditions.push(0.5);
    modelObj.Config.lineNames = modelObj.Eqns.map((eqn) => eqn.lineName);
    console.log(modelObj);
    this.setState({
      modelObj: modelObj,
    });

    // this.setState(
    //   (prevState) => {
    //     let modelObj = prevState.modelObj;
    //     // let newGraphConfig = modelObj.Config
    //     // let newInitialConditions = newGraphConfig.initialConditions

    //     // newInitialConditions.push(0.5);
    //     // newGraphConfig.initialConditions = newInitialConditions;
    //     console.log(modelObj)
    //     console.log(this.EQNS_nextPossible(prevState));

    //     modelObj.Eqns = modelObj.Eqns.concat(this.EQNS_nextPossible(prevState));
    //     modelObj.Config.initialConditions.push(0.5);
    //     modelObj.Config.lineNames = modelObj.Eqns.map((eqn) => eqn.lineName);
    //     // console.log(modelObj)

    //     // modelObj.Config.calculate = false;
    //     // modelObj.Eqns = prevState.modelObj.Eqns.concat(
    //     //   this.EQNS_nextPossible(prevState)
    //     // );
    //     // newGraphConfig.lineNames = modelObj.Eqns.map((eqn) => eqn.lineName);
    //     // modelObj.Config = newGraphConfig;

    //     return {
    //       modelObj: modelObj,
    //     };
    //   },
    //   () => {
    //     console.log(
    //       this.state.modelObj,
    //       this.state.modelObj.returnConstructorObj()
    //     );
    //   }
    // );
  };

  GRAPHCONFIG_onToggleView = () => {
    let modelObj = this.state.modelObj;
    modelObj.Config.show = !this.state.modelObj.Config.show;
    modelObj.Config.submitted = true;
    // let graphConfig = this.state.modelObj.Config;
    // graphConfig.show = !this.state.modelObj.Config.show;
    // graphConfig.submitted = true;

    // modelObj.Config = graphConfig;

    this.setState({
      modelObj: modelObj,
    });
  };

  GRAPHCONFIG_onChange = (name) => (event, value) => {
    let modelObj = this.state.modelObj;

    if (name === "initialConditions") {
      let arr = event.target.value.split(",");

      modelObj.Config.initialConditions = arr;
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
    modelObj.Config.show = false


    this.setState({ modelObj: modelObj });
  };

  // LAYOUT_onChange = (layout) => {
  //   this.setState({ myReactGridLayout: layout });
  // };
  // LAYOUT_onReset = () => {
  //   this.setState({
  //     myReactGridLayout: DEFAULTLAYOUT(this.state.modelObj),
  //   });
  // };

  GRAPH_render = () => {
    //TODO WHY DOESNT THIS METHOD WORK OK . IF ID IT WE CAN COMPLETE AND DO STUFF libe model.solve()
    // console.log(this.state.modelObj.returnConstructorObj());
    // console.log(this.state.modelObj.solveDiffEqns());
    // console.log(this.state.modelObj.returnConstructorObj());

    // let eqns = [];
    // this.state.modelObj.Eqns.forEach((eqn) => {
    //   eqns.push(eqn.parsedEqn);
    // });
    // let LineNames = [];
    // this.state.modelObj.Eqns.forEach((eqn) => {
    //   LineNames.push(eqn.line);
    // });

    // let yAxis = this.state.modelObj.Config.yAxis;

    // // if (!(yAxis in this.state.modelObj.Config.lineNames)){

    // //   yAxis=this.state.modelObj.Config.lineNames[0]
    // // }

    // // if (!(this.state.modelObj.Config in LineNames)) {
    // //   // the y axis is not a valid line name
    // //   // let graphConfig={...this.state.graphConfig}
    // //   // graphConfig.yAxis=LineNames[0]
    // //   // this.setState({graphConfig:graphConfig})
    // //   yAxis = LineNames[0];
    // // }
    let vars = {};

    this.state.modelObj.Vars.forEach((VarElement) => {
      vars[VarElement.LatexForm] = VarElement.VarCurrent;
    });
    // let t0 = performance.now();

    // let parsedEqns = this.state.modelObj.Eqns.map((eqn) =>
    //   simplify(parse(eqn.textEqn))
    // );

    return (
      <div  key="Graph">
        <LinearCoupledDiffEquationGrapher
          computedResults={this.state.modelObj.solveDiffEqns()}
          modelObj={this.state.modelObj}
          // h={this.state.modelObj.Config.h}
          // numOfCycles={30}
          // // eqns={parsedEqns} //send in parsed eqns
          // vars={vars} // { K_1=0.27}
          // // LineNames={LineNames}
          // t0={this.state.modelObj.Config.t0}
          // method={this.state.modelObj.Config.method}
          // // axis={[this.state.modelObj.Config.xAxis, this.state.modelObj.Config.yAxis]}
          // initialConditions={this.state.modelObj.Config.initialConditions} //includes t
          // LegendVertical={this.state.modelObj.Config.LegendVertical}
          // LegendHorizontal={this.state.modelObj.Config.LegendHorizontal}
          // DecimalPrecision={this.state.modelObj.Config.DecimalPrecision}
        />
      </div>
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
      // <GridLayout
      //   className={classes.Container}
      //   layout={this.state.myReactGridLayout}
      //   cols={12}
      //   rowHeight={30}
      //   width={1300}
      //   style={{ position: "relative" }}
      //   autoSize
      //   onLayoutChange={(layout, layouts) =>
      //     this.LAYOUT_onChange(layout, layouts)
      //   }
      // >
      <div className={classes.Container}>
        <Paper key="Eqns" className={classes.EqnContainer} elevation={3}>
          <LinearCoupledButtonEqnsContainer
            Eqns={this.state.modelObj.Eqns}
            onIncrementEqn={this.EQNS_onIncrement}
            resetForm={() => this.ITEMS_reset("eqns")}
            handleMathQuillInputSubmit={this.MATHQUILL_handleInputSubmit}
            // onResetLayout={this.LAYOUT_onReset}
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

        {/* {this.state.modelObj.Config.calculate &&
        this.state.modelObj.Config.submitted ? (
          this.GRAPH_render()
        ) : (
          <div key="Graph" />
        )} */}
        <Modal
          open={this.state.modelObj.Config.show}
          onClose={this.GRAPHCONFIG_onToggleView}
        >
          <div key="GraphConfig" className={classes.graphConfig}>
            <GraphConfig
              configPos={this.props.configPos}
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

        {/* {this.state.modelObj.Config.show &&
        this.state.modelObj.Config.calculate ? (
          <div key="GraphConfig" className={classes.graphConfig}>
            <GraphConfig
              configPos={this.props.configPos}
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
        ) : (
          <div key="GraphConfig" className={classes.graphConfig}/>
        )} */}
      </div>
      // </GridLayout>
    );
  }
}

export default LinearCoupledNew;
