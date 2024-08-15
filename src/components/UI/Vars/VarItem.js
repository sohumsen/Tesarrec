import React from "react";
import classes from "./VarItem.module.css";
import OutlinedInput from "../Input/OutlinedInput";
import { Paper } from "@material-ui/core";
import MinMaxSlider from "../SliderContainer/MinMaxSlider/MinMaxSlider";
import CloseButton from "../Button/CloseButton";
import { EditableMathField, StaticMathField } from "react-mathquill";
/**
 *
 *
 * @param {*} props
 */
const VarItem = (props) => {
  return (
    <li className={classes.Container} style={{ listStyleType: "none" }}>
      {props.VarType === "Independent" ? (
        <Paper
          className={classes.Dependent}
          style={{ backgroundColor: "rgb(250, 250, 230)" }}
        >
          <div className={classes.mathQuill}>
            <EditableMathField
              latex={props.LatexForm}
              onChange={(mathField) =>
                props.handleMathQuillInputChange(mathField)
              }
              style={{ fontSize: "14px" }}
            />
          </div>

          <div className={classes.inputs}>
            <div className={classes.input}>
              <OutlinedInput
                type={"text"}
                value={props.VarCurrent}
                onChange={props.handleVariableInputChange}
                label={"Current"}
                name={"VarCurrent"}
              />
            </div>
          </div>
          <div className={classes.RemoveButton}>
            <CloseButton
              disabled={true}
              type="button"
              value="removeItem"
              displayValue="REMOVEIT"
              onClick={props.removeItem}
            />
          </div>
          <div className={classes.ErrorMsg}>{props.error}</div>
        </Paper>
      ) : null}

      {props.VarType === "Dependent" ? (
        <Paper
          className={classes.Dependent}
          style={{ backgroundColor: "rgb(230, 250, 250)" }}
        >
          <div className={classes.mathQuill}>
            <EditableMathField
              latex={props.LatexForm}
              onChange={(mathField) =>
                props.handleMathQuillInputChange(mathField)
              }
              style={{ fontSize: "14px" }}
            />
            {/* <StaticMathField>{props.LatexForm}</StaticMathField> */}
          </div>

          <div className={classes.inputs}>
            <div className={classes.input}>
              <OutlinedInput
                type={"text"}
                value={props.VarCurrent}
                onChange={props.handleVariableInputChange}
                label={"Current"}
                name={"VarCurrent"}
              />
            </div>
          </div>
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
        </Paper>
      ) : null}

      {props.VarType === "Constant" ? (
        <Paper
          className={classes.Constant}
          style={{ backgroundColor: "rgb(250, 230, 250)" }}
        >
          <div className={classes.mathQuill}>
            <EditableMathField
              latex={props.LatexForm}
              onChange={(mathField) =>
                props.handleMathQuillInputChange(mathField)
              }
              style={{ fontSize: "14px" }}
            />
          </div>
          <div className={classes.inputs}>
            <div className={classes.input}>
              <OutlinedInput
                type={"text"}
                value={props.VarCurrent}
                onChange={props.handleVariableInputChange}
                label={"Current"}
                name={"VarCurrent"}
              />
            </div>
          </div>
          <div className={classes.slider}>
            <MinMaxSlider
              rootWidth={"100%"}
              inputWidth={25}
              value={props.VarCurrent}
              lowestVal={parseFloat(props.VarLow)}
              highestVal={props.VarHigh}
              handleVariableInputChange={props.handleVariableInputChange}
              SliderhandleChange={props.handleVariableInputChange}
            />
          </div>
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
        </Paper>
      ) : null}
    </li>
  );
};

export default VarItem;
