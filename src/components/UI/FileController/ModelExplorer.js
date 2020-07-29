import React, { Component } from "react";
// import FileLink from "./FileLink";

import IconButton from "@material-ui/core/IconButton";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import PublishIcon from "@material-ui/icons/Publish";
import { Tooltip, Paper } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import StyledTreeItem from "./StyledTreeItem";

class FileGenerator extends Component {
  render() {
    let publicFileLinks = Object.keys(this.props.allPublicId).map(
      (ModelId, i) => {
        return (
          <StyledTreeItem
            nodeId={i + 1}
            labelText={this.props.allPublicId[ModelId].Name} //
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
            labelText={this.props.allModelId[ModelId].Name} //
            key={ModelId}
            ModelId={ModelId} //
            selectedModelId={this.props.selectedModelId} //
            onExpandFileLink={() => this.props.onSelectModelLink(ModelId)} //
            onEditFileLinkName={this.props.onEditModelName}
            // fileName={
            //   this.props.allModelId[ModelId].Name
            //     ? this.props.allModelId[ModelId].Name
            //     : "Junk"
            // } //
          />
        );
      }
    );

    //   <FileLink
    //   key={ModelId}
    //   ModelId={ModelId} //
    //   selectedModelId={this.props.selectedModelId} //
    //   disabledEdit={this.props.selectedModelId in this.props.allPublicId}
    //   onExpandFileLink={() => this.props.onSelectModelLink(ModelId)} //
    //   onEditFileLinkName={this.props.onEditModelName}
    //   fileName={
    //     this.props.allPublicId[ModelId].Name
    //       ? this.props.allPublicId[ModelId].Name
    //       : "Junk"
    //   } //
    // />

    return (
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
        </Paper>

        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        
        >
          <TreeItem nodeId="0" label={"Public"}>
            {publicFileLinks}
          </TreeItem>

          <TreeItem
            nodeId={(Object.keys(this.props.allPublicId).length + 1).toString()}
            label={"Private"}
          >
            {privateFileLinks}
          </TreeItem>
        </TreeView>
      </Paper>
    );
  }
}

export default FileGenerator;
