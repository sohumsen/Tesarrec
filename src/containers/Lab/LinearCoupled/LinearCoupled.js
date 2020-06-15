import React, { Component } from "react";

import EqnItems from "../../../components/Calculations/Method/LinearCoupled/Eqns/EqnItems";
import { evaluate } from "mathjs";
import MyButton from "../../../components/UI/Button/GenericButton";
import classes from "./LinearCoupled.module.css";
import MyErrorMessage from "../../../components/UI/MyErrorMessage/MyErrorMessage";
import SettingButton from "../../../components/UI/Button/SettingButton";
import GraphConfig from "../../../components/UI/GraphConfig/GraphConfig";
import LinearCoupledDiffEqns from "../../../components/Calculations/Method/LinearCoupled/Calcs/LinearCoupledDiffEqns";
class LinearCoupled extends Component {
  /**
   * Visual Component that contains the textbox for the equation and calculation outputs
   * plus some equation labels
   *
   */

  //y1=a, y2=b,y3=c
  state = {
    calculate: true,
    variableDescription: {
      a: "this is some stuff",
      b: "this is some stuff",
      c: "this is some stuff",
      d: "this is some stuff",
    },
    graphConfig: {
      show: false,
      submitted: true,
      LegendHorizontal: "left",
      LegendVertical: "top",
      DecimalPrecision: 2,
      initialConditions: [0.5, 0.5, 0.5, 0.5],
    },

    Eqns: [
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
    ],
  };

