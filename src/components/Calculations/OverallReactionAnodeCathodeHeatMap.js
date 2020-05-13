import React from "react";

import ReadAnodeJSON from "../Excel/Anode/ReadAndodeJSON";
import ReadCathodeJSON from "../Excel/Cathode/ReadCathodeJSON";

import MyHeatMap from "../UI/MyHeatMap/MyHeatMap";
import classes from "./OverallReactionAnodeCathode.module.css";
const OverallReactionAnodeCathode = (props) => {
  //console.log(props.anodeSubstrate)
  //console.log(props.cathodeProduct)

  let ProductionRategData = [];
  let GibbsEnergyData = [];
  let GWPSavingData = [];

  props.heatMapContents.xLabels.forEach((Xelement) => {
    props.heatMapContents.yLabels.forEach((Yelement) => {
      let AnodeData = ReadAnodeJSON(Xelement);
      //console.log(AnodeData)
      let x = parseInt(AnodeData.value.x);
      let y = parseInt(AnodeData.value.y);
      let z = parseInt(AnodeData.value.z);
      let GibbsSubstrateInitial = parseFloat(
        AnodeData.value["∆Gf°(s) (kJ/mol)"]
      );

      let CathodeData = ReadCathodeJSON(Yelement);
      //console.log(CathodeData)
      let c = parseInt(CathodeData.value.c); //n_c
      let h = parseInt(CathodeData.value.h);
      let o = parseInt(CathodeData.value.o);
      let GibbsProductInitial = parseFloat(
        CathodeData.value["∆Gf°(p) (kJ/mol)"]
      );

      let GWPp = parseFloat(
        CathodeData.value["GWP(p) from fossil resource kgCO2eq./kg"]
      );

      let xDash = c / x;
      let m = o - (c * z) / x;
      let mDash = 0.5 * (-h + (c * y) / x + 2 * o - (2 * c * z) / x);

      let StandardGibbsEnergyOfReactionProductkJMol =
        GibbsProductInitial - xDash * GibbsSubstrateInitial - m * -237.13;

      let StandardGibbsEnergyOfFormationOfWater = -237.13;
      let StandardGibbsEnergyOfReactionSubstratekJMol =
        (1 / xDash) * StandardGibbsEnergyOfReactionProductkJMol;

      let MolarMassOfProduct = 12 * c + h + 16 * o;
      let MolarMassOfSubstrate = 12 * x + y + 16 * z;

      let StandardGibbsEnergyOfReactionProductkJg =
        (1 / MolarMassOfProduct) * StandardGibbsEnergyOfReactionProductkJMol;
      let StandardGibbsEnergyOfReactionSubstratekJg =
        (1 / MolarMassOfProduct) * StandardGibbsEnergyOfReactionSubstratekJMol;

      let StandardGibbsEnergyOfReactionkJ =
        ((props.volume * props.efficiency) / (xDash * MolarMassOfSubstrate)) *
        props.concentration *
        StandardGibbsEnergyOfReactionProductkJMol;
      let ProductionRateg =
        (props.concentration *
          props.volume *
          props.efficiency *
          MolarMassOfProduct) /
        (MolarMassOfSubstrate * xDash);

      //console.log(StandardGibbsEnergyOfReactionkJ)

      ProductionRategData.push(ProductionRateg.toFixed(2));

      GibbsEnergyData.push(StandardGibbsEnergyOfReactionkJ.toFixed(2));

      //console.log( Xelement,Yelement)

      //console.log((StandardGibbsEnergyOfReactionkJ.toFixed(2)))

      let GWPSaving =
        1 /
        1000*(
          (GWPp *
            props.concentration *
            props.volume *
            props.efficiency *
            MolarMassOfProduct) /
            (xDash * MolarMassOfSubstrate) -
            StandardGibbsEnergyOfReactionkJ * 1
        );

      GWPSavingData.push(GWPSaving.toFixed(2));
    });
  });

  let TwoDProductionRategData = [];

  while (ProductionRategData.length)
    TwoDProductionRategData.push(
      ProductionRategData.splice(0, props.heatMapContents.xLabels.length)
    );

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
      <div className={classes.HeatMapProductionRate}>
        <h3>Production Rate in g</h3>

        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={props.heatMapContents.yLabels}
          data={TwoDProductionRategData}
          color={"rgba(255, 0, 255"}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>

      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Energy Performance in kJ</h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={props.heatMapContents.yLabels}
          color={"rgba(0, 255, 255"}
          data={TwoDGibbsEnergyData}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>

      <div className={classes.HeatMapEnergyPerformance}>
        <h3>GWP saving </h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={props.heatMapContents.yLabels}
          color={"rgba(0, 255, 255"}
          data={TwoDGWPSavingyData}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>
    </div>
  );
};

export default OverallReactionAnodeCathode;
