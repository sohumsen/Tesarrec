import React from "react";
import Button from "@material-ui/core/Button";

export default function MyButton(props) {
  return (
    <div>
      <Button
        type={props.type}
        value={props.value}
        onClick={props.onClick}
        disabled={props.disabled}
        variant="contained"
        color="primary"
      >
        {props.displayValue}
      </Button>
    </div>
  );
}
