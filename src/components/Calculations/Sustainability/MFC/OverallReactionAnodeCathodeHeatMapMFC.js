import React from "react";

import ReadAnodeJSON from "../../../Excel/Anode/ReadAndodeJSON";
//import ReadCathodeJSON from "../../Excel/Cathode/ReadCathodeJSON";
import CashFlowGraph from "./CashFlowGraph";
import MFCPic from "../../../../assets/MFC.png";
import MyHeatMap from "../../../UI/MyHeatMap/MyHeatMap";
import Social from "../../../Excel/Social/Social.json";
import classes from "./OverallReactionAnodeCathodeMFC.module.css";
const OverallReactionAnodeCathode = (props) => {
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

  let AcidificationPotential =
    (props.CCGT * 0.000056704579 +
      props.Nuclear * 0.000017316871 +
      props.Biomass * 0.00024349871 +
      props.Coal * 0.0020505269 +
      props.Wind * 0.000051266188 +
      props.Solar * 0.00011908327 +
      props.Oil * 0.0045650491 +
      props.OCGT * 0.000056704579 +
      props.Hydroelectric * 0.0000054225592 +
      props.PumpedHydro * 0.000545 +
      props.Other * 0.00005) /
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

  let UrbanSmog =
    (props.CCGT * 0.000083023704 +
      props.Nuclear * 0.00001362 +
      props.Biomass * 0.00023581 +
      props.Coal * 0.00090780271 +
      props.Wind * 0.0000289 +
      props.Solar * 0.00008408 +
      props.Oil * 0.00168527 +
      props.OCGT * 0.000083023704 +
      props.Hydroelectric * 0.00000554 +
      props.PumpedHydro * 0.000279 +
      props.Other * 0.00008) /
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

  let EutrophicationPotential =
    (props.CCGT * 0.00001248 +
      props.Nuclear * 0.000013986631 +
      props.Biomass * 0.00010000479 +
      props.Coal * 0.00061698438 +
      props.Wind * 0.000036081453 +
      props.Solar * 0.000056350093 +
      props.Oil * 0.0045650491 +
      props.OCGT * 0.00021880766 +
      props.Hydroelectric * 0.00000194744 +
      props.PumpedHydro * 0.000167 +
      props.Other * 0.00001) /
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
  let FossilEnergy =
    (props.CCGT * 1.8011288 +
      props.Nuclear * 0.034998681 +
      props.Biomass * 0.37432711 +
      props.Coal * 3.3823918 +
      props.Wind * 0.059887278 +
      props.Solar * 0.232732 +
      props.Oil * 5.0976296 +
      props.OCGT * 1.8011288 +
      props.Hydroelectric * 0.009900402 +
      props.PumpedHydro * 1.328267 +
      props.Other * 1.8) /
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
  let APsavingData = [];
  let USsavingData = [];
  let EPsavingData = [];
  let FEsavingData = [];

  let CapitalCostData = [];
  let ProductValueData = [];
  let OpexData = [];
  let CapexData = [];
  let MinimumProductSellingPriceData = [];

  let LRDWData = [];
  let HSData = [];
  let HRData = [];
  let GData = [];
  let CIData = [];

  props.heatMapContents.xLabels.forEach((Xelement) => {
    let AnodeData = ReadAnodeJSON(Xelement);
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
    let LRDW =
      ((Social.Denmark.LRDW * props.ProportionImportDenmark +
        Social.Ireland.LRDW * props.ProportionImportIreland +
        Social.Belgium.LRDW * props.ProportionImportBelgium +
        Social.Netherlands.LRDW * props.ProportionImportNetherlands +
        Social.France.LRDW * props.ProportionImportFrance) /
        (props.ProportionImportDenmark +
          props.ProportionImportIreland +
          props.ProportionImportBelgium +
          props.ProportionImportNetherlands +
          props.ProportionImportFrance) -
        Social.UK.LRDW) *
      (1 - (props.Other) /
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
          props.Other)) *
      ElectricityGeneration *
      24 *
      0.365;
    let HS =
      ((Social.Denmark.HS * props.ProportionImportDenmark +
        Social.Ireland.HS * props.ProportionImportIreland +
        Social.Belgium.HS * props.ProportionImportBelgium +
        Social.Netherlands.HS * props.ProportionImportNetherlands +
        Social.France.HS * props.ProportionImportFrance) /
        (props.ProportionImportDenmark +
          props.ProportionImportIreland +
          props.ProportionImportBelgium +
          props.ProportionImportNetherlands +
          props.ProportionImportFrance) -
        Social.UK.HS) *
      (1 - (props.Other) /
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
          props.Other)) *
      ElectricityGeneration *
      24 *
      0.365;
    let HR =
      ((Social.Denmark.HR * props.ProportionImportDenmark +
        Social.Ireland.HR * props.ProportionImportIreland +
        Social.Belgium.HR * props.ProportionImportBelgium +
        Social.Netherlands.HR * props.ProportionImportNetherlands +
        Social.France.HR * props.ProportionImportFrance) /
        (props.ProportionImportDenmark +
          props.ProportionImportIreland +
          props.ProportionImportBelgium +
          props.ProportionImportNetherlands +
          props.ProportionImportFrance) -
        Social.UK.HR) *
      (1 - (props.Other) /
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
          props.Other)) *
      ElectricityGeneration *
      24 *
      0.365;
    let G =
      ((Social.Denmark.G * props.ProportionImportDenmark +
        Social.Ireland.G * props.ProportionImportIreland +
        Social.Belgium.G * props.ProportionImportBelgium +
        Social.Netherlands.G * props.ProportionImportNetherlands +
        Social.France.G * props.ProportionImportFrance) /
        (props.ProportionImportDenmark +
          props.ProportionImportIreland +
          props.ProportionImportBelgium +
          props.ProportionImportNetherlands +
          props.ProportionImportFrance) -
        Social.UK.G)*
        (1 - (props.Other) /
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
            props.Other)) *
        ElectricityGeneration *
        24 *
        0.365;
    let CI =
      ((Social.Denmark.CI * props.ProportionImportDenmark +
        Social.Ireland.CI * props.ProportionImportIreland +
        Social.Belgium.CI * props.ProportionImportBelgium +
        Social.Netherlands.CI * props.ProportionImportNetherlands +
        Social.France.CI * props.ProportionImportFrance) /
        (props.ProportionImportDenmark +
          props.ProportionImportIreland +
          props.ProportionImportBelgium +
          props.ProportionImportNetherlands +
          props.ProportionImportFrance) -
        Social.UK.CI) *
      (1 - (props.Other) /
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
          props.Other)) *
      ElectricityGeneration *
      24 *
      0.365;
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
    let MinimumProductSellingPrice =
      (Capex + Opex) / (ElectricityGeneration * 24 * 0.365);

    let GWPsaving = ElectricityGeneration * 3.6 * CarbonEmmision * 8.76;
    let APsaving = ElectricityGeneration * 3.6 * AcidificationPotential * 8.76;
    let USsaving = ElectricityGeneration * 3.6 * UrbanSmog * 8.76;
    let EPsaving = ElectricityGeneration * 3.6 * EutrophicationPotential * 8.76;
    let FEsaving = ElectricityGeneration * 3.6 * FossilEnergy * 8.76;

    CapexData.push(Capex.toFixed(2));

    ElectricityGenerationData.push(ElectricityGeneration.toFixed(2));

    CapitalCostData.push(CapitalCost.toFixed(2));

    ProductValueData.push(ProductValue.toFixed(2));

    OpexData.push(Opex.toFixed(2));

    GWPSavingData.push(GWPsaving.toFixed(2));

    APsavingData.push(APsaving.toFixed(2));

    USsavingData.push(USsaving.toFixed(2));

    EPsavingData.push(EPsaving.toFixed(2));

    FEsavingData.push(FEsaving.toFixed(2));

    LRDWData.push(LRDW.toFixed(2));
    HSData.push(HS.toFixed(2));
    HRData.push(HR.toFixed(2));
    GData.push(G.toFixed(2));
    CIData.push(CI.toFixed(2));

    MinimumProductSellingPriceData.push(MinimumProductSellingPrice.toFixed(4));
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

  let TwoDAPsavingData = FormatArr(APsavingData);

  let TwoDUSsavingData = FormatArr(USsavingData);

  let TwoDEPsavingData = FormatArr(EPsavingData);

  let TwoDFEsavingData = FormatArr(FEsavingData);

  let TwoDLRDWData = FormatArr(LRDWData);
  let TwoDHSData = FormatArr(HSData);
  let TwoDHRData = FormatArr(HRData);
  let TwoDGData = FormatArr(GData);
  let TwoDCIData = FormatArr(CIData);

  let TwoDMinimumProductSellingPrice = FormatArr(
    MinimumProductSellingPriceData
  );

  return (
    <div className={classes.HeatMaps}>
      <div className={classes.HeatMapEnergyPerformance}>
        <img src={MFCPic} width="100%" alt="MFC Pic "></img>
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Discounted cash flow analysis</h3>

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
          color={"rgba(3, 236, 52"}
          data={TwoDGWPSavingyData}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Heat map of Capital Cost (&euro;)</h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={["Capital Cost"]}
          color={"rgba(63, 236, 52"}
          data={TwoDCapitalCostData}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Heat map of Operating Cost (&euro;/year)</h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={["Operating Cost"]}
          color={"rgba(103, 236, 52"}
          data={TwoDOpexData}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Heat map of Product Value (&euro;/year)</h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={["Product Value"]}
          color={"rgba(143, 236, 52"}
          data={TwoDProductValueData}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Heat map of Minimum Electricity Selling Price (&euro;/kWh)</h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={["Product Value"]}
          color={"rgba(183, 236, 52"}
          data={TwoDMinimumProductSellingPrice}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Acidification potential saving (kg SO2 eq./year)</h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={["Product Value"]}
          color={"rgba(223, 236, 52"}
          data={TwoDAPsavingData}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Urban smog saving (kg NMVOC eq./year)</h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={["Product Value"]}
          color={"rgba(103, 200, 52"}
          data={TwoDUSsavingData}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Eutrophication potential saving (kg Phosphate eq./year)</h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={["Product Value"]}
          color={"rgba(103, 170, 52"}
          data={TwoDEPsavingData}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Fossil energy saving (MJ/year) </h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={["Product Value"]}
          color={"rgba(103, 140, 52"}
          data={TwoDFEsavingData}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Saving in Labor Rights {"&"} Decent Work in MHR on annual basis</h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={["Product Value"]}
          color={"rgba(103, 120, 52"}
          data={TwoDLRDWData}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Saving in Health {"&"} Safety in MHR on annual basis</h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={["Product Value"]}
          color={"rgba(103, 100, 52"}
          data={TwoDHSData}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Saving in Human Rights in MHR on annual basis</h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={["Product Value"]}
          color={"rgba(103, 140, 80"}
          data={TwoDHRData}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Saving in Governance in MHR on annual basis</h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={["Product Value"]}
          color={"rgba(103, 140, 60"}
          data={TwoDGData}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <h3>Saving in Community Infrastructure in MHR on annual basis</h3>
        <MyHeatMap
          xLabels={props.heatMapContents.xLabels}
          yLabels={["Product Value"]}
          color={"rgba(103, 140, 100"}
          data={TwoDCIData}
          HeatMapChangedOnClick={props.HeatMapChangedOnClick}
        />
      </div>
    </div>
  );
};

export default OverallReactionAnodeCathode;
