import React, { Component } from "react";

import classes from "./styles.module.css";
import BioethanolWordDoc from "../../../assets/Bioethanol.pdf";
import ChemicalWordDoc from "../../../assets/Chemical.pdf";

import DonwloadButton from "../../../components/UI/Button/DownloadButton";

import HeatMapForm from "./Technical/HeatMapForm/HeatMapFormCHP";
class Bioethanol extends Component {
  render() {
    const {
      text,
      match: { params },
    } = this.props;

    const { type } = params;

    return (
      <div className={classes.parentContainer}>
        This license available under{" "}
        <a href={"https://creativecommons.org/licenses/by-sa/4.0/"}>
          https://creativecommons.org/licenses/by-sa/4.0/
        </a>{" "}
        lets you remix, adapt, and build upon this work even for commercial
        purposes, as long as you creadit: ©
        <a href={"https://tesarrec.web.app"}>https://tesarrec.web.app</a>
        {" and "}
        {type === "chemical" ? (
          <a href={"https://doi.org/10.1039/C9GC00607A"}>
            https://doi.org/10.1039/C9GC00607A
          </a>
        ) : (
          <a href={"https://doi.org/10.1016/j.biteb.2019.100230"}>
            https://doi.org/10.1016/j.biteb.2019.100230
          </a>
        )}
        <h1>{type.charAt(0).toUpperCase() + type.slice(1)}</h1>
        <div>
          {/* <a style={{ float: "right" }} href={"https://youtu.be/FNoEY1NhqPo"}>
            Youtube link
          </a> */}

          <form
            style={{ float: "right" }}
            method="get"
            action={type === "chemical" ? ChemicalWordDoc : BioethanolWordDoc}
          >
            <DonwloadButton style={{ float: "right" }} type="submit">
              Download!
            </DonwloadButton>
          </form>

          <a
            style={{ float: "right" }}
            href={type === "chemical" ? ChemicalWordDoc : BioethanolWordDoc}
            download
          >
            Read me
          </a>
        </div>
        <HeatMapForm type={type} />
      </div>
    );
  }
}

export default Bioethanol;
