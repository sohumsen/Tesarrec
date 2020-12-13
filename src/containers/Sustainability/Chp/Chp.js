import React, { Component } from "react";

import classes from "./Chp.module.css";
import WordDoc from "../../../assets/CHP.pdf";
import DonwloadButton from "../../../components/UI/Button/DownloadButton";

import HeatMapForm from "./Technical/HeatMapForm/HeatMapFormCHP";
class CHP extends Component {
  render() {
    return (
      <div className={classes.parentContainer}>
        You must give appropriate credit:
        <br/>

        ©https://tesarrec.web.app
        <br/>
        <a href={"https://creativecommons.org/licenses/by-sa/4.0/"}>
          https://creativecommons.org/licenses/by-sa/4.0/
        </a>
        <br/>

        “This license lets others remix, adapt, and build upon your work even
        for commercial purposes, as long as they credit you and license their
        new creations under the identical terms. This license is often compared
        to “copyleft” free and open source software licenses. All new works
        based on yours will carry the same license, so any derivatives will also
        allow commercial use. This is the license used by Wikipedia, and is
        recommended for materials that would benefit from incorporating content
        from Wikipedia and similarly licensed projects.”
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
