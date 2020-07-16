import React from "react";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "4ch",
    },
  },
}));

export default function BasicTextFields(props) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <input
      style={{width:props.width}}

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
        placeholder={props.label}
        variant="outlined"
      />
    </form>
  );
}