  validateExpression = (expr, line) => {
    if (this.state.Eqns.length === 4) {
      try {
        evaluate(expr, { a: 1, b: 1, c: 1, d: 1, t: 1 });
        return true;
      } catch (error) {
        return false;
      }
    } else if (this.state.Eqns.length === 3) {
      try {
        evaluate(expr, {
          [this.state.Eqns[0].line]: 1,
          [this.state.Eqns[1].line]: 1,
          [this.state.Eqns[2].line]: 1,
          t: 1,
        });
        return true;
      } catch (error) {
        return false;
      }
    } else if (this.state.Eqns.length === 2) {
      try {
        evaluate(expr, {
          [this.state.Eqns[0].line]: 1,
          [this.state.Eqns[1].line]: 1,
          t: 1,
        });
        return true;
      } catch (error) {
        return false;
      }
    } else if (this.state.Eqns.length === 1) {
      try {
        evaluate(expr, { [this.state.Eqns[0].line]: 1, t: 1 });
        return true;
      } catch (error) {
        return false;
      }
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
      return {
        calculate: false,
        Eqns: prevState.Eqns.filter((element) => {
          return element.id !== id;
        }),
      };
    });
  };
  resetForm = () => {
    this.setState({
      calculate: true,
      variableDescription: {
        a: "this is some stuff",
        b: "this is some stuff",
        c: "this is some stuff",
        d: "this is some stuff",
      },
      graphConfig: {
        show: false,
        submitted: true,
        LegendHorizontal: "left",
        LegendVertical: "top",
        DecimalPrecision: 2,
        initialConditions: [0.5, 0.5, 0.5, 0.5],
      },

      Eqns: [
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
      ],
    });
  };
  nextPossibleEqn = (prevState) => {
    let Eqns = [
      {
        id: "qwert",
        line: "a",
        DByDLatex: "\\frac{da}{dt}=",
        LatexEqn: "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
        TextEqn: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
      },
      {
        id: "yuiop",
        line: "b",

        DByDLatex: "\\frac{db}{dt}=",
        LatexEqn: "\\frac{7.1ab}{0.103+a}-0.142b",
        TextEqn: "(7.1*a*b)/(0.103+a)-0.142*b",
      },
      {
        id: "asdfg",
        line: "c",

        DByDLatex: "\\frac{dc}{dt}=",
        LatexEqn: "\\frac{0.6ac}{0.103+a}-0.0102c",
        TextEqn: "(0.6*a*c)/(0.103+a)-0.0102*c",
      },
      {
        id: "hjklz",
        line: "d",

        DByDLatex: "\\frac{dd}{dt}=",
        LatexEqn: "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
        TextEqn: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
      },
    ];

    const results = Eqns.filter(
      ({ id: id1 }) => !prevState.Eqns.some(({ id: id2 }) => id2 === id1)
    );

    return results[0];
  };

  onIncrementEqn = () => {
    this.setState((prevState) => {
      return {
        Eqns: prevState.Eqns.concat(this.nextPossibleEqn(prevState)),
        calculate: false,
      };
    });
  };
  toggleChartShow = () => {
    let graphConfig = { ...this.state.graphConfig };
    graphConfig.show = !this.state.graphConfig.show;
    this.setState({ graphConfig: graphConfig });
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
    if (newInitialConditions.length === this.state.Eqns.length) {
      graphConfig.initialConditions = newInitialConditions;
      graphConfig.submitted = true;
    } else {
      graphConfig.submitted = false;
    }

    this.setState({ graphConfig: graphConfig });
  };
  renderSwitchGraph = (length) => {
    switch (length) {
      case 2:
        return (
          <div>
            {/*<LinearCoupledDiffTwoEqn
            h={0.05}
            numberOfCycles={31}
            eqn1={this.state.Eqns[0].TextEqn}
            eqn2={this.state.Eqns[1].TextEqn}
            LineNames={[this.state.Eqns[0].line, this.state.Eqns[1].line]}
            a={1}
            b={0.5}
            LegendVertical={this.state.graphConfig.LegendVertical}
            LegendHorizontal={this.state.graphConfig.LegendHorizontal}
            DecimalPrecision={this.state.graphConfig.DecimalPrecision}
/>*/}
          </div>
        );
      // case 3:
      //   return (
      //     <LinearCoupledDiffThreeEqn
      //       h={0.05}
      //       numberOfCycles={31}
      //       eqn1={this.state.Eqns[0].TextEqn}
      //       eqn2={this.state.Eqns[1].TextEqn}
      //       eqn3={this.state.Eqns[2].TextEqn}
      //       LineNames={[
      //         this.state.Eqns[0].line,
      //         this.state.Eqns[1].line,
      //         this.state.Eqns[2].line,
      //       ]}
      //       a={1}
      //       b={0.5}
      //       c={0.75}
      //       LegendVertical={this.state.graphConfig.LegendVertical}
      //       LegendHorizontal={this.state.graphConfig.LegendHorizontal}
      //       DecimalPrecision={this.state.graphConfig.DecimalPrecision}

      //     />
      //   );
      // case 4:
      //   return (
      //     <LinearCoupledDiffFourEqn
      //       h={0.05}
      //       numberOfCycles={31}
      //       eqn1={this.state.Eqns[0].TextEqn}
      //       eqn2={this.state.Eqns[1].TextEqn}
      //       eqn3={this.state.Eqns[2].TextEqn}
      //       eqn4={this.state.Eqns[3].TextEqn}
      //       LineNames={[
      //         this.state.Eqns[0].line,
      //         this.state.Eqns[1].line,
      //         this.state.Eqns[2].line,
      //         this.state.Eqns[3].line,
      //       ]}
      //       a={1}
      //       b={0.5}
      //       c={1}
      //       d={0.5}
      //       LegendVertical={this.state.graphConfig.LegendVertical}
      //       LegendHorizontal={this.state.graphConfig.LegendHorizontal}
      //       DecimalPrecision={this.state.graphConfig.DecimalPrecision}

      //     />
      //   );

      default:
        return null;
    }
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
   
    return this.state.graphConfig.submitted ? (
      <LinearCoupledDiffEqns
        h={0.05}
        numberOfCycles={30}
        eqns={eqns}
        LineNames={LineNames}
        initialConditions={this.state.graphConfig.initialConditions}
        LegendVertical={this.state.graphConfig.LegendVertical}
        LegendHorizontal={this.state.graphConfig.LegendHorizontal}
        DecimalPrecision={this.state.graphConfig.DecimalPrecision}
      />
    ) : null;
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
        <form onSubmit={this.handleMathQuillInputSubmit}>
          <div className={classes.Eqns}>
            {Eqns}
            <div className={classes.ButtonContainer}>
              <div className={classes.Button}>
                <SettingButton
                  disabled={!this.state.calculate}
                  type="button"
                  value="config"
                  displayValue="CONFIG"
                  onClick={this.toggleChartShow}
                />
              </div>
              <div className={classes.Button}>
                <MyButton
                  type="button"
                  value="addODE"
                  disabled={this.state.Eqns.length === 4}
                  displayValue="Add ODE"
                  onClick={this.onIncrementEqn}
                />
              </div>
              <div className={classes.Button}>
                <MyButton
                  type="reset"
                  value="Reset"
                  displayValue="RESET"
                  onClick={this.resetForm}
                />
              </div>

              <div className={classes.Button}>
                <MyButton type="submit" value="Submit" displayValue="SUBMIT" />
              </div>
            </div>
          </div>
        </form>

        <div className={classes.Graph}>
          {/*   <div className={classes.Legend}>
            <InteractiveTextBox
              variableDescriptionObj={this.state.variableDescription}
            />
    </div>*/}

          {this.state.calculate ? this.renderGraph() : null}
        </div>

        {this.state.graphConfig.show && this.state.calculate ? (
          <GraphConfig
            errorMessage={!this.state.graphConfig.submitted}
            LegendHorizontal={this.state.graphConfig.LegendHorizontal}
            LegendVertical={this.state.graphConfig.LegendVertical}
            DecimalPrecision={this.state.graphConfig.DecimalPrecision}
            initialConditions={this.state.graphConfig.initialConditions}
            onClose={this.toggleChartShow}
            onChange={(val) => this.onGraphConfigChange(val)}
            onSubmit={this.onGraphConfigSubmit}
          />
        ) : null}
      </div>
    );
  }
}

export default LinearCoupled;
