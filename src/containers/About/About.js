import React, { Component } from "react";
import Team from "../../components/UI/AboutPage/Team";
import classes from "./About.module.css";
import Header from "../../components/UI/AboutPage/Header";
import Content from "../../components/UI/AboutPage/Content";
class About extends Component {
  render() {
    return (
      <div className={classes.Layout}>
        <Header />
        <Content />

        <Team />
      </div>
    );
  }
}
export default About;
