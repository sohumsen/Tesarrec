import React from "react";

import classes from "./GraphConfig.module.css";
import Input from "../Input/Input";
import CloseButton from "../Button/CloseButton";

import {
  Paper,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { green } from "@material-ui/core/colors";

// import Paper from '../Paper/Paper'

export default function FormControlLabelPlacement(props) {
  // props.Eqns.map((Eqn) => {
  //   axisMenuItemsList.push(Eqn.line);
  //   return Eqn.line;
  // });
  let allAxis = props.Vars.filter(
    (Var) => (Var.VarType === "Independent" || Var.VarType === "Dependent")
  ).map((Var) => Var.LatexForm);
  let menuItemsList = allAxis.map((menuItem) => {
    return <MenuItem value={menuItem}>{menuItem}</MenuItem>;
  });
 

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
         
          <div className={classes.model}>
            
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
