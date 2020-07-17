import React, { Component } from "react";
import FileLink from "./File/FileLink";

import IconButton from "@material-ui/core/IconButton";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import PublishIcon from "@material-ui/icons/Publish";
import { Tooltip, Paper } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";

class FileGenerator extends Component {
  render() {
    let publicFileLinks = Object.keys(this.props.allPublicId).map((ModelId) => {
      return (
        <FileLink
          key={ModelId}
          ModelId={ModelId} //
          selectedModelId={this.props.selectedModelId} //
          disabledEdit={this.props.selectedModelId in this.props.allPublicId}
          onExpandFileLink={() => this.props.onSelectModelLink(ModelId)} //
          onEditFileLinkName={this.props.onEditModelName}
          fileName={
            this.props.allPublicId[ModelId].Name
              ? this.props.allPublicId[ModelId].Name
              : "Junk"
          } //
        />
      );
    });

    let privateFileLinks = Object.keys(this.props.allModelId).map((ModelId) => {
      return (
        <FileLink
          key={ModelId}
          ModelId={ModelId} //
          selectedModelId={this.props.selectedModelId} //
          onExpandFileLink={() => this.props.onSelectModelLink(ModelId)} //
          onEditFileLinkName={this.props.onEditModelName}
          fileName={
            this.props.allModelId[ModelId].Name
              ? this.props.allModelId[ModelId].Name
              : "Junk"
          } //
        />
      );
    });

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
        <p>Public</p>
        {publicFileLinks}
        <p>Private</p>

        {privateFileLinks}
      </Paper>
    );
  }
}

export default FileGenerator;
