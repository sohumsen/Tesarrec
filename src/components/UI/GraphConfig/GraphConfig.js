import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import classes from "./GraphConfig.module.css";
import Input from "../Input/Input";
import CloseButton from "../Button/CloseButton";
import GenericButton from "../Button/GenericButton";
import MyErrorMessage from "../MyErrorMessage/MyErrorMessage";
import {
  Paper,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import CustomizedErrorMessage from "../MyErrorMessage/CustomizedErrorMessage";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { green } from "@material-ui/core/colors";

// import Paper from '../Paper/Paper'

export default function FormControlLabelPlacement(props) {
  // props.Eqns.map((Eqn) => {
  //   axisMenuItemsList.push(Eqn.line);
  //   return Eqn.line;
  // });
  console.log(props.Vars)
  let allAxis = props.Vars.filter(
    (Var) => (Var.VarType === "Independent" || Var.VarType === "Dependent")
  ).map((Var) => Var.LatexForm);
  console.log(allAxis)
  let menuItemsList = allAxis.map((menuItem) => {
    return <MenuItem value={menuItem}>{menuItem}</MenuItem>;
  });
  // let initialConditionsList = props.lineNames.map((line, i) => {
  //   return (
  //     <Input
  //       label={"Initial " + line}
  //       name={line}
  //       value={props.initialConditions[i]}
  //       onChange={props.onChange("initialConditions" + i)}
  //     />
  //   );
  // });

  return (
    <div>
      <Paper elevation={3}>
        <div className={classes.closeButton}>
          <CloseButton
            type="button"
            value="Close"
            displayValue="Close"
            onClick={props.onClose}
          />
        </div>

        <Tooltip title="Submit Config" placement="top" arrow>
          <span>
            <IconButton edge="end" aria-label="Submit" onClick={props.onSubmit}>
              <PlayCircleOutlineIcon style={{ color: green[500] }} />
            </IconButton>
          </span>
        </Tooltip>
        {/* <div className={classes.submitButton}>
            <GenericButton
              value="Submit"
              type="submit"
              displayValue="SUBMIT"
              onClick={props.onSubmit}
            />
          </div> */}
        <div className={classes.errorMessage}>
          {props.errorMessage ? <ErrorOutlineIcon color="secondary" /> : null}
        </div>

        <div className={classes.Container}>
          {/* <FormLabel component="legend">Horizontal Align</FormLabel>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top"
            value={props.LegendHorizontal}
            onChange={props.onChange("LegendHorizontal")}
          >
            <FormControlLabel
              value="left"
              control={<Radio color="primary" />}
              label="left"
              labelPlacement="start"
            />
            <FormControlLabel
              value="center"
              control={<Radio color="primary" />}
              label="center"
              labelPlacement="start"
            />
            <FormControlLabel
              value="right"
              control={<Radio color="primary" />}
              label="right"
              labelPlacement="start"
            />
          </RadioGroup>
          <FormLabel component="legend">Vertical Align</FormLabel>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top"
            value={props.LegendVertical}
            onChange={props.onChange("LegendVertical")}
          >
            <FormControlLabel
              value="top"
              control={<Radio color="primary" />}
              label="top"
              labelPlacement="start"
            />
            <FormControlLabel
              value="center"
              control={<Radio color="primary" />}
              label="center"
              labelPlacement="start"
            />
            <FormControlLabel
              value="bottom"
              control={<Radio color="primary" />}
              label="bottom"
              labelPlacement="start"
            />
          </RadioGroup>
          
           */}
          <div className={classes.model}>
            {/* <div className={classes.item}>{initialConditionsList}</div> */}
            {/* <div className={classes.item}>
              <Input
                label="Initial y"
                name="initialConditions"
                value={props.initialConditions}
                onChange={props.onChange("initialConditions")}
              />
            </div> */}
            {/* <div className={classes.item}>
              <Input
                label="Inititial t"
                type="text"
                value={props.t0}
                onChange={props.onChange("t0")}
              />
            </div> */}
            <div className={classes.item}>
              <Input
                label="Step size"
                type="text"
                value={props.h}
                onChange={props.onChange("h")}
              />
            </div>
            <div className={classes.methodChoice}>
              <Select value={props.method} onChange={props.onChange("method")}>
                <MenuItem value={"Euler"}>Euler</MenuItem>
                <MenuItem value={"Midpoint"}>Midpoint</MenuItem>
                <MenuItem value={"Heun"}>Heun</MenuItem>
                <MenuItem value={"Ralston"}>Ralston</MenuItem>
                <MenuItem value={"K3"}>K3</MenuItem>
                <MenuItem value={"SSP33"}>SSP33</MenuItem>
                <MenuItem value={"SSP43"}>SSP43</MenuItem>
                <MenuItem value={"RK4"}>RK4</MenuItem>
                <MenuItem value={"RK38"}>RK38</MenuItem>
                <MenuItem value={"RKF"}>RKF</MenuItem>
              </Select>
            </div>
          </div>
          <div className={classes.graph}>
            <div className={classes.item}>
              <Input
                label="Decimal Precision"
                type="text"
                value={props.DecimalPrecision}
                onChange={props.onChange("DecimalPrecision")}
              />
            </div>
            <div className={classes.item}>
              {/* <div className={classes.selectAxis}> */}
              <p>X axis</p>
              <Select value={props.xAxis} onChange={props.onChange("xAxis")}>
                {menuItemsList}
              </Select>
              {/* </div> */}
              {/* <div className={classes.selectAxis}> */}
            </div>

            <div className={classes.item}>
              <p>Y axis</p>
              <Select value={props.yAxis} onChange={props.onChange("yAxis")}>
                {menuItemsList}
              </Select>
            </div>

            {/* </div> */}
          </div>
        </div>
      </Paper>
    </div>
  );
}
