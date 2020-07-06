import React from "react";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import AddBoxIcon from "@material-ui/icons/AddBox";
import IconButton from "@material-ui/core/IconButton";
import { Tooltip, Menu, Paper } from "@material-ui/core";
import RestoreIcon from "@material-ui/icons/Restore";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const LinearCoupledButtonEqnsContainer = (props) => {
  return (
    <Paper >
    

      <Tooltip title="Add Equations" placement="top" arrow>
        <span>
          <IconButton
            disabled={props.Eqns.length === 4 || props.Eqns.length === 0}
            edge="end"
            aria-label="add"
            onClick={props.onIncrementEqn}
          >
            <AddBoxIcon />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title="Reset Equations" placement="top" arrow>
        <span>
          <IconButton
            disabled={props.Eqns.length === 0}
            edge="end"
            aria-label="Reset"
            onClick={props.resetForm}
          >
            <RestoreIcon />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title="Submit Equations" placement="top" arrow>
        <span>
          <IconButton
            disabled={props.Eqns.length === 0}
            edge="end"
            aria-label="Submit"
            onClick={props.handleMathQuillInputSubmit}
          >
            <PlayCircleOutlineIcon />
          </IconButton>
        </span>
      </Tooltip>
    </Paper>
  );
};

export default LinearCoupledButtonEqnsContainer;
