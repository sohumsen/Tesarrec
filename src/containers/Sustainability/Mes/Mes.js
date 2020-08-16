import React, { Component } from "react";

import WordDoc from "../../../assets/MES download.docx";


import DonwloadButton from "../../../components/UI/Button/DownloadButton";
import HeatMapForm from "./Technical/HeatMapForm/HeatMapFormMES";
class Mes extends Component {
  render() {
    return (
      <div >
        <h1 style={{ textAlign: "center" }}>Microbial Electrosynthesis</h1>

          <form  method="get" action={WordDoc}>
            <DonwloadButton style={{ float: "right" }} type="submit">
              Download!
            </DonwloadButton>
            <a href={WordDoc} download>
            Click to download paper
          </a>
          </form>

          

        <HeatMapForm />
      </div>
    );
  }
}

export default Mes;
