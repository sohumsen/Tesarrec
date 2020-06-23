import React, { Component } from "react";
import FileLink from "./File/FileLink";

const FileController = (props) => {
  return Object.keys(props.allPageId).map((PageId) => {
    return (
      <FileLink onClick={() => props.onClick(PageId)}>
        <p>{PageId}</p>
      </FileLink>
    );
  });
};

export default FileController;



