import React from "react";

import IconButton from "@material-ui/core/IconButton";

export default function RemoveButton(props) {
  return (
    <div>
      <IconButton
        aria-label="add"
        type={props.type}
        value={props.value}
        onClick={props.onClick}
        disabled={props.disabled}
        style={{ color: "rgb(0, 0, 105)" }}
      >
+      </IconButton>
    </div>
  );
}
