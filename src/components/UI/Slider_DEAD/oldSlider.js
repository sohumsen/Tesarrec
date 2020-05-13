import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import classes from "./Slider.module.css";


export default function ContinuousSlider() {

  const [value, setValue] = React.useState(50);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue/100)
  };

  return (
    <div className={classes.root}>
        <p>Efficiency</p>
      <Grid container spacing={2}>
        <Grid item>
          <p>0</p>
        </Grid>
        <Grid item xs>
          <Slider
            className={classes.Slider}
            style={{ color: "rgb(255, 255, 255)" }}
            value={value}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <p>1</p>
        </Grid>
      </Grid>
    </div>
  );
}
