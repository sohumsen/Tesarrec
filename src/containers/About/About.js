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
        <h1 style={{ display: "inline" }}>
          The research is supported by the <br />
          <a
            href="https://www.britishcouncil.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            British Council{" "}
          </a>
          <br />
          <a
            href="https://www.ukri.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            UKRI
          </a>
          <br/>
          Content is subject to {" "}
          <a href="https://creativecommons.org/licenses/by/2.0/">
             Copyright Creative Commons Attribution 2.0 Generic
          </a>
          You must give {" "}
          <a href="https://creativecommons.org/licenses/by/2.0/">
            appropriate credit
          </a>
          : ©Sohum Sen <a href="https://tesarrec.org/">https://tesarrec.org/</a>
        </h1>
      </div>
    );
  }
}
export default About;
