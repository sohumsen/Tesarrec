import { IconButton, Tooltip } from "@material-ui/core";
import React from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import classes from "./FullScreenWrapper.module.css";
function FullScreenWrapper(props) {
  const handle = useFullScreenHandle();

  return (
    <div className={classes.Container}>
      <div className={classes.Button}>
        <Tooltip title="Full screen" placement="top" arrow>
          <span>
            <IconButton edge="end" aria-label="add" onClick={handle.enter}>
              <FullscreenIcon />
            </IconButton>
          </span>
        </Tooltip>
      </div>
      <div className={classes.Content}>
        <FullScreen handle={handle}>{props.children}</FullScreen>
      </div>
    </div>
  );
}

export default FullScreenWrapper;
