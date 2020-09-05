import React, { Component } from "react";

import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";

import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import DoneIcon from "@material-ui/icons/Done";

const styles = (theme) => ({
  root: {
    color: "grey",
  },
  content: {
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    "& $content": {
      paddingLeft: theme.spacing(2),
    },
  },
  // selected:{
  //   color: "red",

  // },
  expanded: {},
  label: {
    fontWeight: "inherit",
    color: "inherit",
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1,
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
});

class StlyedTreeItem extends Component {
  state = {
    currentModelName: "",
    showInputField: false,
  };
  componentDidMount() {
    this.setState({ currentModelName: this.props.labelText });
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
  onButtonPress = () => {
    this.setState(
      (prevState) => {
        return {
          showInputField: !prevState.showInputField,
        };
      },
      () => {
        this.props.onEditModelName(this.state.currentModelName);
      }
    );
  };

  handleClickAway = () => {
    // this.onButtonPress()

    this.setState({
      showInputField: false,
      currentModelName: this.props.labelText,
    });
  };

  onKeyDown = (e) => {
    if (e.key === "Enter") {
      // e.preventDefault();
      this.onButtonPress();
      // this.props.onEditModelName(this.state.currentModelName);
    }
  };

  render() {
    const { classes } = this.props;
    const { ...other } = this.props;
    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <TreeItem
          nodeId={this.props.nodeId}
          selected={
            this.props.selectedModelId !== this.props.modelId
              ? { color: "blue" }
              : { color: "red" }
          }
          onLabelClick={this.props.onExpandModelLink}
          onIconClick={this.props.onExpandModelLink}
          label={
            <div className={classes.labelRoot}>
              {!this.state.showInputField ? (
                <Typography variant="body2" className={classes.labelText}>
                  {this.props.labelText}
                </Typography>
              ) : (
                <input
                  width={"10px"}
                  type={"input"}
                  value={this.state.currentModelName}
                  onChange={this.onChangeFileName}
                  name={"currentModelName"}
                  onKeyDown={this.onKeyDown}
                />
              )}
            </div>
          }
          icon={
            <div className={classes.icon}>
              {!this.state.showInputField ? (
                <IconButton
                  edge="start"
                  size="small"
                  aria-label="edit"
                  onClick={this.onShowInputField}
                  disabled={
                    this.props.selectedModelId !== this.props.modelId ||
                    this.props.disabledEdit
                  }
                >
                  <EditIcon />
                </IconButton>
              ) : (
                <IconButton
                  edge="start"
                  size="small"
                  aria-label="Done"
                  onClick={this.onButtonPress}
                >
                  <DoneIcon />
                </IconButton>
              )}
            </div>
          }
          classes={{
            root: classes.root,
            content: classes.content,
            expanded: classes.expanded,
            // selected:classes.selected,
            group: classes.group,
            label: classes.label,
            icon: classes.icon,
          }}
          {...other}
        />
      </ClickAwayListener>
    );
  }
}

export default withStyles(styles)(StlyedTreeItem);
