import React, { Component } from "react";


import classes from './Chp.module.css'
import WordDoc from "../../../assets/MFC discussion.docx";
import DonwloadButton from "../../../components/UI/Button/DownloadButton";

import HeatMapForm from './Technical/HeatMapForm/HeatMapFormCHP'
class CHP extends Component {
  render() {

    
    return (
      <div className={classes.parentContainer}>
        <h1>Combined Heat Power</h1>

        <div>
        <form style={{float:"right"}} method="get" action={WordDoc}>
          <DonwloadButton style={{float:"right"}} type="submit">Download!</DonwloadButton>
        </form>


        <a style={{float:"right"}} href={WordDoc} download>
          Click to download paper
        </a>

        </div>
        <HeatMapForm/>

      </div>
    );
  }
}

export default CHP;
