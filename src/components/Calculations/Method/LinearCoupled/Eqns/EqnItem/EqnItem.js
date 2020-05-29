import React from "react";
import RemoveButton from '../../../../../UI/Button/RemoveButton'
import MyMathQuill from '../../../../../UI/Math/MyMathQuill'

const EqnItem = (props) => {
  return (
    <div>
      <MyMathQuill
        firstBit={props.DByDLatex}
        latex={props.LatexEqn}
        onInputChange={props.handleMathQuillInputChange}
      />
      <RemoveButton
        type="button"
        value="removeEqn"
        displayValue="REMOVEIT"
        onClick={props.removeEqn}
      />
    </div>
  );
};

export default EqnItem;
