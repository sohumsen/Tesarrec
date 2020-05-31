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

    //Eqn1LinearCoupledDiffLatex:
    //"-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
    //Eqn1LinearCoupledDiffText: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
    //Eqn2LinearCoupledDiffLatex: "\\frac{7.1ab}{0.103+a}-0.142b",
    //Eqn2LinearCoupledDiffText: "(7.1*a*b)/(0.103+a)-0.142*b",
    //Eqn3LinearCoupledDiffLatex: "\\frac{0.6ac}{0.103+a}-0.0102c",
    //Eqn3LinearCoupledDiffText: "(0.6*a*c)/(0.103+a)-0.0102*c",
    //DaByDtLatex: "\\frac{da}{dt}=",
    //DbByDtLatex: "\\frac{db}{dt}=",
    //DcByDtLatex: "\\frac{dc}{dt}=",
  };
  //\\frac{-0.09 \\cdot a \\cdot b}{0.103+a}-\\frac{0.84 \\cdot a \\cdot c}{0.425+a}
  //\\frac{7.1 \\cdot a \\cdot b}{0.103+a}-(0.142 \\cdot b)
  //\\frac{0.6 \\cdot a \\cdot c}{0.103+a}-(0.0102 \\cdot c)

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
    event.preventDefault();
    this.state.Eqns.forEach((elementObj) => {
      if (this.validateExpression(elementObj.TextEqn, elementObj.line)) {
        this.setState({ calculate: true });
      } else {
        alert("invalid equation");
        this.setState({ calculate: false });
      }
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
          {this.state.Eqns.length === 4 && this.state.calculate ? (
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
          ) : this.state.Eqns.length === 2 && this.state.calculate ? (
            <LinearCoupledDiffTwoEqn
              h={0.05}
              numberOfCycles={31}
              eqn1={this.state.Eqns[0].TextEqn}
              eqn2={this.state.Eqns[1].TextEqn}
              LineNames={[this.state.Eqns[0].line, this.state.Eqns[1].line]}
              a={1}
              b={0.5}
            />
          ) : this.state.Eqns.length === 3 && this.state.calculate ? (
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
          ) : null}
        </div>
      </div>
    );
  }
}

export default LinearCoupled;
