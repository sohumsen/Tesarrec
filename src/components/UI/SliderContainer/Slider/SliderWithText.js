import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
  root: {
    padding:"10px",
    width: 300,
  },
  input: {
    width: 62,
  },
});

const InputSlider=(props)=>{
  const classes = useStyles();


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
            style={{ color: "rgb(255, 255, 255)" }}
            value={props.value}
            onChange={props.SliderhandleChange}
            min= {props.lowestVal}
            max= {props.highestVal}
            step={props.highestVal/1000}


          />
        </Grid>
        <Grid item>
          <Input
            style={{ color: "rgb(255, 255, 255)" }}

            className={classes.input}
            value={props.value}
            margin="dense"
            onChange={props.InputhandleChange}
            inputProps={{
              step: props.highestVal/100,
              min: props.lowestVal,
              max: props.highestVal,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}


export default InputSlider