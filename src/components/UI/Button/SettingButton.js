import SettingsIcon from '@material-ui/icons/Settings';

import React from "react";

import IconButton from "@material-ui/core/IconButton";

export default function SettingButton(props) {
  return (
    <div>
      <IconButton
        aria-label="config"
        type={props.type}
        value={props.value}
        onClick={props.onClick}
        disabled={props.disabled}
        style={{ color: "rgb(0, 0, 105)" }}
      >
        <SettingsIcon />
      </IconButton>
    </div>
  );
}
