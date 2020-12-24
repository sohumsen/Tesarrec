import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles({
  root: {
    width: (props) => props.rootWidth,
    float: "left",
  },
  input: {
    width: (props) => props.inputWidth,
  },
});

const InputSlider = (props) => {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        <i>{props.displayCaption}</i>
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <p>{props.lowestVal}</p>
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
        <Grid item>
          <InputBase
            style={{ color: "black" }}
            className={classes.input}
            value={props.value}
            margin="dense"
            onChange={props.InputhandleChange}
            inputProps={{
              step: props.highestVal / 100,
              min: props.lowestVal,
              max: props.highestVal,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default InputSlider;
