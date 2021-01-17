import React, { Component } from "react";

import WordDoc from "../../../assets/MES download.docx";

import DonwloadButton from "../../../components/UI/Button/DownloadButton";
import HeatMapForm from "./Technical/HeatMapForm/HeatMapFormMES";
class Mes extends Component {
  render() {
    return (
      <div>
         This license available under 
        {" "}

        <a href={"https://creativecommons.org/licenses/by-sa/4.0/"}>
           https://creativecommons.org/licenses/by-sa/4.0/
        </a>
        {" "}
         lets you remix, adapt,
        and build upon this work even for commercial purposes, as long as you
        credit: ©

         <a href={"https://tesarrec.web.app"}>
         https://tesarrec.web.app
        </a> 
        <h1>Microbial Electrosynthesis</h1>
        <form method="get" action={WordDoc}>
          {/* <DonwloadButton style={{ float: "right" }} type="submit">
              Download!
            </DonwloadButton> */}
          <a href={WordDoc} download>
            Read me
          </a>
        </form>
        <HeatMapForm />
      </div>
    );
  }
}

export default Mes;
