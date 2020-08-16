import React, { Component } from "react";

class Person extends Component {
  state = {
    eye: new Eye("green"), //pass in eye colour as parameter
  };

  changeEyeColour = () => {
    let eye = this.state.eye ;
    eye.colour = "red";

    this.setState({ eye: eye }, () => {
      console.log(this.state.eye); //equals  { colour:red}, which is correct
      console.log(this.state.eye.returnEyeColour()); //equals  { colour:green}, which is incorrect.

      //QUESTION: How to sync js pure class constructor and react class state
    });
  };
  render() {
    return <button onClick={this.changeEyeColour}></button>;
  }
}

class Eye {
  constructor(colour) {
    this.colour = colour;
  }

  returnEyeColour=()=> {
    return this.colour;
  }
}

export default Person;
