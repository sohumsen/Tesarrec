import React from "react";
import classes from './InteractiveTextBox.module.css'
const InteractiveTextBox = (props) => {
    let paragraph=[]
    const entries = Object.entries(props.variableDescriptionObj)
    for (const [key, value] of entries) {

        paragraph.push(<p> {key} :  {value}</p>)
      }



  return <div className={classes.TextBox}>{paragraph}</div>;
};

export default InteractiveTextBox;
