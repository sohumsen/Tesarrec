import React from "react";

import ReadAnodeJSON from "../../../Excel/Anode/ReadAndodeJSON";
//import ReadCathodeJSON from "../../Excel/Cathode/ReadCathodeJSON";


import MyHeatMap from "../../../UI/MyHeatMap/MyHeatMap";
import classes from "./OverallReactionAnodeCathodeMFC.module.css";
const OverallReactionAnodeCathode = (props) => {
  //console.log(props.anodeSubstrate)
  //console.log(props.cathodeProduct)

  let CarbonEmmision =
    (props.CCGT * 0.1386 +
      props.Nuclear * 0.0081 +
      props.Biomass * 0.0125 +
      props.Coal * 0.2466 +
      props.Wind * 0.0072 +
      props.Solar * 0.02361 +
      props.Oil * 0.20361 +
      props.OCGT * 0.1386 +
      props.Hydroelectric * 0.00722 +
      props.PumpedHydro * 0.11527 +
      props.Other * 0.07583) /
    (props.CCGT +
      props.Nuclear +
      props.Biomass +
      props.Coal +
      props.Wind +
      props.Solar +
      props.Oil +
      props.OCGT +
      props.Hydroelectric +
      props.PumpedHydro +
      props.Other);
  let GibbsEnergyData = [];
  let GWPSavingData = [];

  props.heatMapContents.xLabels.forEach((Xelement) => {
    let AnodeData = ReadAnodeJSON(Xelement);
    //console.log(AnodeData)
    let x = parseInt(AnodeData.value.x);
    let y = parseInt(AnodeData.value.y);
    let z = parseInt(AnodeData.value.z);
    let GibbsSubstrateInitial = parseFloat(AnodeData.value["∆Gf°(s) (kJ/mol)"]);

    let xDash = 1 / x;
    let nDash = y / (2 * x);
    //let n = 0.5 * (2 + y / (2 * x) - z / x);

    let MolarMassOfSubstrate = 12 * x + y + 16 * z;

    let StandardGibbsEnergyOfReactionkJ =
      ((props.concentration * props.volume * props.efficiency) /
        (xDash * MolarMassOfSubstrate)) *
      (-394.36 - xDash * GibbsSubstrateInitial - nDash * -237.13);

    //console.log(StandardGibbsEnergyOfReactionkJ)

    GibbsEnergyData.push(StandardGibbsEnergyOfReactionkJ.toFixed(2));



    let GWPsaving= -StandardGibbsEnergyOfReactionkJ*CarbonEmmision

    GWPSavingData.push(GWPsaving.toFixed(2));

    //console.log( Xelement,Yelement)

    //console.log((StandardGibbsEnergyOfReactionkJ.toFixed(2)))
  });

  let TwoDGibbsEnergyData = [];

  while (GibbsEnergyData.length)
    TwoDGibbsEnergyData.push(
      GibbsEnergyData.splice(0, props.heatMapContents.xLabels.length)
    );

  let TwoDGWPSavingyData = [];

  while (GWPSavingData.length)
    TwoDGWPSavingyData.push(
      GWPSavingData.splice(0, props.heatMapContents.xLabels.length)
    );

  //console.log(energyObj)

  //console.log("heat map contents   "+ props.heatMapContents)
  return (
    <div className={classes.HeatMaps}>
      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Energy Performance in kJ</h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={["Electricity"]}
          color={"rgba(0, 255, 255"}
          data={TwoDGibbsEnergyData}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>

      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Global Warming Potential saving g CO&#8322; eq.</h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={["GWP"]}
          color={"rgba(0, 255, 255"}
          data={TwoDGWPSavingyData}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>
    </div>
  );
};

export default OverallReactionAnodeCathode;
