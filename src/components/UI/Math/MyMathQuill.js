import React from "react";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";
// inserts the required css to the <head> block.
// You can skip this, if you want to do that by yourself.
addStyles();

const MyMathQuill = (props) => {
  return (
    <div style={{width:"100%"}}>
      <EditableMathField
        style={{ fontSize: "14px" }}
        latex={props.firstBit}
        // mathquillDidMount={(mathField) =>
        // }
        onChange={(mathField) => props.onLHSInputChange(mathField)}
      />
      {/* &nbsp;&nbsp;&nbsp; */}
      {!props.NoEdit ? (
        <EditableMathField
          style={props.style}
          latex={props.secondBit} // Initial latex value for the input field
          // mathquillDidMount={(mathField) =>
          // }
          onChange={(mathField) => props.onInputChange(mathField)}
        />
      ) : null}
    </div>
  );
};

export default MyMathQuill;
