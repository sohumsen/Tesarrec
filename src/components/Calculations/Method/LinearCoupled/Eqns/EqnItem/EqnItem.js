import React from "react";
import RemoveButton from '../../../../../UI/Button/RemoveButton'
import MyMathQuill from '../../../../../UI/Math/MyMathQuill'
import classes from './EqnItem.module.css'
const EqnItem = (props) => {
  return (
    <div key={props.id} className={classes.Container}>
      <MyMathQuill
        firstBit={props.DByDLatex}
        latex={props.LatexEqn}
        onInputChange={props.handleMathQuillInputChange}
      />
      <div className={classes.RemoveButton}>
      <RemoveButton
      disabled={props.disabledRemoveButton}
        type="button"
        value="removeEqn"
        displayValue="REMOVEIT"
        onClick={props.removeEqn}
      />
      </div>

    </div>
  );
};

export default EqnItem;
