import React from "react";
import DraggableCore from "react-draggable";
import { Rnd } from "react-rnd";

const style = {
  border: "solid 10px #ddd",
  background: "#f0f7f7",
};
const ResizeableWrapper = (props) => {
  return (
    <Rnd 
    minWidth={500}>
      <span>{props.children}</span>
    </Rnd>
  );
};

export default ResizeableWrapper;
