import React from "react";

import IconButton from "@material-ui/core/IconButton";
import { Tooltip, Paper } from "@material-ui/core";

import { red } from "@material-ui/core/colors";
import CloseIcon from "@material-ui/icons/Close";
import SettingsIcon from "@material-ui/icons/Settings";
import ImportExportIcon from "@material-ui/icons/ImportExport";

import { CSVLink } from "react-csv";

const LinearCoupledButtonGraphContainer = (props) => {
  let independents = props.modelObj.Vars.filter((el) => {
    return el.VarType === "Independent";
  }).map((Var) => Var.LatexForm);
  let dependents = props.modelObj.Vars.filter((el) => {
    return el.VarType === "Dependent";
  }).map((Var) => Var.LatexForm);
  let csvData = [[...dependents, ...independents]];

  if (props.modelObj.solutions.calcedSolution !== null) {
    csvData.push(...props.modelObj.solutions.calcedSolution);
  }
  return (
    <Paper>
      <Tooltip title="Config Equations" placement="top" arrow>
        <span>
          <IconButton
            disabled={!props.calculate}
            edge="end"
            aria-label="config"
            onClick={props.onGraphConfigOpen}
          >
            <SettingsIcon />
          </IconButton>
        </span>
      </Tooltip>

      <CSVLink data={csvData}>
        <Tooltip title="Download model" placement="top">
          <span>
            <IconButton edge="end" aria-label="Download">
              <ImportExportIcon />
            </IconButton>
          </span>
        </Tooltip>
      </CSVLink>
      <Tooltip title="Close" placement="top" arrow>
        <span>
          <IconButton edge="end" aria-label="add" onClick={props.onGraphClose}>
            <CloseIcon style={{ color: red[500] }} />
          </IconButton>
        </span>
      </Tooltip>
    </Paper>
  );
};

export default LinearCoupledButtonGraphContainer;
