import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles({
  root: {
    width: (props) => props.rootWidth,
  },
  input: {
    width: (props) => props.inputWidth,
  },
});

const InputSlider = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Grid container spacing={1} >
        <Grid item >
          <InputBase
            style={{ color: "black" }}
            className={classes.input}
            value={props.lowestVal}
            margin="dense"
            name={"VarLow"}

            onChange={props.handleVariableInputChange}

          />
        </Grid>
        <Grid item xs>
          <Slider
            style={{ color: "black" }}
            value={props.value}
            onChange={props.SliderhandleChange}
            min={props.lowestVal}
            max={props.highestVal}
            step={props.highestVal / 1000}
          />
        </Grid>
        <Grid item >
          <InputBase
            style={{ color: "black" }}
            className={classes.input}
            value={props.highestVal}
            margin="dense"
            name={"VarHigh"}
            onChange={props.handleVariableInputChange}

          />
        </Grid>
      </Grid>
    </div>
  );
};

export default InputSlider;
