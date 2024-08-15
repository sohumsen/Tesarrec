import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import React from "react";

import IconButton from "@material-ui/core/IconButton";

export default function SettingButton(props) {
  return (
    <div>
      <IconButton
        aria-label="forward"
        type={props.type}
        value={props.value}
        onClick={props.onClick}
        disabled={props.disabled}
        style={{ color: "rgb(0, 0, 105)" }}
      >
        <ArrowForwardIcon />
      </IconButton>
    </div>
  );
}