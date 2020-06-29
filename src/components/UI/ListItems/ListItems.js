import React, { Component } from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import FolderIcon from "@material-ui/icons/Folder";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import { MenuItem, withStyles, Tooltip } from "@material-ui/core";
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
  selected: {},
});

class FileLink extends Component {
  state = {
    newFileName: "",
    showInputField: false,
  };

  onShowInputField = () => {
    this.setState((prevState) => {
      return {
        showInputField: !prevState.showInputField,
        newFileName: this.props.fileName,
      };
    });
  };

  onChangeFileName = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.props.onEditFileLinkName(this.state.newFileName);
      this.setState({ showInputField: false, newFileName: "" });
    }
  };

  handleClickAway = () => {
    console.log(this.state.newFileName, this.props.fileName);

    // this.props.onEditFileLinkName(this.state.newFileName);
    // this.setState({ showInputField: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        {/*onClickAway={this.handleClickAway}*/}
        <div className={classes.root}>
          <MenuItem
            button
            onClick={() => {
              this.props.onExpandFileLink();
            }}
            selected={this.props.ModelId === this.props.selectedModelId}
            classes={{ selected: classes.selected }}
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
              <Tooltip title="Edit name" placement="right" arrow>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={this.onShowInputField}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </MenuItem>
        </div>
      </ClickAwayListener>
    );
  }
}

export default withStyles(styles)(FileLink);
