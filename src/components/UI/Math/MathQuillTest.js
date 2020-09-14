import React, { Component } from "react";
import MyMathQuill from "./MyMathQuill";

class MathQuillTest extends Component {
  state = {
    showTextForm: false,
    Eqn: {
    //   firstBit: "\\frac{db}{dt}=",
      secondBit: "\\frac{db}{dt}=",
      textEqn: "db/dt",
    },
  };
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({
              showTextForm: !this.state.showTextForm,
            });
          }}
        />
        {this.state.showTextForm ? (
          <input value={this.state.Eqn.textEqn} />
        ) : (
          <MyMathQuill
            // firstBit={this.state.Eqn.firstBit}
            secondBit={this.state.Eqn.secondBit}
            onInputChange={(mathField) => {
              let Eqn = this.state.Eqn;
              Eqn.secondBit = mathField.latex();
              Eqn.textEqn = mathField.text();
            }}
            onLHSInputChange={() => {}}
          />
        )}
      </div>
    );
  }
}
export default MathQuillTest;
