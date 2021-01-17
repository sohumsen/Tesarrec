import React, { Component } from "react";

import classes from "./styles.module.css";
import WordDoc from "../../../assets/Bioethanol.pdf";
import DonwloadButton from "../../../components/UI/Button/DownloadButton";

import HeatMapForm from "./Technical/HeatMapForm/HeatMapFormCHP";
class Bioethanol extends Component {
  render() {
    return (
      <div className={classes.parentContainer}>
        This license available under{" "}
        <a href={"https://creativecommons.org/licenses/by-sa/4.0/"}>
          https://creativecommons.org/licenses/by-sa/4.0/
        </a>{" "}
        lets you remix, adapt, and build upon this work even for commercial
        purposes, as long as you credit: ©
        <a href={"https://tesarrec.web.app"}>https://tesarrec.web.app</a>{" and "}
        <a href={"https://doi.org/10.1016/j.biteb.2019.100230"}>
          https://doi.org/10.1016/j.biteb.2019.100230
        </a>
        <h1>Bioethanol</h1>
        <div>
          {/* <a style={{ float: "right" }} href={"https://youtu.be/FNoEY1NhqPo"}>
            Youtube link
          </a> */}
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

export default Bioethanol;
