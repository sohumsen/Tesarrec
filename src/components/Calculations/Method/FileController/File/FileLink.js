import React from "react";
import RemoveButton from "../../../../UI/Button/RemoveButton";
import classes from "./FileLink.module.css";
const FileLink = (props) => {
  return (
    <li
      key={props.id}
      className={classes.Container}
      style={{ listStyleType: "none" }}
    >
      <li className={classes.RemoveButton}>
        <RemoveButton
          disabled={props.disabledRemoveButton}
          type="button"
          value="removeEqn"
          displayValue="REMOVEIT"
          onClick={props.removeEqn}
        />
      </li>
      <div className={classes.ErrorMsg}>{props.error}</div>
    </li>
  );
};

export default FileLink;
