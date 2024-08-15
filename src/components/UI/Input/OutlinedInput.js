import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "4.2ch",
    },
  },
}));

export default function BasicTextFields(props) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <input
        style={{ width: props.width }}
        size="small"
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        label={props.label}
        name={props.name}
        onKeyDown={props.onKeyDown}
        placeholder={props.label}
        variant="outlined"
      />
    </form>
  );
}
