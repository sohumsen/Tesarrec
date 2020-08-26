import React from "react";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IconButton from "@material-ui/core/IconButton";
import { Tooltip,  Paper } from "@material-ui/core";
import RestoreIcon from "@material-ui/icons/Restore";
import { green } from "@material-ui/core/colors";
const LinearCoupledButtonEqnsContainer = (props) => {
  return (
    <Paper>Equations
      <Tooltip title="Add Equations" placement="top" arrow>
        <span>
          <IconButton
            disabled={props.Eqns.length === 10 || props.Eqns.length === 0}
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
            <PlayCircleOutlineIcon style={{ color: green[500] }} />
          </IconButton>
        </span>
      </Tooltip>

      {/* <Tooltip
        style={{ float: "right" }}
        title="Reset Layout"
        placement="top"
        arrow
      >
        <span>
          <IconButton
            edge="start"
            aria-label="Reset"
            onClick={props.onResetLayout}
          >
            <RestorePageIcon />
          </IconButton>
        </span>
      </Tooltip> */}
    </Paper>
  );
};

export default LinearCoupledButtonEqnsContainer;
