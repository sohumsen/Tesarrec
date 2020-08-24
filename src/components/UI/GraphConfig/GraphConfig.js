import React from "react";

import classes from "./GraphConfig.module.css";
import Input from "../Input/Input";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";

import {
  Paper,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { green, red } from "@material-ui/core/colors";

// import Paper from '../Paper/Paper'

export default function FormControlLabelPlacement(props) {

  let allAxis = props.modelObj.Vars.filter(
    (Var) => Var.VarType === "Independent" || Var.VarType === "Dependent"
  ).map((Var) => Var.LatexForm);
  let menuItemsList = allAxis.map((menuItem) => {
    return <MenuItem value={menuItem}>{menuItem}</MenuItem>;
  });

  return (
    <div>
      <Paper elevation={3}>
        {/* <Tooltip title="Save Config" placement="top" arrow>
          <span>
            <IconButton edge="end" aria-label="Save" onClick={props.onSubmit}>
              <SaveIcon style={{ color: green[500] }} />
            </IconButton>
          </span>
        </Tooltip> */}

        <div className={classes.Container}>
        <div className={classes.closeButton}>
              <Tooltip title="Close Config" placement="top" arrow>
                <span>
                  <IconButton
                    edge="end"
                    aria-label="Close"
                    onClick={props.onClose}
                  >
                    <CloseIcon style={{ color: red[500] }} />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
          <div className={classes.modelAttributes}>
            
            <div className={classes.item}>
              <Input
                label="Step size"
                type="text"
                value={props.modelObj.Config.h}
                onChange={props.onChange("h")}
              />
            </div>
            <div className={classes.item}>
              <Input
                label="Num cycles"
                type="text"
                value={props.modelObj.Config.numOfCycles}
                onChange={props.onChange("numOfCycles")}
              />
            </div>
            <div className={classes.methodChoice}>
              <Select value={props.modelObj.Config.method} onChange={props.onChange("method")}>
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
          <div className={classes.graphAttributes}>
            <div className={classes.item}>
              <Input
                label="Precision"
                type="text"
                value={props.modelObj.Config.DecimalPrecision}
                onChange={props.onChange("DecimalPrecision")}
              />
            </div>
            <div className={classes.item}>
              {/* <div className={classes.selectAxis}> */}
              <p>X axis</p>
              <Select value={props.modelObj.Config.xAxis} onChange={props.onChange("xAxis")}>
                {menuItemsList}
              </Select>
              {/* </div> */}
              {/* <div className={classes.selectAxis}> */}
            </div>

            <div className={classes.item}>
              <p>Y axis</p>
              <Select value={props.modelObj.Config.yAxis} onChange={props.onChange("yAxis")}>
                {menuItemsList}
              </Select>
            </div>

            {/* </div> */}
          </div>
        </div>
      </Paper>
      <div className={classes.errorMessage}>
        {props.modelObj.Eqns[0].errorMessage ? (
          <div>
            <ErrorOutlineIcon color="secondary" />
            {props.errorMessage}{" "}
          </div>
        ) : null}
      </div>
    </div>
  );
}
