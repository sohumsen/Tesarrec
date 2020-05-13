import React from 'react'

import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import classes from './Slider.module.css'
const slider=(props)=>(

    <div className={classes.slider}>

    <p>{props.displayCaption} : {props.displayValue}</p>
    <Grid container spacing={0}>
      <Grid item>
        <p>{props.lowestVal}</p>
      </Grid>
      <Grid item xs>
        <Slider

          style={{ color: "rgb(255, 255, 255)" }}
          value={props.value}
          onChange={props.SliderhandleChange}

        />
      </Grid>
      <Grid item>
        <p>{props.highestVal}</p>
      </Grid>
    </Grid>

    </div>
)

export default slider