import React from "react";
import classes from "./MyMobileView.module.css";
import Cube from "../../assets/aboutpage/cube.gif";
import Logo from "../../assets/logo2.png";
const MyMobileView = (props) => {

  return (
    <div className={classes.mobileView}>
      <img src={Logo} alt="go on pc" width="20%"></img>

      <h1>Please visit on PC&#128512;</h1>
      <h2>www.tesarrec.web.app</h2>

      <img src={Cube} alt="go on pc" width="100%"></img>
    </div>
  );
};

export default MyMobileView;
