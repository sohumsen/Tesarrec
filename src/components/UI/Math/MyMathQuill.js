import React from "react";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";

// inserts the required css to the <head> block.
// You can skip this, if you want to do that by yourself.
addStyles();

export default class MyMathQuill extends React.Component {
  state = {
    DyByDxLatex: "\\frac{dy}{dx}=",
    DaByDtLatex: "\\frac{da}{dt}=",
    DbByDtLatex: "\\frac{db}{dt}=",
    DcByDtLatex: "\\frac{dc}{dt}=",

  };

  render() {
    return (
      <div>
        <StaticMathField>{this.props.firstBit}</StaticMathField>
        <EditableMathField
          latex={this.props.latex} // Initial latex value for the input field
          onChange={(mathField) => this.props.onInputChange(mathField)}
        />
      </div>
    );
  }
}
