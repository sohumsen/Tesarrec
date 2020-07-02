import React, { Component } from "react";
import Draggable from "react-draggable";

class DraggableWrapper extends Component {
  state = {
    fileExplorerPos: { x: 0, y: 0 },
    eqnEditorPos: { x: 0, y: 0 },
    graphPos: { x: 0, y: 0 },
    configPos: { x: 0, y: 0 },
  };

  onStop = (e, data) => {
    console.log(this.state[this.props.name]);
    let changed = {
      ...this.state[this.props.name],
    };
    changed.x = data.x;
    changed.y = data.y;

    this.setState({
      [this.props.name]: changed,
    });
  };
  onSetInitialState = () => {
    this.setState({
      fileExplorerPos: { x: 0, y: 0 },
      eqnEditorPos: { x: 0, y: 0 },
      graphPos: { x: 0, y: 0 },
      configPos: { x: 0, y: 0 },
    });
  };
//   componentWillReceiveProps(){
//     if (this.props.resetAllPos){
//         this.onSetInitialState()
//     }
//   }

  render() {
     
    return (
      <Draggable position={this.state[this.props.name]} onStop={this.onStop} >
        {this.props.children}
         
      </Draggable>
    );
  }
}

export default DraggableWrapper;
