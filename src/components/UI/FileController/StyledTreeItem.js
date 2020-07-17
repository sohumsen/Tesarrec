import React, { Component } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import MailIcon from "@material-ui/icons/Mail";
import DeleteIcon from "@material-ui/icons/Delete";
import Label from "@material-ui/icons/Label";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import InfoIcon from "@material-ui/icons/Info";
import ForumIcon from "@material-ui/icons/Forum";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { render } from "enzyme";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import DoneIcon from "@material-ui/icons/Done";
import { MenuItem, Tooltip } from "@material-ui/core";
import OutlinedInput from "../Input/OutlinedInput";
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
  expanded: {},
  label: {
    fontWeight: "inherit",
    color: "inherit",
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
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
  onButtonPress = () => {
    this.setState(
      (prevState) => {
        return {
          showInputField: !prevState.showInputField,
        };
      },
      () => {
        this.props.onEditFileLinkName(this.state.newFileName);
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
    const { ...other } = this.props;
    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <TreeItem
          onLabelClick={this.props.onExpandFileLink}
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
                  value={this.state.newFileName}
                  onChange={this.onChangeFileName}
                  name={"newFileName"}
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
                    this.props.selectedModelId !== this.props.ModelId ||
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
            group: classes.group,
            label: classes.label,
            icon:classes.icon
          }}
          {...other}
        />
      </ClickAwayListener>
    );
  }
}

export default withStyles(styles)(StlyedTreeItem);
