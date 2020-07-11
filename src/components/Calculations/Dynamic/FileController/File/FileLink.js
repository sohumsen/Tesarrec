import React from "react";
import RemoveButton from "../../../../UI/Button/RemoveButton";
import classes from "./FileLink.module.css";
const FileLink = (props) => {
  return (
    <li
      key={props.ModelId}
      className={classes.Container}
      style={{ listStyleType: "none" }}
      onClick={props.onExpandFileLink}
    >
      <div className={classes.RemoveButton}>
        <RemoveButton
          type="button"
          value="deleteLink"
          displayValue="DELETEIT"
          onClick={props.onRemoveFileLink}
        />
      </div>
      <div className={classes.Link}>
        <p >{props.ModelId}</p>
      </div>
    </li>
  );
};

export default FileLink;
