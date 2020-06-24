import React, { Component } from "react";
import FileLink from "./File/FileLink";
import ListItems from '../../../UI/ListItems/ListItems'

const FileController = (props) => {
  return Object.keys(props.allModelId).map((ModelId) => {
    return (
      <ul style={{listStyle:"none"}}>

      <ListItems
              onExpandFileLink={() => props.onExpandFileLink(ModelId)}
              ModelId={ModelId}
              onRemoveFileLink={()=>props.onRemoveFileLink(ModelId)}/>
      </ul>
    );
  });
};

export default FileController;
