import React from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(200, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);
export default function CustomizedErrorMessage(props) {
  return (
    <div>
      <HtmlTooltip title={<React.Fragment>{props.msg}</React.Fragment>}>
        <IconButton
          edge="end"
          aria-label="config"
          size="small"
          color="secondary"
        >
          <ErrorOutlineIcon />
        </IconButton>
      </HtmlTooltip>
    </div>
  );
}
