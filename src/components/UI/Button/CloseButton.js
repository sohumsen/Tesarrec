import CloseIcon from '@material-ui/icons/Close';


import React from "react";

import IconButton from "@material-ui/core/IconButton";

export default function SettingButton(props) {
  return (
    <div>
      <IconButton
        aria-label="close"
        type={props.type}
        value={props.value}
        onClick={props.onClick}
        disabled={props.disabled}
        style={{ color: "rgb(0, 0, 105)" }}
      >
        <CloseIcon style={{ fontSize: 15 }}/>
      </IconButton>
    </div>
  );
}