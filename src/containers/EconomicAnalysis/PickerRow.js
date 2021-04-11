import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";

import SliderWithText from "../../components/UI/SliderContainer/Slider/SliderWithText";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
  },
}));

export default function NestedGrid(props) {
  const classes = useStyles();

  function FormRow(props) {
    return (
      <React.Fragment>
        <Grid item xs={5}>
          <Paper
            className={classes.paper}
            style={{
              fontSize: 14,
            }}
          >
            {props.label.Name}
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper
            className={classes.paper}
            style={{
              fontSize: 12,
              fontStyle: "italic",
            }}
          >
            {props.label.Unit}
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <SliderWithText
              rootWidth={"100%"}
              inputWidth={72}
              value={parseFloat(props.label.BaseSizeDefault)}
              lowestVal={parseFloat(props.label.BaseSizeMin)}
              highestVal={parseFloat(props.label.BaseSizeMax)}
              SliderhandleChange={props.SliderhandleChange(props.label.Name)}
              InputhandleChange={props.InputhandleChange(props.label.Name)}
            />
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={1}>
          <FormRow
            label={props.label}
            SliderhandleChange={props.SliderhandleChange}
            InputhandleChange={props.InputhandleChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}
