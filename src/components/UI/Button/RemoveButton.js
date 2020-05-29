import React from "react";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export default function RemoveButton(props) {
  return (
    <div>
      <IconButton
        aria-label="delete"
        type={props.type}
        value={props.value}
        onClick={props.onClick}
        disabled={props.disabled}
        style={{ color: "rgb(0, 0, 105)" }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
