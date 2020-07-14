import React, { Component } from "react";
import ListItems from "./File/FileLink";

import IconButton from "@material-ui/core/IconButton";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { Tooltip, Menu, Paper } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";

class FileGenerator extends Component {
  state={
    open:true
  }
  render() {
    let fileLinks = Object.keys(this.props.allModelId).map((ModelId) => {
      return (
        <ListItems
          key={ModelId}
          ModelId={ModelId} //
          selectedModelId={this.props.selectedModelId} //
          onExpandFileLink={() => this.props.onExpandFileLink(ModelId)} //
          onEditFileLinkName={this.props.onEditFileLinkName}
          fileName={this.props.allModelId[ModelId].Name} //
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
                disabled={this.props.selectedModelId === ""}
              >
                <SaveIcon />
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
                onClick={this.props.onRemoveFileLink}
                disabled={this.props.selectedModelId === ""}
              >
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Paper>
        {fileLinks}

        </Paper>
    );
  }
}

export default FileGenerator;
