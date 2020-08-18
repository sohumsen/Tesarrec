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
class ModelExplorer extends Component {
  state = {
    showModels: true,
  };
  render() {
    let publicFileLinks = Object.keys(this.props.allPublicId).map(
      (ModelId, i) => {
        return (
          <StyledTreeItem
            nodeId={i + 1}
            labelText={
              this.props.allPublicId[ModelId].Name
                ? this.props.allPublicId[ModelId].Name
                : this.props.allPublicId[ModelId].meta.name
            } //
            ModelId={ModelId}
            selectedModelId={this.props.selectedModelId}
            disabledEdit={this.props.selectedModelId in this.props.allPublicId}
            onExpandFileLink={() => this.props.onSelectModelLink(ModelId)} //
            onEditFileLinkName={this.props.onEditModelName}
          />
        );
      }
    );

    let privateFileLinks = Object.keys(this.props.allModelId).map(
      (ModelId, i) => {
        return (
          <StyledTreeItem
            nodeId={i + Object.keys(this.props.allPublicId).length + 2}
            labelText={
              this.props.allModelId[ModelId].Name
                ? this.props.allModelId[ModelId].Name
                : this.props.allModelId[ModelId].meta.name
            } //
            key={ModelId}
            ModelId={ModelId} //
            selectedModelId={this.props.selectedModelId} //
            onExpandFileLink={() => this.props.onSelectModelLink(ModelId)} //
            onEditFileLinkName={this.props.onEditModelName}
          />
        );
      }
    );

    return (
      <div>
        {this.props.tabChoiceValue === 2 ? (
          <div>
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
        ) : (
          <div>
            <Tooltip title="Show menu" placement="top" arrow>
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
            {this.state.showModels ? (
              <Paper elevation={3}>
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
