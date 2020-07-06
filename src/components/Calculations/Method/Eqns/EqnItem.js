import React from "react";
import RemoveButton from "../../../UI/Button/RemoveButton";
import MyMathQuill from "../../../UI/Math/MyMathQuill";
import classes from "./EqnItem.module.css";
const EqnItem = (props) => {
  return (
    <li
      className={classes.Container}
      style={{ listStyleType: "none" }}
    >
 
      
      <div className={classes.RemoveButton}>
        <RemoveButton
          disabled={props.disabledRemoveButton}
          type="button"
          value="removeItem"
          displayValue="REMOVEIT"
          onClick={props.removeItem}
        />
      </div>
      <MyMathQuill
        firstBit={props.DByDLatex}
        latex={props.LatexEqn}
        onInputChange={props.handleMathQuillInputChange}
        width="60%"
      />
      <div className={classes.ErrorMsg}>{props.error}</div>
    </li>
  );
};

export default EqnItem;
