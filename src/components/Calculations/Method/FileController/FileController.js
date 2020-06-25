import React, { Component } from "react";
import FileLink from "./File/FileLink";
import ListItems from "../../../UI/ListItems/ListItems";

class FileController extends Component {
  state = {
    selected: null,
  };
  updateSelected(selectedIndex) {

    this.setState({ selected: selectedIndex });
  }

  render() {
    return Object.keys(this.props.allModelId).map((ModelId) => {
      return (
        <ul style={{ listStyle: "none" }}>
          <ListItems
            updateSelected={() => this.updateSelected(ModelId)}
            ModelId={ModelId}
            selected={this.state.selected}
            onExpandFileLink={() => this.props.onExpandFileLink(ModelId)}
            onRemoveFileLink={() => this.props.onRemoveFileLink(ModelId)}
          />
        </ul>
      );
    });
  }
}

export default FileController;
