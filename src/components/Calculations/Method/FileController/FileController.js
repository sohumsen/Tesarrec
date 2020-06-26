import React, { Component } from "react";
import FileLink from "./File/FileLink";
import ListItems from "../../../UI/ListItems/ListItems";

class FileController extends Component {

  render() {
    return Object.keys(this.props.allModelId).map((ModelId) => {

      return (
        
        <ul style={{ listStyle: "none" }}>
          <p>hi</p>
          <ListItems
            ModelId={ModelId}
            selectedModelId={this.props.selectedModelId}
            onExpandFileLink={() => this.props.onExpandFileLink(ModelId)}
            onRemoveFileLink={() => this.props.onRemoveFileLink(ModelId)}
            onEditFileLinkName={this.props.onEditFileLinkName}
            fileName={this.props.allModelId[ModelId].Name}
          />
        </ul>
      );
    });
  }
}

export default FileController;
