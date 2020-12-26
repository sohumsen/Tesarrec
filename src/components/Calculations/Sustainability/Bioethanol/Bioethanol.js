import React from "react";

//import ReadCathodeJSON from "../../Excel/Cathode/ReadCathodeJSON";
import CashFlowGraph from "./CashFlowGraph";
import BioethanolPic from "../../../../assets/Bioethanol.png";
import classes from "./OverallReactionAnodeCathodeCHP.module.css";
import ColumnChart from "../../../UI/Canvas/ColumnChart";

import MyHeatMap from "../../../UI/MyHeatMap/MyHeatMap";

import Social from "../../../Excel/Social/SocialInternational.json";

const OverallReactionAnodeCathode = (props) => {
  let {
    BiomassFeedstockAvailability,
    MoistureContent,
    CelluloseContent,
    XylanContent,
    GlucanContent,
    ArabinanContent,
    MannanContent,
    GalactanContent,
    AshContent,
    ExtractiveContent,
    LigninContent,
    BiomassCalorificValue,

    InstallationFactor,
    AnnualCapitalCharge,
    IRRCost,

    BiomassCost,
    BioethanolPrice,

    ProportionImportBrazil,
    ProportionImportCanada,
    ProportionImportFrance ,
    ProportionImportGermany ,
    ProportionImportGuatemala ,
    ProportionImportUSA,
  } = props.state.data;

  ///////////////////////////////////////////////
  BiomassFeedstockAvailability=parseFloat(BiomassFeedstockAvailability)   
  MoistureContent=parseFloat(MoistureContent)   
  CelluloseContent=parseFloat(CelluloseContent)   
  XylanContent=parseFloat(XylanContent)   
  GlucanContent=parseFloat(GlucanContent)   
  ArabinanContent=parseFloat(ArabinanContent)   
  MannanContent=parseFloat(MannanContent)   
  GalactanContent=parseFloat(GalactanContent)   
  AshContent=parseFloat(AshContent)   
  ExtractiveContent=parseFloat(ExtractiveContent)   
  LigninContent=parseFloat(LigninContent)   
  BiomassCalorificValue=parseFloat(BiomassCalorificValue)   
  InstallationFactor=parseFloat(InstallationFactor)
  AnnualCapitalCharge=parseFloat(AnnualCapitalCharge)   
  IRRCost=parseFloat(IRRCost)   
  BiomassCost=parseFloat(BiomassCost)   
  BioethanolPrice=parseFloat(BioethanolPrice)   

  ProportionImportBrazil=parseFloat(ProportionImportBrazil)   
  ProportionImportCanada=parseFloat(ProportionImportCanada)
  ProportionImportFrance=parseFloat(ProportionImportFrance)   
  ProportionImportGermany=parseFloat(ProportionImportGermany)   
  ProportionImportGuatemala=parseFloat(ProportionImportGuatemala)   
  ProportionImportUSA=parseFloat(ProportionImportUSA)   
  ////////////////////////////////////////////
  let Total =
    MoistureContent +
    CelluloseContent +
    XylanContent +
    GlucanContent +
    ArabinanContent +
    MannanContent +
    GalactanContent +
    AshContent +
    ExtractiveContent +
    LigninContent;
  let MoistureFraction = MoistureContent / Total;
  let CelluloseFraction = CelluloseContent / Total;
  let XylanFraction = XylanContent / Total;
  let GlucanFraction = GlucanContent / Total;
  let ArabinanFraction = ArabinanContent / Total;
  let MannanFraction = MannanContent / Total;
  let GalactanFraction = GalactanContent / Total;
  let AshFraction = AshContent / Total;
  let LigninFraction = LigninContent / Total;
  //////////////////////////////////////////////////

  let BioethanolProduction =
    0.51 *
    (0.75 * (XylanFraction + ArabinanFraction) +
      0.9215 * (0.912 * CelluloseFraction + 0.099 * GlucanFraction));
  let TarProduction =
    0.05 *
      (XylanFraction + ArabinanFraction + MannanFraction + GalactanFraction) +
    0.003 * GlucanFraction;
  let OrganicProduction =
    1 -
    BioethanolProduction / 0.51 -
    LigninFraction -
    AshFraction -
    MoistureFraction -
    TarProduction;
  let BiogasProduction = OrganicProduction * 0.3;
  let ChpFeedstock =
    BiogasProduction * 23 + LigninFraction * 23.5 + TarProduction * 36;
  let SteamtoTurbine = (ChpFeedstock * 0.8 * 2.3) / 3;
  let ElectricityOutputGj = SteamtoTurbine * 0.35;
  let ElectricityUse = 4.74 * BioethanolProduction;
  let ElectricityOutput = (ElectricityOutputGj - ElectricityUse) / 3.6;
  let NutrientProduction = OrganicProduction - BiogasProduction / 0.6;
  ///////////////////////////////////////////////////////
  let BioethanolEfficiency =
    (BioethanolProduction * 29.7) / BiomassCalorificValue;

  let HeatEfficiency =
    (SteamtoTurbine * 0.9 - ElectricityOutputGj) / BiomassCalorificValue;
  let ElectricityEfficiency = (ElectricityOutput * 3.6) / BiomassCalorificValue;

  ///////////////////////////////////////////////////////
  let DeliveredCostofEquipment =
    (4.44 *
      ((BiomassFeedstockAvailability * (1 - MoistureFraction)) / (83.3 * 24)) **
        0.67 +
      14.1 *
        ((BiomassFeedstockAvailability * (1 - MoistureFraction)) /
          (83.3 * 24)) **
          0.78 +
      0.26 *
        ((BioethanolProduction * BiomassFeedstockAvailability) / (24 * 3.53)) **
          0.6 +
      5.88 *
        ((BioethanolProduction * BiomassFeedstockAvailability) /
          (24 * 18.466)) **
          0.7 +
      1.05 *
        ((OrganicProduction * BiomassFeedstockAvailability) / (24 * 10.1)) **
          0.65 +
      1.54 *
        (((OrganicProduction + MoistureFraction) *
          BiomassFeedstockAvailability) /
          (24 * 43)) **
          0.6 +
      116 *
        ((BiomassFeedstockAvailability * (1 - MoistureFraction)) / 2000) **
          0.6) *
    (600 / 402);


  let Capex =
    DeliveredCostofEquipment * InstallationFactor * AnnualCapitalCharge;
  let Opex =
    1.3 *
    (0.01 * BioethanolProduction * BiomassFeedstockAvailability +
      0.252 * DeliveredCostofEquipment * AnnualCapitalCharge +
      0.004 * BioethanolProduction * BiomassFeedstockAvailability);
  let FeedstockCost =
    (BiomassCost * BiomassFeedstockAvailability * 365) / 1000000;
  let ProductValue =
    (BioethanolPrice *
      BioethanolProduction *
      BiomassFeedstockAvailability *
      365) /
    1000;
  ///////////////////////////////////////////////////////
  let MESP =
    (Capex + Opex + FeedstockCost) /
    (BioethanolProduction * BiomassFeedstockAvailability * 0.365);

  ///////////////////////////////////////////////////////

  let GlobalWarmingPotential =
    (0.126 * ElectricityOutputGj * BiomassFeedstockAvailability * 365) / 1000000;
  let FossilResourceDepletion =
    (1.43 * ElectricityOutputGj * BiomassFeedstockAvailability * 365) / 1000000;

  //////////////////////////////////////////////////////////
  let TotalSocial =
    ProportionImportBrazil +
    ProportionImportCanada +
    ProportionImportFrance +
    ProportionImportGermany +
    ProportionImportGuatemala +
    ProportionImportUSA;

  let LRDW =
    (Social.Brazil.LRDW * ProportionImportBrazil +
      Social.Canada.LRDW * ProportionImportCanada +
      Social.France.LRDW * ProportionImportFrance +
      Social.Germany.LRDW * ProportionImportGermany +
      Social.Guatemala.LRDW * ProportionImportGuatemala +
      Social.USA.LRDW * ProportionImportUSA -
      Social.Mexico.LRDW * TotalSocial) /
    (Social.Mexico.LRDW * TotalSocial)*100;

  let HS =
    (Social.Brazil.HS * ProportionImportBrazil +
      Social.Canada.HS * ProportionImportCanada +
      Social.France.HS * ProportionImportFrance +
      Social.Germany.HS * ProportionImportGermany +
      Social.Guatemala.HS * ProportionImportGuatemala +
      Social.USA.HS * ProportionImportUSA -
      Social.Mexico.HS * TotalSocial) /
    (Social.Mexico.HS * TotalSocial)*100;

  let HR =
    (Social.Brazil.HR * ProportionImportBrazil +
      Social.Canada.HR * ProportionImportCanada +
      Social.France.HR * ProportionImportFrance +
      Social.Germany.HR * ProportionImportGermany +
      Social.Guatemala.HR * ProportionImportGuatemala +
      Social.USA.HR * ProportionImportUSA -
      Social.Mexico.HR * TotalSocial) /
    (Social.Mexico.HR * TotalSocial)*100;
  let G =
    (Social.Brazil.G * ProportionImportBrazil +
      Social.Canada.G * ProportionImportCanada +
      Social.France.G * ProportionImportFrance +
      Social.Germany.G * ProportionImportGermany +
      Social.Guatemala.G * ProportionImportGuatemala +
      Social.USA.G * ProportionImportUSA -
      Social.Mexico.G * TotalSocial) /
    (Social.Mexico.G * TotalSocial)*100;

  let CI =
    (Social.Brazil.CI * ProportionImportBrazil +
      Social.Canada.CI * ProportionImportCanada +
      Social.France.CI * ProportionImportFrance +
      Social.Germany.CI * ProportionImportGermany +
      Social.Guatemala.CI * ProportionImportGuatemala +
      Social.USA.CI * ProportionImportUSA -
      Social.Mexico.CI * TotalSocial) /
    (Social.Mexico.CI * TotalSocial)*100;

  return (
    <div className={classes.HeatMaps}>
      <div className={classes.HeatMapEnergyPerformance}>
        <img src={BioethanolPic} width="100%" alt="Bioethanol Pic"></img>
      </div>

      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={"Product yields 1 tonne (wet) biomass"}
          labelData1={[
            {
              label: "Nutrient Production t",
              y: parseFloat(NutrientProduction.toFixed(2)),
            },

            {
              label: "Electricity Output MWh",
              y: parseFloat(ElectricityOutput.toFixed(2)),
            },

            {
              label: "Bioethanol Production t",
              y: parseFloat(BioethanolProduction.toFixed(2)),
            },
          ]}
          type={"bar"}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={"Dimensionless energy efficiency"}
          labelData1={[
            {
              label: "Bioethanol Efficiency ",
              y: parseFloat(BioethanolEfficiency.toFixed(2)),
            },
            {
              label: "Heat Efficiency",
              y: parseFloat(HeatEfficiency.toFixed(2)),
            },

            {
              label: "Electricity Efficiency ",
              y: parseFloat(ElectricityEfficiency.toFixed(2)),
            },
          ]}
          type={"column"}
        />
      </div>

      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={"Economic analysis million $/y"}
          labelData1={[
            {
              label: "Capex ",
              y: parseFloat(Capex.toFixed(2)),
            },

            {
              label: "Opex ",
              y: parseFloat(Opex.toFixed(2)),
            },
            {
              label: "Feedstock Cost  ",
              y: parseFloat(FeedstockCost.toFixed(2)),
            },
            {
              label: "ProductValue  ",
              y: parseFloat(ProductValue.toFixed(2)),
            },
          ]}
          type={"pie"}
        />
      </div>

      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={" $/kg Bioethanol cost and price"}
          labelData1={[
            {
              label: "MESP  ",
              y: parseFloat(MESP.toFixed(2)),
            },

            {
              label: "BioethanolPrice ",
              y: parseFloat(BioethanolPrice.toFixed(2)),
            },
          ]}
          type={"bar"}
        />
      </div>

      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={" Environmental impact saving per year"}
          labelData1={[
            {
              label: "Global Warming Potential million t CO2 eq.",
              y: parseFloat(GlobalWarmingPotential.toFixed(2)),
            },

            {
              label: "Fossil Resource Depletion PJ ",
              y: parseFloat(FossilResourceDepletion.toFixed(2)),
            },
          ]}
          type={"bar"}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={"Social LCA savings in % (Mexico)"}
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
      <div className={classes.HeatMapEnergyPerformance}>
        <CashFlowGraph
          CapitalCost={parseFloat(
            (DeliveredCostofEquipment * InstallationFactor).toFixed(2)
          )}
          Capex={parseFloat(Capex.toFixed(2))}
          Opex={parseFloat(Opex.toFixed(2))}
          ProductValue={parseFloat(ProductValue.toFixed(2))}
          IRRCost={parseFloat(IRRCost.toFixed(2))}
        />
      </div>
    </div>
  );
};

export default OverallReactionAnodeCathode;
