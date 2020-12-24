import React, { Component } from "react";

import classes from "./Chp.module.css";
import WordDoc from "../../../assets/CHP.pdf";
import DonwloadButton from "../../../components/UI/Button/DownloadButton";

import HeatMapForm from "./Technical/HeatMapForm/HeatMapFormCHP";
class CHP extends Component {
  render() {
    return (
      <div className={classes.parentContainer}>
         This license available under 
        {" "}

        <a href={"https://creativecommons.org/licenses/by-sa/4.0/"}>
           https://creativecommons.org/licenses/by-sa/4.0/
        </a>
        {" "}
         lets you remix, adapt,
        and build upon this work even for commercial purposes, as long as you
        creadit: ©

         <a href={"https://tesarrec.web.app"}>
         https://tesarrec.web.app
        </a> 
        <h1>Combined Heat Power</h1>
        <div>
          <a style={{ float: "right" }} href={"https://youtu.be/FNoEY1NhqPo"}>
            Youtube link
          </a>
          <form style={{ float: "right" }} method="get" action={WordDoc}>
            <DonwloadButton style={{ float: "right" }} type="submit">
              Download!
            </DonwloadButton>
          </form>

          <a style={{ float: "right" }} href={WordDoc} download>
            Read me
          </a>
        </div>
        <HeatMapForm />
      </div>
    );
  }
}

export default CHP;
