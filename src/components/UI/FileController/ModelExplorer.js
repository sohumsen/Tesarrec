import React, { Component } from "react";
// import FileLink from "./FileLink";

import IconButton from "@material-ui/core/IconButton";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import PublishIcon from "@material-ui/icons/Publish";
import { Tooltip, Paper, Divider } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import StyledTreeItem from "./StyledTreeItem";
import AssessmentIcon from "@material-ui/icons/Assessment";
import FunctionsIcon from "@material-ui/icons/Functions";
import MenuIcon from "@material-ui/icons/Menu";
import classes from "./ModelExplorer.module.css";

class ModelExplorer extends Component {
  state = {
    showModels: true,
  };
  render() {
    let publicFileLinks = Object.keys(this.props.allPublicId).map(
      (ModelId, i) => {
        return (
          <StyledTreeItem
            nodeId={(i + 1).toString()}
            labelText={
              this.props.allPublicId[ModelId].Name
                ? this.props.allPublicId[ModelId].Name
                : this.props.allPublicId[ModelId].meta.name
            } //
            modelId={ModelId}
            selectedModelId={this.props.selectedModelId}
            disabledEdit={this.props.selectedModelId in this.props.allPublicId}
            onExpandModelLink={() => this.props.onSelectModelLink(ModelId)}
            onEditModelName={this.props.onEditModelName}
          />
        );
      }
    );

    let privateFileLinks = Object.keys(this.props.allModelId).map(
      (ModelId, i) => {
        return (
          <StyledTreeItem
            nodeId={(
              i +
              Object.keys(this.props.allPublicId).length +
              2
            ).toString()}
            labelText={
              this.props.allModelId[ModelId].Name
                ? this.props.allModelId[ModelId].Name
                : this.props.allModelId[ModelId].meta.name
            } //
            key={ModelId}
            modelId={ModelId}
            selectedModelId={this.props.selectedModelId} //
            onExpandModelLink={() => this.props.onSelectModelLink(ModelId)} //
            onEditModelName={this.props.onEditModelName}
          />
        );
      }
    );

    return (
      <div className={classes.Container}>
        {this.props.tabChoiceValue === 2 ? (
          <div className={classes.ButtonPanel}>
            <div className={classes.ChildAppControl}>
              <Tooltip title="Coupled ODE" placement="top">
                <span>
                  <IconButton
                    edge="end"
                    aria-label="Coupled ODE"
                    onClick={() => this.props.handleTabChange(0, 1)}
                  >
                    <FunctionsIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
            <div className={classes.ChildAppControl}>
              <Tooltip title="Solver Analysis" placement="top">
                <span>
                  <IconButton
                    edge="end"
                    aria-label="Solver Analysis"
                    onClick={() => this.props.handleTabChange(0, 2)}
                  >
                    <AssessmentIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
          </div>
        ) : (
          <div className={classes.Container}>
            <div className={classes.ButtonPanel}>
              <div className={classes.ChildAppControl}>
                <Tooltip title="Toggle Model Explorer" placement="top" arrow>
                  <span>
                    <IconButton
                      edge="end"
                      aria-label="show"
                      onClick={() => {
                        this.setState({
                          showModels: !this.state.showModels,
                        });
                      }}
                    >
                      <MenuIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </div>
              <div className={classes.ChildAppControl}>
                <Tooltip title="Coupled ODE" placement="top">
                  <span>
                    <IconButton
                      edge="end"
                      aria-label="Coupled ODE"
                      onClick={() => this.props.handleTabChange(0, 1)}
                    >
                      <FunctionsIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </div>
              <div className={classes.ChildAppControl}>
                <Tooltip title="Solver Analysis" placement="top">
                  <span>
                    <IconButton
                      edge="end"
                      aria-label="Solver Analysis"
                      onClick={() => this.props.handleTabChange(0, 2)}
                    >
                      <AssessmentIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </div>
            </div>

            {this.state.showModels ? (
              <Paper className={classes.ModelExplorerPane} elevation={3}>
                <Paper elevation={3}>
                  <Tooltip title="Create model" placement="top" arrow>
                    <span>
                      <IconButton
                        edge="end"
                        aria-label="create"
                        onClick={this.props.createNewFile}
                      >
                        <AddBoxIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Save model" placement="top">
                    <span>
                      <IconButton
                        edge="end"
                        aria-label="save"
                        onClick={this.props.saveEquation}
                        disabled={
                          this.props.selectedModelId === "" ||
                          this.props.selectedModelId in this.props.allPublicId
                        }
                      >
                        <SaveIcon />
                      </IconButton>
                    </span>
                  </Tooltip>

                  <Tooltip title="Publish model" placement="top">
                    <span>
                      <IconButton
                        edge="end"
                        aria-label="save"
                        onClick={this.props.publishEquation}
                        disabled={
                          this.props.selectedModelId === "" ||
                          this.props.selectedModelId in this.props.allPublicId
                        }
                      >
                        <PublishIcon />
                      </IconButton>
                    </span>
                  </Tooltip>

                  <Tooltip title="Copy model" placement="top">
                    <span>
                      <IconButton
                        edge="end"
                        aria-label="copy"
                        onClick={this.props.copyAllEqnsText}
                        disabled={this.props.selectedModelId === ""}
                      >
                        <ImportExportIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Delete model" placement="top">
                    <span>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={this.props.onRemoveModel}
                        disabled={
                          this.props.selectedModelId === "" ||
                          this.props.selectedModelId in this.props.allPublicId
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Divider />
                </Paper>

                <TreeView
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  expanded={[
                    "0",
                    (Object.keys(this.props.allPublicId).length + 1).toString(),
                  ]}
                  defaultSelected={["1"]}
                  defaultExpandIcon={<ChevronRightIcon />}
                >
                  <TreeItem nodeId="0" label={"Public"}>
                    {publicFileLinks}
                  </TreeItem>

                  <TreeItem
                    nodeId={(
                      Object.keys(this.props.allPublicId).length + 1
                    ).toString()}
                    label={"Private"}
                  >
                    {privateFileLinks}
                  </TreeItem>
                </TreeView>
              </Paper>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default ModelExplorer;
