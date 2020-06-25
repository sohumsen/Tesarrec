import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import { MenuItem, withStyles } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 250,
    margin:-20
    
  },

  
  listItemText: {
    fontSize: 10, //Insert your required size
  },
});

class InteractiveList extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <MenuItem
          button
          onClick={() => { this.props.updateSelected(); this.props.onExpandFileLink();}}
          selected={this.props.ModelId === this.props.selected}
        >
            <ListItemAvatar >
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary={this.props.ModelId}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={this.props.onRemoveFileLink}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
        </MenuItem>
      </div>
    );
  }
}



export default withStyles(styles)(InteractiveList);
