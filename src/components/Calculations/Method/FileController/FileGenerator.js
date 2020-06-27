import React, { Component } from "react";
import FileLink from "./File/FileLink";
import ListItems from "../../../UI/ListItems/ListItems";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ImportExportIcon from "@material-ui/icons/ImportExport";

import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { MenuItem, withStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddBoxIcon from "@material-ui/icons/AddBox";

class FileGenerator extends Component {
  render() {
    console.log(this.props.selectedModelId)
    
    let fileLinks = Object.keys(this.props.allModelId).map((ModelId) => {
      return (
        <ul style={{ listStyle: "none" }}>
          <ListItems
            ModelId={ModelId} //
            selectedModelId={this.props.selectedModelId} //
            onExpandFileLink={() => this.props.onExpandFileLink(ModelId)} //
            onEditFileLinkName={this.props.onEditFileLinkName}
            fileName={this.props.allModelId[ModelId].Name} //
          />
        </ul>
      );
    });

    return (
      <div>
        <div>
          <IconButton
            edge="end"
            aria-label="create"
            onClick={this.props.createNewFile}
          >
            <AddBoxIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="save"
            onClick={this.props.saveEquation}
            disabled={this.props.selectedModelId === ""}
          >
            <SaveIcon />
          </IconButton>

          <IconButton
            edge="end"
            aria-label="copy"
            onClick={this.props.copyAllEqnsText}
            disabled={this.props.selectedModelId === ""}
          >
            <ImportExportIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={this.props.onRemoveFileLink}
            disabled={this.props.selectedModelId === ""}
          >
            <DeleteIcon />
          </IconButton>
        </div>
        {fileLinks}
      </div>
    );
  }
}

export default FileGenerator;
