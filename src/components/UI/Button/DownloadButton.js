import GetAppIcon from '@material-ui/icons/GetApp';

import React from "react";

import IconButton from "@material-ui/core/IconButton";

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
        <GetAppIcon />
      </IconButton>
    </div>
  );
}
