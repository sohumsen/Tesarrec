import React from "react";
import MyMathQuill from "../Math/MyMathQuill";
import classes from "./EqnItem.module.css";
import CloseButton from "../Button/CloseButton";
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
        // mathquillDidMount={props.mathquillDidMount}
        onInputChange={props.handleMathQuillInputChange}
        style={{
          fontSize: "14px",
          width: "65%",
        }}
      />
    </li>
  );
};

export default EqnItem;
