import React from "react";
import RemoveButton from "../../../UI/Button/RemoveButton";
import MyMathQuill from "../../../UI/Math/MyMathQuill";
import classes from "./EqnItem.module.css";
import CloseButton from "../../../UI/Button/CloseButton";
const EqnItem = (props) => {
  return (
    <li className={classes.Container} style={{ listStyleType: "none" }}>
      <div className={classes.RemoveButton}>
        <CloseButton
          disabled={props.disabledRemoveButton}
          type="button"
          value="removeItem"
          displayValue="REMOVEIT"
          onClick={props.removeItem}
        />
      </div>
      <div className={classes.ErrorMsg}>{props.error}</div>

      <MyMathQuill
        firstBit={props.DByDLatex}
        latex={props.LatexEqn}
        onInputChange={props.handleMathQuillInputChange}
        width="auto"
      />
    </li>
  );
};

export default EqnItem;
