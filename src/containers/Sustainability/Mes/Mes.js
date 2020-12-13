import React, { Component } from "react";

import WordDoc from "../../../assets/MES download.docx";

import DonwloadButton from "../../../components/UI/Button/DownloadButton";
import HeatMapForm from "./Technical/HeatMapForm/HeatMapFormMES";
class Mes extends Component {
  render() {
    return (
      <div>
        You must give appropriate credit:
        <br />
        ©https://tesarrec.web.app
        <br />
        <a href={"https://creativecommons.org/licenses/by-sa/4.0/"}>
          https://creativecommons.org/licenses/by-sa/4.0/
        </a>
        <br />
        “This license lets others remix, adapt, and build upon your work even
        for commercial purposes, as long as they credit you and license their
        new creations <br />
        under the identical terms. This license is often compared to “copyleft”
        free and open source software licenses. All new works based on yours
        will <br />
        carry the same license, so any derivatives will also allow commercial
        use. This is the license used by Wikipedia, and is recommended for
        materials <br />
        that would benefit from incorporating content from Wikipedia and
        similarly licensed projects.”
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
