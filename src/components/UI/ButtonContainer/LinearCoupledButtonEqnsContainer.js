import React from "react";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IconButton from "@material-ui/core/IconButton";
import { Tooltip, Paper } from "@material-ui/core";
import RestoreIcon from "@material-ui/icons/Restore";
import { green } from "@material-ui/core/colors";
import TextFormatIcon from "@material-ui/icons/TextFormat";
import DnsIcon from "@material-ui/icons/Dns";
import WebIcon from "@material-ui/icons/Web";
const LinearCoupledButtonEqnsContainer = (props) => {
  return (
    <Paper>
      <Tooltip title="Add Equations" placement="top" arrow>
        <span>
          <IconButton
            disabled={props.Eqns.length === 11 || props.Eqns.length === 0}
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
            // disabled={props.Eqns.length === 0}
            edge="end"
            aria-label="Reset"
            onClick={props.resetForm}
          >
            <RestoreIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Text Equations" placement="top" arrow>
        <span>
          <IconButton
            disabled={props.Eqns.length === 0}
            edge="end"
            aria-label="Submit"
            onClick={props.handleChangeShowMathQuillBox}
          >
            <TextFormatIcon />
          </IconButton>
        </span>
      </Tooltip>

      {props.localSolver ? (
        <Tooltip title="Switch to Remote Server" placement="top" arrow>
          <span>
            <IconButton
              disabled={props.Eqns.length === 0}
              edge="end"
              aria-label="Submit"
              onClick={props.handleChangeLocalToServer}
            >
              <WebIcon />
            </IconButton>
          </span>
        </Tooltip>
      ) : (
        <Tooltip title="Switch to Local" placement="top" arrow>
          <span>
            <IconButton
              disabled={props.Eqns.length === 0}
              edge="end"
              aria-label="Remote"
              onClick={props.handleChangeLocalToServer}
            >
              <DnsIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
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
