import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IconButton from "@material-ui/core/IconButton";
import { Tooltip, Menu, Paper } from "@material-ui/core";
import RestoreIcon from "@material-ui/icons/Restore";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const LinearCoupledButtonContainer = (props) => {
  return (
    <Paper >
      <Tooltip title="Config Equations" placement="top" arrow>
        <span>
          <IconButton
            disabled={!props.calculate}
            edge="end"
            aria-label="config"
            onClick={props.toggleChartShow}
          >
            <SettingsIcon />
          </IconButton>
        </span>
      </Tooltip>

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
            <ExitToAppIcon />
          </IconButton>
        </span>
      </Tooltip>
    </Paper>
  );
};

export default LinearCoupledButtonContainer;

// <div className={classes.ButtonContainer}>
//                 <div className={classes.Button}>
//                   <SettingButton
//                     disabled={!this.state.calculate}
//                     type="button"
//                     value="config"
//                     displayValue="CONFIG"
//                     onClick={this.toggleChartShow}
//                   />
//                 </div>
//                 <div className={classes.Button}>
//                   <AddButton
//                     type="button"
//                     value="addODE"
//                     disabled={
//                       this.state.Eqns.length === 4 ||
//                       this.state.Eqns.length === 0
//                     }
//                     displayValue="Add ODE"
//                     onClick={this.onIncrementEqn}
//                   />
//                 </div>
//                 <Tooltip title="Reset Equations" placement="top" arrow>
//                   <span>
//                     <IconButton
//                       edge="end"
//                       aria-label="reset"
//                       onClick={this.resetForm}
//                     >
//                       <AddBoxIcon />
//                     </IconButton>
//                   </span>
//                 </Tooltip>
//                 <div className={classes.Button}>
//                   <MyButton
//                     type="reset"
//                     value="Reset"
//                     displayValue="RESET"
//                     disabled={this.state.Eqns.length === 0}
//                     onClick={this.resetForm}
//                   />
//                 </div>

//                 <div className={classes.Button}>
//                   <MyButton
//                     type="submit"
//                     value="Submit"
//                     displayValue="SUBMIT"
//                     disabled={this.state.Eqns.length === 0}
//                   />
//                 </div>
//               </div>
