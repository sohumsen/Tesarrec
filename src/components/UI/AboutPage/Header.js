import React from "react";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <div className={classes.header}>
      <h1>Tesarrec</h1>
      <p>
        <b>T</b>ool for techno-
        <br />
        <b>E</b>conomic and <br />
        <b>S</b>ustainability <br />
        <b>A</b>nalysis of <br />
        <b>R</b>esource <br />
        <b>R</b>ecovery <br />
        <b>E</b>ngineering solutions for <br />
        <b>C</b>ircular economy
        <br />
      </p>
    </div>
  );
};

export default Header;
