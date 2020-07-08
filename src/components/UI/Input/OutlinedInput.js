import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "8ch",
    },
  },
}));

export default function BasicTextFields(props) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        InputLabelProps={{
          style: {
            height: 25,
            ...{ top: `-9px` },
          },
        }}
        inputProps={{
          style: {
            height: 25,
            padding: "0 14px",
          },
        }}
        size="small"
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        label={props.label}
        name={props.name}
        onKeyDown={props.onKeyDown}
        variant="outlined"
      />
    </form>
  );
}
