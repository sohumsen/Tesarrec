import React, { Component } from "react";

import classes from "./Mfc.module.css";
import WordDoc from "../../../assets/MFC discussion.docx";
import DonwloadButton from "../../../components/UI/Button/DownloadButton";

import HeatMapForm from "./Technical/HeatMapForm/HeatMapFormMFC";
class MFC extends Component {
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
        <h1>Microbial Fuel Cell</h1>
        <div>
          <form style={{ float: "right" }} method="get" action={WordDoc}>
            <DonwloadButton style={{ float: "right" }} type="submit">
              Download!
            </DonwloadButton>
          </form>

          <a style={{ float: "right" }} href={WordDoc} download>
            Click to download paper
          </a>
        </div>
        <HeatMapForm />
      </div>
    );
  }
}

export default MFC;
