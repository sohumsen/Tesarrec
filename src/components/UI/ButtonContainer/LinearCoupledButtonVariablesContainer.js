import React from "react";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IconButton from "@material-ui/core/IconButton";
import { Tooltip, Paper } from "@material-ui/core";
import { blue,yellow,pink } from '@material-ui/core/colors';

const LinearCoupledButtonVariablesContainer = (props) => {
  return (
    <Paper>Parameters
      <Tooltip title="Add Constant" placement="top" arrow>
        <span>
          <IconButton
            edge="end"
            aria-label="add"
            onClick={()=>props.onIncrementVariable("Constant")}
            disabled={props.Vars.filter((Var) => {
              return Var.VarType === "Constant";
            }).length===9}
          >
            <AddBoxIcon style={{ color: pink[300] }}/>
          </IconButton>
        </span>
      </Tooltip>
      {/*<Tooltip title="Add Independent" placement="top" arrow>*/}
      {/*  <span>*/}
      {/*    <IconButton*/}
      {/*      edge="end"*/}
      {/*      aria-label="add"*/}
      {/*      onClick={()=>props.onIncrementVariable("Independent")}*/}
      {/*      // disabled={props.Vars.filter((Var) => {*/}
      {/*      //   return Var.VarType === "Independent";*/}
      {/*      // }).length===9}*/}
      {/*      disabled*/}
      {/*    >*/}
      {/*      <AddBoxIcon style={{ color: yellow[500] }}/>*/}
      {/*    </IconButton>*/}
      {/*  </span>*/}
      {/*</Tooltip>*/}
      {/*<Tooltip title="Add Dependent" placement="top" arrow>*/}
      {/*  <span>*/}
      {/*    <IconButton*/}
      {/*      edge="end"*/}
      {/*      aria-label="add"*/}
      {/*      onClick={()=>props.onIncrementVariable("Dependent")}*/}
      {/*      // disabled={props.Vars.filter((Var) => {*/}
      {/*      //   return Var.VarType === "Dependent";*/}
      {/*      // }).length===9}*/}
      {/*      disabled*/}

      {/*    >*/}
      {/*      <AddBoxIcon style={{ color: blue[500] }}/>*/}
      {/*    </IconButton>*/}
      {/*  </span>*/}
      {/*</Tooltip>*/}
     
     
    </Paper>
  );
};

export default LinearCoupledButtonVariablesContainer;
