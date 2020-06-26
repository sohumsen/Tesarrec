import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { MenuItem, withStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Input from "../Input/Input";
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    margin: -20,
  },

  listItemText: {
    fontSize: 10, //Insert your required size
  },
  editIcon: {
    margin: 20,
  },
});

class FileLink extends Component {
  state = {
    newFileName: "",
    showInputField: false,
  };
  onShowInputField = () => {
    console.log(this.state.showInputField);
    this.setState((prevState) => {
      return {
        showInputField: !prevState.showInputField,
        // newFileName:this.props.fileName
      };
    });
  };

  onChangeFileName = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        console.log(this.state.newFileName);
      }
    );
  };

  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.props.onEditFileLinkName(this.state.newFileName);
      this.setState({showInputField:false})
    }
  };
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <MenuItem
          button
          onClick={() => {
            this.props.onExpandFileLink();
          }}
          selected={this.props.ModelId === this.props.selectedModelId}
        >
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>

          {!this.state.showInputField ? (
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary={this.props.fileName}
            />
          ) : (
            <Input
              type={"input"}
              value={this.state.newFileName}
              onChange={this.onChangeFileName}
              name={"newFileName"}
              onKeyDown={this._handleKeyDown}
            />
          )}

          <ListItemSecondaryAction classes={{ primary: classes.removeIcon }}>
          
            <IconButton
            edge="end"
            aria-label="edit"
            onClick={this.onShowInputField}
          >
            <EditIcon />
          </IconButton>
          </ListItemSecondaryAction>
        </MenuItem>
      </div>
    );
  }
}

export default withStyles(styles)(FileLink);
