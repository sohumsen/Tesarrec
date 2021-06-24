import React from "react";

//import ReadCathodeJSON from "../../Excel/Cathode/ReadCathodeJSON";
import BioethanolPic from "../../../../assets/pyrolysis.png";
import classes from "./OverallReactionAnodeCathodeCHP.module.css";
import MultiLineChart from "../../../UI/Canvas/MultiLineChartPyrolysis";
import { Paper } from "@material-ui/core";

const OverallReactionAnodeCathode = (props) => {
  let { Temperature } = props.state;


  ///////////////////////////////////////////////

  Temperature = parseFloat(Temperature);
  ////////////////////////////////////////////
  let time = 2;

  let mbArr = [];
  let mgArr = [];
  let moArr = [];
  let mcArr = [];

  let dataPoints = [];

  let k1 = 14300 * Math.E ** (-106500 / (8.314 * (273 + Temperature)));
  let k2 = 2.6618 * Math.E ** (-6894.4676 / (8.314 * (273 + Temperature)));
  let k3 =
    ((0.35 - 0.00115 * (Temperature - 300)) /
      (1 - (0.35 - 0.00115 * (Temperature - 300)))) *
    (k1 + k2);
  let k4 = 7900 * Math.E ** (-81000 / (8.314 * (273 + Temperature)));
  let k = k1 + k2 + k3;
  let  stepTime;
  let upperTime;

  if (300<=Temperature&&Temperature <=350){
    stepTime=500
    upperTime=3000
  }else if (350<Temperature&&Temperature <450){
    stepTime=50
    upperTime=550

  }else{
    stepTime=1
    upperTime=10
  }
  for (let time = 0; time < upperTime; time = time +stepTime) {
    let mb = Math.E ** (-k * time);
    let mg =
      (-(k - k4) / k) *
      ((k * k1 - k1 * k4 - k2 * k4) * Math.E ** (-k * time) +
        k * k2 * Math.E ** (-k4 * time) -
        k * k1 +
        k1 * k4 -
        k * k2 +
        k2 * k4);
    let mo =
      (-k2 / (k - k4)) *
      Math.E ** (-k4 * time) *
      (Math.E ** (-time * (k - k4)) - 1);
    let mc = (k3 / k) * (1 - Math.E ** (-k * time));
    dataPoints.push({
      time: time.toFixed(1),
      Biomass: mb,
      Gas: mg,
      Oil: mo,
      Char: mc,
    });
  }

  return (
    <div  className={classes.HeatMaps}>
      <div  className={classes.HeatMapEnergyPerformance}>
        <img src={BioethanolPic} width="100%" alt="Bioethanol Pic"></img>
      </div >
      <Paper
        style={{
          width: "50%",
          height: "500px",
          float:"left"
        }}
      >
        <MultiLineChart dataPoints={dataPoints} />
      </Paper >
    </div >
  );
};

export default OverallReactionAnodeCathode;
