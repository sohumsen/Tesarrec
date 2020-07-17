import React, { Component } from "react";
import WordDoc from "../../../assets/MES download.docx";
import DonwloadButton from '../../../components/UI/Button/DownloadButton'
import EqnItems from "../../../components/UI/Eqns/EqnItems";
import { evaluate } from "mathjs";
import MyButton from "../../../components/UI/Button/GenericButton";
import classes from "./Mes.module.css";
import MyErrorMessage from "../../../components/UI/MyErrorMessage/MyErrorMessage";
import SettingButton from "../../../components/UI/Button/SettingButton";
import GraphConfig from "../../../components/UI/GraphConfig/GraphConfig";
import LinearCoupledDiffEqns from "../../../components/Calculations/Dynamic/LinearCoupled/MesDiffEqns";
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
      initialConditions: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    },

    Eqns: [
      {
        id: "qwert",
        line: "a",
        DByDLatex: "\\frac{da}{dt}=",
        LatexEqn:
          "-\\frac{1.5abd}{\\left(0.5+a\\right)\\left(0.04+d\\right)}-\\frac{0.01ac}{0.1+a}",
        TextEqn: "-1.5*a*b*d/(0.5+a)/(0.04+d)-0.01*a*c/(0.1+a)",
        errorMessage: null,
      },
      {
        id: "yuiop",
        line: "b",

        DByDLatex: "\\frac{db}{dt}=",
        LatexEqn:
          "\\frac{0.2abd}{\\left(0.5+a\\right)\\left(0.04+d\\right)}-0.05b",
        TextEqn: "0.2*a*b*d/(0.5+a)/(0.04+d)-0.05*b",
        errorMessage: null,
      },
      {
        id: "asdfg",
        line: "c",

        DByDLatex: "\\frac{dc}{dt}=",
        LatexEqn: "\\frac{0.1ac}{\\left(0.1+a\\right)}-0.05c",
        TextEqn: "0.1*a*c/(0.1+a)-0.05*c",
        errorMessage: null,
      },
      {
        id: "hjklz",
        line: "d",

        DByDLatex: "\\frac{dd}{dt}=",
        LatexEqn:
          "-\\frac{1.5ad}{\\left(0.5+a\\right)\\left(0.04+d\\right)}-\\frac{0.34e^{0.3236t}}{b}",
        TextEqn: "-1.5*a*d/(0.5+a)/(0.04+d)-0.34*e^(0.3236*t)/b",
        errorMessage: null,
      },
      {
        id: "dfsf",
        line: "f",

        DByDLatex: "\\frac{df}{dt}=",
        LatexEqn:
          "-\\frac{1.3fgj}{\\left(0.5+f\\right)\\left(0.002+j\\right)}-\\frac{0.05fh}{0.5+f}",
        TextEqn: " -1.3*f*g*j/(0.5+f)/(0.002+j)-0.05*f*h/(0.5+f)",
        errorMessage: null,
      },
      {
        id: "klsdf",
        line: "g",

        DByDLatex: "\\frac{dg}{dt}=",
        LatexEqn:
          "\\frac{0.18fgj}{\\left(0.5+f\\right)\\left(0.002+j\\right)}-0.13g",
        TextEqn: "0.18*f*g*j/(0.5+f)/(0.002+j)-0.13*g",
        errorMessage: null,
      },
      {
        id: "sdgfdg",
        line: "h",

        DByDLatex: "\\frac{dh}{dt}=",
        LatexEqn: "\\frac{fh}{\\left(0.5+f\\right)}-0.14h",
        TextEqn: "f*h/(0.5+f)-0.14*h",
        errorMessage: null,
      },
      {
        id: "ewrtew",
        line: "j",

        DByDLatex: "\\frac{dj}{dt}=",
        LatexEqn:
          "-\\frac{1.3fj}{\\left(0.5+f\\right)\\left(0.002+j\\right)}-\\frac{0.34e^{0.3236t}}{g}",
        TextEqn: "-1.3*f*j/(0.5+f)/(0.002+j)-0.34*e^(0.3236*t)/g",
        errorMessage: null,
      },
      {
        id: "sjmew",
        line: "k",

        DByDLatex: "\\frac{dk}{dt}=",
        LatexEqn:
          "\\frac{1.3fj}{\\left(0.5+f\\right)\\left(0.002+j\\right)}+\\frac{0.34e^{0.3236t}}{g}",
        TextEqn: "1.3*f*j/(0.5+f)/(0.002+j)+0.34*e^(0.3236*t)/g",
        errorMessage: null,
      },
    ],
  };

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
        initialConditions: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
      },

      Eqns: [
        {
          id: "qwert",
          line: "a",
          DByDLatex: "\\frac{da}{dt}=",
          LatexEqn:
            "-\\frac{1.5abd}{\\left(0.5+a\\right)\\left(0.04+d\\right)}-\\frac{0.01ac}{0.1+a}",
          TextEqn: "-1.5*a*b*d/(0.5+a)/(0.04+d)-0.01*a*c/(0.1+a)",
          errorMessage: null,
        },
        {
          id: "yuiop",
          line: "b",

          DByDLatex: "\\frac{db}{dt}=",
          LatexEqn:
            "\\frac{0.2abd}{\\left(0.5+a\\right)\\left(0.04+d\\right)}-0.05b",
          TextEqn: "0.2*a*b*d/(0.5+a)/(0.04+d)-0.05*b",
          errorMessage: null,
        },
        {
          id: "asdfg",
          line: "c",

          DByDLatex: "\\frac{dc}{dt}=",
          LatexEqn: "\\frac{0.1ac}{\\left(0.1+a\\right)}-0.05c",
          TextEqn: "0.1*a*c/(0.1+a)-0.05*c",
          errorMessage: null,
        },
        {
          id: "hjklz",
          line: "d",

          DByDLatex: "\\frac{dd}{dt}=",
          LatexEqn:
            "-\\frac{1.5ad}{\\left(0.5+a\\right)\\left(0.04+d\\right)}-\\frac{0.34e^{0.3236t}}{b}",
          TextEqn: "-1.5*a*d/(0.5+a)/(0.04+d)-0.34*e^(0.3236*t)/b",
          errorMessage: null,
        },
        {
          id: "dfsf",
          line: "f",

          DByDLatex: "\\frac{df}{dt}=",
          LatexEqn:
            "-\\frac{1.3fgj}{\\left(0.5+f\\right)\\left(0.002+j\\right)}-\\frac{0.05fh}{0.5+f}",
          TextEqn: " -1.3*f*g*j/(0.5+f)/(0.002+j)-0.05*f*h/(0.5+f)",
          errorMessage: null,
        },
        {
          id: "klsdf",
          line: "g",

          DByDLatex: "\\frac{dg}{dt}=",
          LatexEqn:
            "\\frac{0.18fgj}{\\left(0.5+f\\right)\\left(0.002+j\\right)}-0.13g",
          TextEqn: "0.18*f*g*j/(0.5+f)/(0.002+j)-0.13*g",
          errorMessage: null,
        },
        {
          id: "sdgfdg",
          line: "h",

          DByDLatex: "\\frac{dh}{dt}=",
          LatexEqn: "\\frac{fh}{\\left(0.5+f\\right)}-0.14h",
          TextEqn: "f*h/(0.5+f)-0.14*h",
          errorMessage: null,
        },
        {
          id: "ewrtew",
          line: "j",

          DByDLatex: "\\frac{dj}{dt}=",
          LatexEqn:
            "-\\frac{1.3fj}{\\left(0.5+f\\right)\\left(0.002+j\\right)}-\\frac{0.34e^{0.3236t}}{g}",
          TextEqn: "-1.3*f*j/(0.5+f)/(0.002+j)-0.34*e^(0.3236*t)/g",
          errorMessage: null,
        },
        {
          id: "sjmew",
          line: "k",

          DByDLatex: "\\frac{dk}{dt}=",
          LatexEqn:
            "\\frac{1.3fj}{\\left(0.5+f\\right)\\left(0.002+j\\right)}+\\frac{0.34e^{0.3236t}}{g}",
          TextEqn: "1.3*f*j/(0.5+f)/(0.002+j)+0.34*e^(0.3236*t)/g",
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
        LatexEqn:
          "-\\frac{1.5abd}{\\left(0.5+a\\right)\\left(0.04+d\\right)}-\\frac{0.01ac}{0.1+a}",
        TextEqn: "-1.5*a*b*d/(0.5+a)/(0.04+d)-0.01*a*c/(0.1+a)",
        errorMessage: null,
      },
      {
        id: "yuiop",
        line: "b",

        DByDLatex: "\\frac{db}{dt}=",
        LatexEqn:
          "\\frac{0.2abd}{\\left(0.5+a\\right)\\left(0.04+d\\right)}-0.05b",
        TextEqn: "0.2*a*b*d/(0.5+a)/(0.04+d)-0.05*b",
        errorMessage: null,
      },
      {
        id: "asdfg",
        line: "c",

        DByDLatex: "\\frac{dc}{dt}=",
        LatexEqn: "\\frac{0.1ac}{\\left(0.1+a\\right)}-0.05c",
        TextEqn: "0.1*a*c/(0.1+a)-0.05*c",
        errorMessage: null,
      },
      {
        id: "hjklz",
        line: "d",

        DByDLatex: "\\frac{dd}{dt}=",
        LatexEqn:
          "-\\frac{1.5ad}{\\left(0.5+a\\right)\\left(0.04+d\\right)}-\\frac{0.34e^{0.3236t}}{b}",
        TextEqn: "-1.5*a*d/(0.5+a)/(0.04+d)-0.34*e^(0.3236*t)/b",
        errorMessage: null,
      },
      {
        id: "dfsf",
        line: "f",

        DByDLatex: "\\frac{df}{dt}=",
        LatexEqn:
          "-\\frac{1.3fgj}{\\left(0.5+f\\right)\\left(0.002+j\\right)}-\\frac{0.05fh}{0.5+f}",
        TextEqn: " -1.3*f*g*j/(0.5+f)/(0.002+j)-0.05*f*h/(0.5+f)",
        errorMessage: null,
      },
      {
        id: "klsdf",
        line: "g",

        DByDLatex: "\\frac{dg}{dt}=",
        LatexEqn:
          "\\frac{0.18fgj}{\\left(0.5+f\\right)\\left(0.002+j\\right)}-0.13g",
        TextEqn: "0.18*f*g*j/(0.5+f)/(0.002+j)-0.13*g",
        errorMessage: null,
      },
      {
        id: "sdgfdg",
        line: "h",

        DByDLatex: "\\frac{dh}{dt}=",
        LatexEqn: "\\frac{fh}{\\left(0.5+f\\right)}-0.14h",
        TextEqn: "f*h/(0.5+f)-0.14*h",
        errorMessage: null,
      },
      {
        id: "ewrtew",
        line: "j",

        DByDLatex: "\\frac{dj}{dt}=",
        LatexEqn:
          "-\\frac{1.3fj}{\\left(0.5+f\\right)\\left(0.002+j\\right)}-\\frac{0.34e^{0.3236t}}{g}",
        TextEqn: "-1.3*f*j/(0.5+f)/(0.002+j)-0.34*e^(0.3236*t)/g",
        errorMessage: null,
      },
      {
        id: "sjmew",
        line: "k",

        DByDLatex: "\\frac{dk}{dt}=",
        LatexEqn:
          "\\frac{1.3fj}{\\left(0.5+f\\right)\\left(0.002+j\\right)}+\\frac{0.34e^{0.3236t}}{g}",
        TextEqn: "1.3*f*j/(0.5+f)/(0.002+j)+0.34*e^(0.3236*t)/g",
        errorMessage: null,
      },
    ];

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


    return this.state.graphConfig.submitted ? (
      <LinearCoupledDiffEqns
        h={0.01}
        numberOfCycles={50}
        eqns={eqns}
        axis={["a","t"]}
        LineNames={LineNames}
        initialConditions={this.state.graphConfig.initialConditions}
        LegendVertical={this.state.graphConfig.LegendVertical}
        LegendHorizontal={this.state.graphConfig.LegendHorizontal}
        DecimalPrecision={this.state.graphConfig.DecimalPrecision}
      />
    ) : null;
  };
  copyAllEqnsText = () => {
    var allTextEqns = [];

    for (let i = 0; i < this.state.Eqns.length; i++) {
      let Eqn = {
        ...this.state.Eqns[i],
      };
      allTextEqns.push(Eqn.TextEqn);
    }
    navigator.clipboard.writeText(allTextEqns);
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
        <div>
          <form style={{ float: "right" }} method="get" action={WordDoc}>
            <DonwloadButton style={{ float: "right" }} type="submit">
              Download!
            </DonwloadButton>
          </form>

          <a style={{ float: "right" }} href={WordDoc} download>
            Click to download paper
          </a>
        </div>
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
                  disabled={this.state.Eqns.length === 10}
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
              <div className={classes.Button}>
                <MyButton
                  type="button"
                  value="Copy"
                  displayValue="COPY"
                  onClick={this.copyAllEqnsText}
                />
              </div>
            </div>
          </div>
        </form>

        <div className={classes.Graph}>
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
