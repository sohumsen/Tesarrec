import React, { Component } from "react";
import LinearCoupledDiffThreeEqn from "../../../../components/Calculations/Method/LinearCoupled/LinearCoupledDiffThreeEqn";
import LinearCoupledDiffTwoEqn from "../../../../components/Calculations/Method/LinearCoupled/LinearCoupledDiffTwoEqn";
import LinearCoupledDiffFourEqn from "../../../../components/Calculations/Method/LinearCoupled/LinearCoupledDiffFourEqn";

import MyMathQuill from "../../../../components/UI/Math/MyMathQuill";
import { evaluate } from "mathjs";
import MyButton from "../../../../components/UI/Button/Button";
import classes from "../SingleODE/SingleODE.module.css";

class LinearCoupled extends Component {
  /**
   * Visual Component that contains the textbox for the equation and calculation outputs
   * plus some equation labels
   *
   */

  //y1=a, y2=b,y3=c
  state = {
    calculate: true,

    Eqns: [
      {
        id: 0,
        DByDLatex: "\\frac{da}{dt}=",
        LatexEqn: "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
        TextEqn: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
      },
      {
        id: 1,
        DByDLatex: "\\frac{db}{dt}=",
        LatexEqn: "\\frac{7.1ab}{0.103+a}-0.142b",
        TextEqn: "(7.1*a*b)/(0.103+a)-0.142*b",
      },
      {
        id: 2,
        DByDLatex: "\\frac{dc}{dt}=",
        LatexEqn: "\\frac{0.6ac}{0.103+a}-0.0102c",
        TextEqn: "(0.6*a*c)/(0.103+a)-0.0102*c",
      },
      {
        id: 3,
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

  validateExpression = (expr) => {
    try {
      evaluate(expr, { a: 1, b: 1, c: 1, d: 1 });
      return true;
    } catch (error) {
      return false;
    }
  };

  handleMathQuillInputChange = (id) => (mathField) => {
    let eqn = this.state.Eqns[id];
    console.log(this.state.Eqns[id]);
    console.log({ ...this.state.Eqns[id] });

    eqn.id = id;
    eqn.DByDLatex = this.state.Eqns[id].DByDLatex;
    eqn.TextEqn = mathField.text();
    eqn.LatexEqn = mathField.latex();

    this.setState({
      [this.state.Eqns[id]]: eqn,
      calculate: false,
    });
  };

  handleMathQuillInputSubmit = (event) => {
    event.preventDefault();
    this.state.Eqns.forEach((elementObj) => {
      if (this.validateExpression(elementObj.TextEqn)) {
        this.setState({ calculate: true });
      } else {
        alert("invalid equation");
      }
    });
  };

  removeEqn = (id) => {
    console.log(id);

    let Eqns = [...this.state.Eqns];
    Eqns.splice(id, 1);
    console.log(Eqns);
    this.setState({
      Eqns: Eqns,
    });
  };

  resetForm = () => {
    this.setState({
      calculate: true,

      Eqns: [
        {
          id: 0,
          DByDLatex: "\\frac{da}{dt}=",
          LatexEqn: "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
          TextEqn: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
        },
        {
          id: 1,
          DByDLatex: "\\frac{db}{dt}=",
          LatexEqn: "\\frac{7.1ab}{0.103+a}-0.142b",
          TextEqn: "(7.1*a*b)/(0.103+a)-0.142*b",
        },
        {
          id: 2,
          DByDLatex: "\\frac{dc}{dt}=",
          LatexEqn: "\\frac{0.6ac}{0.103+a}-0.0102c",
          TextEqn: "(0.6*a*c)/(0.103+a)-0.0102*c",
        },
        {
          id: 3,
          DByDLatex: "\\frac{dd}{dt}=",
          LatexEqn: "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
          TextEqn: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
        },
      ],
    });
  };

  onIncrementEqn = (DynamicForm) => {
    console.log(DynamicForm[0]);
  };

  render() {
    const ListItems = this.state.Eqns.map((element) => {
      return (
        <li key={element.id}>
          <MyMathQuill
            firstBit={element.DByDLatex}
            latex={element.LatexEqn}
            onInputChange={this.handleMathQuillInputChange(element.id)}
          />
          <MyButton
            type="button"
            value="removeEqn"
            displayValue="REMOVEIT"
            onClick={() => this.removeEqn(element.id)}
          />
        </li>
      );
    });

    return (
      <div className={classes.Container}>
        <div className={classes.Form}>
          <MyButton
            type="button"
            value="addODE"
            displayValue="Add ODE"
            onClick={(ListItems) => this.onIncrementEqn(ListItems)}
          />
          <form onSubmit={this.handleMathQuillInputSubmit}>
            <ul style={{ listStyle: "none" }}>{ListItems}</ul>
            <div className={classes.ButtonPos}>
              <MyButton type="submit" value="Submit" displayValue="SUBMIT" />
              <MyButton
                type="reset"
                value="Reset"
                displayValue="RESET"
                onClick={this.resetForm}
              />
            </div>
          </form>
        </div>
        <div className={classes.Graph}>
          {ListItems.length === 4 && this.state.calculate ? (
            <LinearCoupledDiffFourEqn
              h={0.05}
              numberOfCycles={31}
              eqn1={this.state.Eqns[0].TextEqn}
              eqn2={this.state.Eqns[1].TextEqn}
              eqn3={this.state.Eqns[2].TextEqn}
              eqn4={this.state.Eqns[3].TextEqn}
              LineNames={["a", "b", "c", "d"]}
              a={1}
              b={0.5}
              c={1}
              d={0.5}
            />
          ) : ListItems.length === 2 && this.state.calculate ? (
            <LinearCoupledDiffTwoEqn
              h={0.05}
              numberOfCycles={31}
              eqn1={this.state.Eqns[0].TextEqn}
              eqn2={this.state.Eqns[1].TextEqn}
              LineNames={["a", "b"]}
              a={1}
              b={0.5}
            />
          ) : ListItems.length === 3 && this.state.calculate ? (
            <LinearCoupledDiffThreeEqn
              h={0.05}
              numberOfCycles={31}
              eqn1={this.state.Eqns[0].TextEqn}
              eqn2={this.state.Eqns[1].TextEqn}
              eqn3={this.state.Eqns[2].TextEqn}
              LineNames={["a", "b", "c"]}
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
