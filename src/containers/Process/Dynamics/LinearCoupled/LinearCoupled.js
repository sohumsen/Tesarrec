import React, { Component } from "react";
import LinearCoupledDiffThreeEqn from "../../../../components/Calculations/Method/LinearCoupled/Calcs/LinearCoupledDiffThreeEqn";
import LinearCoupledDiffTwoEqn from "../../../../components/Calculations/Method/LinearCoupled/Calcs/LinearCoupledDiffTwoEqn";
import LinearCoupledDiffFourEqn from "../../../../components/Calculations/Method/LinearCoupled/Calcs/LinearCoupledDiffFourEqn";
import EqnItems from "../../../../components/Calculations/Method/LinearCoupled/Eqns/EqnItems";
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
        id: "qwert",
        DByDLatex: "\\frac{da}{dt}=",
        LatexEqn: "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
        TextEqn: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
      },
      {
        id: "yuiop",
        DByDLatex: "\\frac{db}{dt}=",
        LatexEqn: "\\frac{7.1ab}{0.103+a}-0.142b",
        TextEqn: "(7.1*a*b)/(0.103+a)-0.142*b",
      },
      {
        id: "asdfg",
        DByDLatex: "\\frac{dc}{dt}=",
        LatexEqn: "\\frac{0.6ac}{0.103+a}-0.0102c",
        TextEqn: "(0.6*a*c)/(0.103+a)-0.0102*c",
      },
      {
        id: "hjklz",
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
    console.log(this.state.Eqns.length)
    if (this.state.Eqns.length===4){
      try {
        evaluate(expr, { a: 1, b: 1, c: 1, d: 1 });
        return true;
      } catch (error) {
        return false;
      }

    }else if (this.state.Eqns.length===3){
      try {
        evaluate(expr, { a: 1, b: 1, c: 1 });
        return true;
      } catch (error) {
        return false;
      }
    }else if (this.state.Eqns.length===2){
      try {
        evaluate(expr, { a: 1, b: 1});
        return true;
      } catch (error) {
        return false;
      }
    }else if (this.state.Eqns.length===1){
      try {
        evaluate(expr, { a: 1});
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
    console.log(Eqns);

    this.setState({ Eqns: Eqns, calculate:false });
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
    this.setState((prevState) => {
      return {
        calculate:false,
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
          DByDLatex: "\\frac{da}{dt}=",
          LatexEqn: "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
          TextEqn: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
        },
        {
          id: "yuiop",
          DByDLatex: "\\frac{db}{dt}=",
          LatexEqn: "\\frac{7.1ab}{0.103+a}-0.142b",
          TextEqn: "(7.1*a*b)/(0.103+a)-0.142*b",
        },
        {
          id: "asdfg",
          DByDLatex: "\\frac{dc}{dt}=",
          LatexEqn: "\\frac{0.6ac}{0.103+a}-0.0102c",
          TextEqn: "(0.6*a*c)/(0.103+a)-0.0102*c",
        },
        {
          id: "hjklz",
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
        DByDLatex: "\\frac{da}{dt}=",
        LatexEqn: "-\\frac{0.09ab}{0.103+a}-\\frac{0.84ac}{0.425+a}",
        TextEqn: "-(0.09*a*b)/(0.103+a)-(0.84*a*c)/(0.425+a)",
      },
      {
        id: "yuiop",
        DByDLatex: "\\frac{db}{dt}=",
        LatexEqn: "\\frac{7.1ab}{0.103+a}-0.142b",
        TextEqn: "(7.1*a*b)/(0.103+a)-0.142*b",
      },
      {
        id: "asdfg",
        DByDLatex: "\\frac{dc}{dt}=",
        LatexEqn: "\\frac{0.6ac}{0.103+a}-0.0102c",
        TextEqn: "(0.6*a*c)/(0.103+a)-0.0102*c",
      },
      {
        id: "hjklz",
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
        calculate:false
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

    // let ListItems = this.state.Eqns.map((element) => {
    //   return (
    //     <div key={element.id}>
    //       <li>
    //         <MyMathQuill
    //           firstBit={element.DByDLatex}
    //           latex={element.LatexEqn}
    //           onInputChange={this.handleMathQuillInputChange( element.id)}
    //         />
    //         <MyButton
    //           type="button"
    //           value="removeEqn"
    //           displayValue="REMOVEIT"
    //           onClick={() => this.removeEqn(element.id)}
    //         />
    //       </li>
    //     </div>
    //   );
    // });

    return (
      <div className={classes.Container}>
        <div className={classes.Form}>
          <form onSubmit={this.handleMathQuillInputSubmit}>
            <ul style={{ listStyle: "none" }}>{Eqns}</ul>
            <div className={classes.ButtonPos}>
              <MyButton
                type="button"
                value="addODE"
                disabled={this.state.Eqns.length === 4}
                displayValue="Add ODE"
                onClick={this.onIncrementEqn}
              />
              <MyButton type="submit" value="Submit" displayValue="SUBMIT" />
              <MyButton
                type="reset"
                value="Reset"
                displayValue="RESET"
                onClick={this.resetForm}
              />
            </div>
          </form>

          <div className={classes.Graph}>
            {this.state.Eqns.length === 4 && this.state.calculate ? (
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
            ) : this.state.Eqns.length === 2 && this.state.calculate ? (
              <LinearCoupledDiffTwoEqn
                h={0.05}
                numberOfCycles={31}
                eqn1={this.state.Eqns[0].TextEqn}
                eqn2={this.state.Eqns[1].TextEqn}
                LineNames={["a", "b"]}
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
                LineNames={["a", "b", "c"]}
                a={1}
                b={0.5}
                c={0.75}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default LinearCoupled;
