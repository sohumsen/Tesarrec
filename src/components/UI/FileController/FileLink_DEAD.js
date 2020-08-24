import React, { Component } from "react";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import DoneIcon from "@material-ui/icons/Done";
import { MenuItem, withStyles, Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import OutlinedInput from "../Input/OutlinedInput";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: 0,
    listStyle: "none",
  },

  listItemText: {
    fontSize: 12, //Insert your required size
  },
  editIcon: {
    margin: 0,
  },
  selected: {
    color: "black",
  },
});

class FileLink extends Component {
  state = {
    newFileName: "",
    showInputField: false,
  };
  componentDidMount() {
    this.setState({ newFileName: this.props.fileName });
  }
  onShowInputField = () => {
    this.setState((prevState) => {
      return {
        showInputField: !prevState.showInputField,
      };
    });
  };

  onChangeFileName = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onButtonPress = (e) => {
    this.setState(
      (prevState) => {
        return {
          showInputField: !prevState.showInputField,
        };
      },
      () => {
        this.props.onEditModelName(this.state.newFileName);
      }
    );
  };

  handleClickAway = () => {
    this.setState({ showInputField: false, newFileName: this.props.fileName });
  };

  onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <MenuItem
            button
            onClick={() => {
              this.props.onExpandModelLink();
            }}
            selected={this.props.selectedModelId === this.props.ModelId}
            classes={{ selected: classes.selected }}
          >
            {!this.state.showInputField ? (
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary={this.props.fileName}
              />
            ) : (
              <input
                style={{width:"10px"}}
                type="input"
                value={this.state.newFileName}
                onChange={this.onChangeFileName}
                name="newFileName"
                onKeyDown={this.onKeyDown}
              />
            )}

            {!this.state.showInputField ? (
              <ListItemSecondaryAction
                classes={{ primary: classes.removeIcon }}
              >
                <Tooltip title="Edit name" placement="right" arrow>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={this.onShowInputField}
                    disabled={this.props.selectedModelId !==this.props.ModelId || this.props.disabledEdit}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            ) : (
              <ListItemSecondaryAction
                classes={{ primary: classes.removeIcon }}
              >
                <Tooltip title="Done" placement="right" arrow>
                  <IconButton
                    edge="end"
                    aria-label="Done"
                    onClick={this.onButtonPress}
                  >
                    <DoneIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            )}
          </MenuItem>
        </ClickAwayListener>
      </div>
    );
  }
}

export default withStyles(styles)(FileLink);
