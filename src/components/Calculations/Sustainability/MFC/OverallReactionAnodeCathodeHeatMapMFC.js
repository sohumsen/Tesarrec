import React from "react";

import ReadAnodeJSON from "../../../Excel/Anode/ReadAndodeJSON";
//import ReadCathodeJSON from "../../Excel/Cathode/ReadCathodeJSON";
import CashFlowGraph from "./CashFlowGraph";
import MFCPic from "../../../../assets/MFC.png";
import { random } from "mathjs";
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
  let ElectricityGenerationData = [];
  let GWPSavingData = [];
  let CapitalCostData = [];
  let ProductValueData = [];
  let OpexData = [];
  let CapexData = [];
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

    let ElectricityGeneration =
      (-1 *
        (((props.concentration * props.volume * props.efficiency) /
          (xDash * MolarMassOfSubstrate)) *
          (-394.36 - xDash * GibbsSubstrateInitial + nDash * -237.13))) /
      3.6;

    let CapitalCost =
      ((props.AnodeCost + props.CathodeCost) *
        ElectricityGeneration *
        props.LangFactorCost) /
      10.84;

    let ProductValue =
      ElectricityGeneration * props.ElectricityPriceCost * 8.76;

    let Capex = CapitalCost * props.AnnualCapitalChargeCost;

    let Opex =
      1.3 *
      ((0.189 * Capex) / props.LangFactorCost +
        (props.AnolyteCost + props.CatholyteCost) *
          0.0167 *
          ElectricityGeneration +
        0.09 * props.concentration * props.volume);
    

    let GWPsaving = ElectricityGeneration * 3.6 * CarbonEmmision * 8.76;
    CapexData.push(Capex.toFixed(2));

    ElectricityGenerationData.push(ElectricityGeneration.toFixed(2));

    CapitalCostData.push(CapitalCost.toFixed(2));

    ProductValueData.push(ProductValue.toFixed(2));

    OpexData.push(Opex.toFixed(2));

    GWPSavingData.push(GWPsaving.toFixed(2));

    //console.log( Xelement,Yelement)

    //console.log((StandardGibbsEnergyOfReactionkJ.toFixed(2)))
  });

  const FormatArr = (Arr) => {
    let TwoDArr = [];

    while (Arr.length)
      TwoDArr.push(Arr.splice(0, props.heatMapContents.xLabels.length));

    return TwoDArr;
  };

  let TwoDElectricityGeneration = FormatArr(ElectricityGenerationData);

  let TwoDGWPSavingyData = FormatArr(GWPSavingData);

  let TwoDCapitalCostData = FormatArr(CapitalCostData);

  let TwoDProductValueData = FormatArr(ProductValueData);

  let TwoDOpexData = FormatArr(OpexData);

  let TwoDCapexData = FormatArr(CapexData);



  //console.log(energyObj)

  //console.log("heat map contents   "+ props.heatMapContents)
  return (
    <div className={classes.HeatMaps}>
      <div className={classes.HeatMapEnergyPerformance}>
        <img src={MFCPic} width="100%" alt="MFC Pic "></img>
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Electricity Generation (Watt)</h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={["Electricity"]}
          color={"rgba(33, 236, 52"}
          data={TwoDElectricityGeneration}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>

      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Global Warming Potential saving (kg CO&#8322; eq./year)</h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={["GWP"]}
          color={"rgba(8, 82, 210"}
          data={TwoDGWPSavingyData}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Heat map of Capital Cost (&euro;)</h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={["Capital Cost"]}
          color={"rgba(127, 96, 169"}
          data={TwoDCapitalCostData}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>

      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Heat map of Operating Cost (&euro;/year)</h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={["Operating Cost"]}
          color={"rgba(251, 57, 80"}
          data={TwoDOpexData}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Heat map of Product Value (&euro;/year)</h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={["Product Value"]}
          color={"rgba(19, 96, 82"}
          data={TwoDProductValueData}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>

      <div className={classes.HeatMapEnergyPerformance}>
        <CashFlowGraph
          TwoDCapitalCostData={TwoDCapitalCostData}
          TwoDProductValueData={TwoDProductValueData}
          TwoDOpexData={TwoDOpexData}
          TwoDCapexData={TwoDCapexData}
          IRRCost={props.IRRCost}
          anodeSubstrate={props.anodeSubstrate}
          cathodeProduct={props.cathodeProduct}
          xCoordAnode={props.xCoordAnode}
          yCoordCathode={props.yCoordCathode}
        />
      </div>
    </div>
  );
};

export default OverallReactionAnodeCathode;
