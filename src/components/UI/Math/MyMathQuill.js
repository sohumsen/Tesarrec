import React from "react";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";
// inserts the required css to the <head> block.
// You can skip this, if you want to do that by yourself.
addStyles();

const MyMathQuill = (props) => {
  return (
    <div>
      <StaticMathField style={{ fontSize: "14px" }}>
        {props.firstBit}
      </StaticMathField>

      {!props.NoEdit ? (
        <EditableMathField
          // config={{
          //   substituteTextarea: function () {
          //     return document.createElement("textarea");
          //   },
          //   handlers: {
          //     upOutOf: (mathField) => {
          //     },
          //     selectOutOf: (direction,mathField) => {
          //     },
          //     moveOutOf: (mathField, dir, MQ) => {

          //       if (dir === MQ.L) {
          //         return null;
          //       }
          //     },
          //   },
          // }}
          // style={{ width: props.width }}
          // style={{ fontSize: props.fontSize }}
          style={props.style}
          latex={props.latex} // Initial latex value for the input field
          // mathquillDidMount={(mathField) =>
          // }
          onChange={(mathField) => props.onInputChange(mathField)}
        />
      ) : null}
    </div>
  );
};

export default MyMathQuill;
