import React from "react";
import RemoveButton from '../../../../UI/Button/RemoveButton'
import MyMathQuill from '../../../../UI/Math/MyMathQuill'
import classes from './EqnItem.module.css'
const EqnItem = (props) => {
  return (
    <li key={props.id} className={classes.Container} style={{listStyleType:"none"}}>
      <MyMathQuill
        firstBit={props.DByDLatex}
        latex={props.LatexEqn}
        onInputChange={props.handleMathQuillInputChange}
      />
      <li className={classes.RemoveButton}>
      <RemoveButton
      disabled={props.disabledRemoveButton}
        type="button"
        value="removeEqn"
        displayValue="REMOVEIT"
        onClick={props.removeEqn}
      />
      </li>
      <div className={classes.ErrorMsg}>
      {props.error}

      </div>

    </li>
  );
};

export default EqnItem;
