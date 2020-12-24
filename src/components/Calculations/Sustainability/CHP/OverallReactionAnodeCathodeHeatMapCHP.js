import React from "react";

//import ReadCathodeJSON from "../../Excel/Cathode/ReadCathodeJSON";
import CashFlowGraph from "./CashFlowGraph";
import CHPPic from "../../../../assets/CHP.png";
import classes from "./OverallReactionAnodeCathodeCHP.module.css";
import ColumnChart from "../../../UI/Canvas/ColumnChart";

import MyHeatMap from "../../../UI/MyHeatMap/MyHeatMap";

import Social from "../../../Excel/Social/Social.json";

const OverallReactionAnodeCathode = (props) => {
  let {
    BiomassMoistureContent,
    BiomassCarbonContent,
    BiomassHydrogenContent,
    BiomassCalorificValue,

    BoilerEfficiency,
    IsentropicEfficiency,
    MechanicalEfficiency,

    ElectricityDemand,

    LangFactor,
    AnnualCapitalCharge,

    ElectricityPrice,
    SteamPrice,

    BiomassCost,
    IRRCost,
  } = props;

    ///////////////////////////////////////////////
    BiomassMoistureContent=parseFloat(BiomassMoistureContent)   
    BiomassCarbonContent=parseFloat(BiomassCarbonContent)   
    BiomassHydrogenContent=parseFloat(BiomassHydrogenContent)   
    BiomassCalorificValue=parseFloat(BiomassCalorificValue)   
    BoilerEfficiency=parseFloat(BoilerEfficiency)   
    IsentropicEfficiency=parseFloat(IsentropicEfficiency)   
    MechanicalEfficiency=parseFloat(MechanicalEfficiency)   
    ElectricityDemand=parseFloat(ElectricityDemand)   
    LangFactor=parseFloat(LangFactor)   
    AnnualCapitalCharge=parseFloat(AnnualCapitalCharge)   
    ElectricityPrice=parseFloat(ElectricityPrice)   
    SteamPrice=parseFloat(SteamPrice)   
    BiomassCost=parseFloat(BiomassCost)
    IRRCost=parseFloat(IRRCost)   

    ////////////////////////////////////////////

  let BiomassNeeded =
    (1560 * ElectricityDemand - 0.23) /
    (BiomassCarbonContent * 0.375 + BiomassHydrogenContent * 1.154) /
    BoilerEfficiency /
    IsentropicEfficiency /
    MechanicalEfficiency /
    (((BiomassCarbonContent + BiomassHydrogenContent) / 10000) *
      (100 - BiomassMoistureContent));
  let SteamGeneration =
    ((1560 * ElectricityDemand - 0.23) /
      (BiomassCarbonContent * 0.375 + BiomassHydrogenContent * 1.154) /
      BoilerEfficiency /
      IsentropicEfficiency /
      MechanicalEfficiency) *
    (0.2807 * (BiomassCarbonContent * 0.375 + BiomassHydrogenContent * 1.154) +
      0.0463);

  let ElectricityGenerationEfficiency =
    (411 * ElectricityDemand) / BiomassNeeded / BiomassCalorificValue;

  let ChpGenerationEfficiency =
    (411 * ElectricityDemand + 2.77 * SteamGeneration) /
    BiomassNeeded /
    BiomassCalorificValue;

  let BiomassGWPSaving = 454 * ElectricityDemand;

  let SolarGWPSaving = 414 * ElectricityDemand;

  let PumpedHydroGWPSaving = 84 * ElectricityDemand;

  let BiomassGWPPotential = 45 * ElectricityDemand;

  let SolarGWPPotentail = 85 * ElectricityDemand;

  let PumpedHydroGWPPotential = 415 * ElectricityDemand;

  let NaturalGasGWPPotential = 499 * ElectricityDemand;

  //////////////////////////////////////////////////////
  let BiomassAPotential = 0.876595 * ElectricityDemand;

  let SolarAPotentail = 0.4287 * ElectricityDemand;

  let PumpedHydroAPotential = 1.962646 * ElectricityDemand;

  let NaturalGasAPotential = 0.204136 * ElectricityDemand;

  ///////////////////////////////////////////////////
  let BiomassUSPotential = 0.848932 * ElectricityDemand;

  let SolarUSPotentail = 0.302699 * ElectricityDemand;

  let PumpedHydroUSPotential = 1.00526 * ElectricityDemand;

  let NaturalGasUSPotential = 0.298885 * ElectricityDemand;

  ////////////////////////////////////////////////////////
  let BiomassEPotential = 0.360017 * ElectricityDemand;

  let SolarEPotentail = 0.20286 * ElectricityDemand;

  let PumpedHydroEPotential = 0.600598 * ElectricityDemand;

  let NaturalGasEPotential = 0.044935 * ElectricityDemand;

  ////////////////////////////////////////////////////////
  let BiomassFPotential = 1347.577596 * ElectricityDemand;

  let SolarFPotentail = 837.8352 * ElectricityDemand;

  let PumpedHydroFPotential = 4781.759404 * ElectricityDemand;

  let NaturalGasFPotential = 6484.06368 * ElectricityDemand;

  ////////////////////////////////////////////////

  let LRDWData = [];
  let HSData = [];
  let HRData = [];
  let GData = [];
  let CIData = [];

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
    (1 -
      props.Other /
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
    ElectricityDemand;
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
    (1 -
      props.Other /
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
    ElectricityDemand;

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
    (1 -
      props.Other /
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
    ElectricityDemand;

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
      Social.UK.G) *
    (1 -
      props.Other /
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
    ElectricityDemand;

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
    (1 -
      props.Other /
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
    ElectricityDemand;

  let CapitalCost =
    (0.00174 * BiomassNeeded ** 0.7 + 0.1942 * ElectricityDemand ** 0.7) *
    LangFactor;

  let Capex = CapitalCost * AnnualCapitalCharge;

  let FixedOpex =
    1.3 *
    ((0.19 * CapitalCost * AnnualCapitalCharge) / LangFactor +
      (0.09 * BiomassNeeded) / 1000);

  let FeedStockCost = BiomassNeeded * BiomassCost * 0.000009;

  let Opex = FixedOpex + FeedStockCost;

  let CostOfChpProduction =
    (Capex + Opex) /
    ((ElectricityDemand * ChpGenerationEfficiency) /
      ElectricityGenerationEfficiency);

  let ProductValue =
    ElectricityPrice * ElectricityDemand +
    0.000009 * SteamPrice * SteamGeneration;

  return (
    <div className={classes.HeatMaps}>
      <div className={classes.HeatMapEnergyPerformance}>
        <img src={CHPPic} width="100%" alt="MFC Pic "></img>
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          labelData1={[
            {
              label: "Biomass needed kg/hour",
              y: parseFloat(BiomassNeeded.toFixed(2)),
            },
            {
              label: "Steam Generation kg/hour",
              y: parseFloat(SteamGeneration.toFixed(2)),
            },
          ]}
          type={"column"}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          labelData1={[
            {
              label: "Heat Generation Efficiency",
              y: parseFloat(
                (
                  ChpGenerationEfficiency - ElectricityGenerationEfficiency
                ).toFixed(2)
              ),
            },
            {
              label: "Electricity Generation Efficiency",
              y: parseFloat(ElectricityGenerationEfficiency.toFixed(2)),
            },
          ]}
          type={"bar"}
        />
        {/* <StackedChart
          name1={"Heat Generation Efficiency"}
          data1={[
            {
              x: 1,
              y: parseFloat(
                (
                  ChpGenerationEfficiency - ElectricityGenerationEfficiency
                ).toFixed(2)
              ),
            },
          ]}
          name2={"Electricity Generation Efficiency"}
          data2={[
            {
              x: 1,
              y: parseFloat(ElectricityGenerationEfficiency.toFixed(2)),
            },
          ]}
          title={""}
        /> */}
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={"Global Warming Potential (t CO2 eq.)/year"}
          labelData1={[
            {
              label: "Natural gas",
              y: parseFloat(NaturalGasGWPPotential.toFixed(2)),
            },

            {
              label: "Pumped Hydro",
              y: parseFloat(PumpedHydroGWPPotential.toFixed(2)),
            },
            { label: "Solar", y: parseFloat(SolarGWPPotentail.toFixed(2)) },
            { label: "Biomass", y: parseFloat(BiomassGWPPotential.toFixed(2)) },
          ]}
          type={"bar"}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={
            "Global Warming Potential Saving against natural gas t CO2 eq./year"
          }
          labelData1={[
            {
              label: "Pumped Hydro",
              y: parseFloat(PumpedHydroGWPSaving.toFixed(2)),
            },
            { label: "Solar", y: parseFloat(SolarGWPSaving.toFixed(2)) },
            { label: "Biomass", y: parseFloat(BiomassGWPSaving.toFixed(2)) },
          ]}
          type={"bar"}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          labelData1={[
            {
              label: "Cost Of Production €/kWh",
              y: parseFloat(CostOfChpProduction.toFixed(2)),
            },
            {
              label: "Electricity Price €/kWh",
              y: parseFloat(ElectricityPrice.toFixed(2)),
            },
          ]}
          type={"column"}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          labelData1={[
            { label: "Capex million €/y", y: Capex.toFixed(2) },
            { label: "Fixed Opex million €/y", y: FixedOpex.toFixed(2) },

            {
              label: "Feedstock Cost million €/y",
              y: FeedStockCost.toFixed(2),
            },

            { label: "Product Value million €/y", y: ProductValue.toFixed(2) },
          ]}
          type={"doughnut"}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <CashFlowGraph
          CapitalCost={parseFloat(CapitalCost.toFixed(2))}
          Capex={parseFloat(Capex.toFixed(2))}
          Opex={parseFloat(Opex.toFixed(2))}
          ProductValue={parseFloat(ProductValue.toFixed(2))}
          IRRCost={parseFloat(IRRCost.toFixed(2))}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={"Acidification Potential (t SO2 eq.)/year"}
          labelData1={[
            {
              label: "Natural gas",
              y: parseFloat(NaturalGasAPotential.toFixed(2)),
            },

            {
              label: "Pumped Hydro",
              y: parseFloat(PumpedHydroAPotential.toFixed(2)),
            },
            { label: "Solar", y: parseFloat(SolarAPotentail.toFixed(2)) },
            { label: "Biomass", y: parseFloat(BiomassAPotential.toFixed(2)) },
          ]}
          type={"bar"}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={"Urban Smog (t NMVOC eq.)/year"}
          labelData1={[
            {
              label: "Natural gas",
              y: parseFloat(NaturalGasUSPotential.toFixed(2)),
            },

            {
              label: "Pumped Hydro",
              y: parseFloat(PumpedHydroUSPotential.toFixed(2)),
            },
            { label: "Solar", y: parseFloat(SolarUSPotentail.toFixed(2)) },
            { label: "Biomass", y: parseFloat(BiomassUSPotential.toFixed(2)) },
          ]}
          type={"bar"}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={"Eutrophication Potential (t Phosphate eq.)/year"}
          labelData1={[
            {
              label: "Natural gas",
              y: parseFloat(NaturalGasEPotential.toFixed(2)),
            },

            {
              label: "Pumped Hydro",
              y: parseFloat(PumpedHydroEPotential.toFixed(2)),
            },
            { label: "Solar", y: parseFloat(SolarEPotentail.toFixed(2)) },
            { label: "Biomass", y: parseFloat(BiomassEPotential.toFixed(2)) },
          ]}
          type={"bar"}
        />
      </div>{" "}
      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={"Fossil Depletion GJ/year"}
          labelData1={[
            {
              label: "Natural gas",
              y: parseFloat(NaturalGasFPotential.toFixed(2)),
            },

            {
              label: "Pumped Hydro",
              y: parseFloat(PumpedHydroFPotential.toFixed(2)),
            },
            { label: "Solar", y: parseFloat(SolarFPotentail.toFixed(2)) },
            { label: "Biomass", y: parseFloat(BiomassFPotential.toFixed(2)) },
          ]}
          type={"bar"}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={"Saving in MRH on annual basis"}
          labelData1={[
            {
              label: "Labor Rights & Decent Work",
              y: parseFloat(LRDW.toFixed(2)),
            },

            {
              label: "Health & Safety",
              y: parseFloat(HS.toFixed(2)),
            },
            { label: "Human Rights", y: parseFloat(HR.toFixed(2)) },
            { label: "Governance", y: parseFloat(G.toFixed(2)) },
            { label: "Community Infrastructure", y: parseFloat(CI.toFixed(2)) },
          ]}
          type={"bar"}
        />
      </div>
    </div>
  );
};

export default OverallReactionAnodeCathode;
