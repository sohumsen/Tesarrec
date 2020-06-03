import React from "react";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";
// inserts the required css to the <head> block.
// You can skip this, if you want to do that by yourself.
addStyles();

const MyMathQuill = (props) => {
  console.log(props.firstBit)
  console.log(props.NoEdit)
  return (
    <div>
      <StaticMathField>{props.firstBit}</StaticMathField>

      {!props.NoEdit?
            <EditableMathField
            latex={props.latex} // Initial latex value for the input field
            onChange={(mathField) => props.onInputChange(mathField)}
          />:
          null
    
    }

    </div>
  );
};

export default MyMathQuill;
