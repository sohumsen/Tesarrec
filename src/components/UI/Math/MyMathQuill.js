import React from "react";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";
// inserts the required css to the <head> block.
// You can skip this, if you want to do that by yourself.
addStyles();

const MyMathQuill = (props) => {
  return (
    <div>
      <StaticMathField          
 >
        {props.firstBit}
      </StaticMathField>

      {!props.NoEdit ? (
        <EditableMathField
          // config={{
          //   substituteTextarea: function () {
          //     console.log("substituteTextarea");
          //     return document.createElement("textarea");
          //   },
          //   handlers: {
          //     edit: (mathField) => console.log("edit"),
          //     upOutOf: (mathField) => {
          //       console.log("upOutOf");
          //     },
          //     selectOutOf: (direction,mathField) => {
          //       console.log("selectOutOf");
          //     },
          //     moveOutOf: (mathField, dir, MQ) => {
          //       console.log("moveOutOf");

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
          //   console.log(mathField.text("df"), mathField.latex("2+5/6*4"))
          // }
          //onKeyDown={(mathField)=>{console.log(mathField)}}
          onChange={(mathField) => props.onInputChange(mathField)}
        />
      ) : null}
    </div>
  );
};

export default MyMathQuill;
