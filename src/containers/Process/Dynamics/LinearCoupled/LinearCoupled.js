import React, { Component } from "react";
import LinearCoupledDiffThreeEqn from "../../../../components/Calculations/Method/LinearCoupled/Calcs/LinearCoupledDiffThreeEqn";
import LinearCoupledDiffTwoEqn from "../../../../components/Calculations/Method/LinearCoupled/Calcs/LinearCoupledDiffTwoEqn";
import LinearCoupledDiffFourEqn from "../../../../components/Calculations/Method/LinearCoupled/Calcs/LinearCoupledDiffFourEqn";
import EqnItems from "../../../../components/Calculations/Method/LinearCoupled/Eqns/EqnItems";
import { evaluate } from "mathjs";
import MyButton from "../../../../components/UI/Button/GenericButton";
import classes from "./LinearCoupled.module.css";

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

    Eqns: [
      {
        id: "qwert",
        line: "a",
        DByDLatex: "\\frac{da}{dt}=",
        LatexEqn: "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
        TextEqn: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
        errorMessage: "",
      },
      {
        id: "yuiop",
        line: "b",

        DByDLatex: "\\frac{db}{dt}=",
        LatexEqn: "\\frac{7.1ab}{0.103+a}-0.142b",
        TextEqn: "(7.1*a*b)/(0.103+a)-0.142*b",
        errorMessage: "",
      },
      {
        id: "asdfg",
        line: "c",

        DByDLatex: "\\frac{dc}{dt}=",
        LatexEqn: "\\frac{0.6ac}{0.103+a}-0.0102c",
        TextEqn: "(0.6*a*c)/(0.103+a)-0.0102*c",
        errorMessage: "",
      },
      {
        id: "hjklz",
        line: "d",

        DByDLatex: "\\frac{dd}{dt}=",
        LatexEqn: "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
        TextEqn: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
        errorMessage: "",
      },
    ],
  };

  validateExpression = (expr, line) => {
    if (this.state.Eqns.length === 4) {
      try {
        evaluate(expr, { a: 1, b: 1, c: 1, d: 1 });
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
        });
        return true;
      } catch (error) {
        return false;
      }
    } else if (this.state.Eqns.length === 1) {
      try {
        evaluate(expr, { [this.state.Eqns[0].line]: 1 });
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
    if (valid.includes("0")) {
      let validIndex = [];
      for (let i = 0; i < valid.length; i++) {
        if (valid[i] === "0") validIndex.push(i);
      }
      this.showErrorMessage(validIndex);

      this.setState({ calculate: false });
    } else {
      this.setState({ calculate: true });
    }
  };

  showErrorMessage = (arrEqnIndex) => {
    let Eqns = [...this.state.Eqns];

    arrEqnIndex.forEach((EqnIndex) => {
      console.log(EqnIndex);
      let Eqn = {
        ...this.state.Eqns[EqnIndex],
      };
      Eqn.errorMessage = "this one is bad";

      Eqns[EqnIndex] = Eqn;
      console.log(Eqns);
    });

    this.setState({ Eqns: Eqns }, () => {
      console.log(this.state.Eqns);
    });
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

      Eqns: [
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

  renderSwitchGraph = (length) => {


    switch (length) {
      case 2:
        return (
          <LinearCoupledDiffTwoEqn
            h={0.05}
            numberOfCycles={31}
            eqn1={this.state.Eqns[0].TextEqn}
            eqn2={this.state.Eqns[1].TextEqn}
            LineNames={[this.state.Eqns[0].line, this.state.Eqns[1].line]}
            a={1}
            b={0.5}
          />
        );
      case 3:
        return (
          <LinearCoupledDiffThreeEqn
            h={0.05}
            numberOfCycles={31}
            eqn1={this.state.Eqns[0].TextEqn}
            eqn2={this.state.Eqns[1].TextEqn}
            eqn3={this.state.Eqns[2].TextEqn}
            LineNames={[
              this.state.Eqns[0].line,
              this.state.Eqns[1].line,
              this.state.Eqns[2].line,
            ]}
            a={1}
            b={0.5}
            c={0.75}
          />
        );
      case 4:
        return (
          <LinearCoupledDiffFourEqn
            h={0.05}
            numberOfCycles={31}
            eqn1={this.state.Eqns[0].TextEqn}
            eqn2={this.state.Eqns[1].TextEqn}
            eqn3={this.state.Eqns[2].TextEqn}
            eqn4={this.state.Eqns[3].TextEqn}
            LineNames={[
              this.state.Eqns[0].line,
              this.state.Eqns[1].line,
              this.state.Eqns[2].line,
              this.state.Eqns[3].line,
            ]}
            a={1}
            b={0.5}
            c={1}
            d={0.5}
          />
        );
    }
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

          {this.state.calculate
            ? this.renderSwitchGraph(this.state.Eqns.length)
            : null}
        </div>
      </div>
    );
  }
}

export default LinearCoupled;
