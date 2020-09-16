import React from "react";
import MyMathQuill from "../Math/MyMathQuill";
import classes from "./EqnItem.module.css";
import CloseButton from "../Button/CloseButton";
import { StaticMathField } from "react-mathquill";
const EqnItem = (props) => {
  return (
    <li className={classes.Container} style={{ listStyleType: "none" }}>
      <div className={classes.EqnText}>
        {props.showMathQuillBox ? (
          <MyMathQuill
            firstBit={props.LHSLatexEqn}
            onLHSInputChange={props.handleLHSEqnInputChange}
            secondBit={props.LatexEqn}
            // mathquillDidMount={props.mathquillDidMount}
            onInputChange={props.handleMathQuillInputChange}
            style={{
              fontSize: "14px",
              width: "80%",
            }}
          />
        ) : (
          <div>
            <StaticMathField style={{ fontSize: "14px" }}>
              {props.LHSLatexEqn}
            </StaticMathField>
            <input
              onChange={props.handleTextEqnInputChange}
              value={props.TextEqn}
            />
          </div>
        )}
      </div>

     
      {props.error ? (
        <div className={classes.ErrorMsg}>{props.error}</div>
      ) : null}
       <div className={classes.RemoveButton}>
        <CloseButton
          disabled={props.disabledRemoveButton}
          type="button"
          value="removeItem"
          displayValue="REMOVEIT"
          onClick={props.removeItem}
        />
      </div>
    </li>
  );
};

export default EqnItem;
