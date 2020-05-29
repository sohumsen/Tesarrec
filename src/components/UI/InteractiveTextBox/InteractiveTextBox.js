import React from "react";

const InteractiveTextBox = (props) => {
    let paragraph=[]
    const entries = Object.entries(props.variableDescriptionObj)
    for (const [key, value] of entries) {
        paragraph.push(<p> {key} :  {value}</p>)
      }



  return paragraph;
};

export default InteractiveTextBox;
