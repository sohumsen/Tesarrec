import React from "react";

//import ReadCathodeJSON from "../../Excel/Cathode/ReadCathodeJSON";
import CashFlowGraph from "./CashFlowGraph";
import BioethanolPic from "../../../../assets/Chemical.png";
import classes from "./OverallReactionAnodeCathodeCHP.module.css";
import ColumnChart from "../../../UI/Canvas/ColumnChart";

import MyHeatMap from "../../../UI/MyHeatMap/MyHeatMap";

import Social from "../../../Excel/Social/SocialChemical.json";

const OverallReactionAnodeCathode = (props) => {
  let {
    BiomassFeedstockAvailability,
    CelluloseContent,
    HemicelluloseContent,
    StarchContent,
    ProteinContent,
    AshContent,
    ExtractiveContent,
    LigninContent,

    InstallationFactor,
    AnnualCapitalCharge,

    BiomassCost,
    ChemicalPrice,
    ElectricityCost,
    SteamCost,
  } = props.state.data;

  ///////////////////////////////////////////////
  let Total =
    CelluloseContent +
    HemicelluloseContent +
    StarchContent +
    ProteinContent +
    AshContent +
    ExtractiveContent +
    LigninContent;
  let CelluloseFraction = CelluloseContent / Total;
  let HemicelluloseFraction = HemicelluloseContent / Total;
  let StarchFraction = StarchContent / Total;
  let ProteinFraction = ProteinContent / Total;
  let AshFraction = AshContent / Total;
  let ExtractiveFraction = ExtractiveContent / Total;
  let LigninFraction = LigninContent / Total;
  //////////////////////////////////////////////////

  let SugarProduction =
    CelluloseFraction + HemicelluloseFraction + StarchFraction;
  let ProteinProduction = ProteinFraction;
  let SaltProduction = 0.75 * (AshFraction + ExtractiveFraction);
  let NutrientProduction = 0.25 * 0.88 * (AshFraction + ExtractiveFraction);
  let MineralProduction = 0.25 * 0.12 * (AshFraction + ExtractiveFraction);

  let FDCAProduction = 0.64 * SugarProduction;
  let LacticacidProduction = 0.93 * SugarProduction;
  let SuccinicacidProduction = 0.75 * SugarProduction;
  let LevulinicacidProduction = 0.46 * CelluloseFraction;
  ///////////////////////////////////////////////////////
  let DeliveredCostofEquipmentSugar =
    11.56 * (BiomassFeedstockAvailability * 0.0068) ** 0.8 +
    0.55 * (BiomassFeedstockAvailability * 0.0013) ** 0.7 +
    +0.62 * (BiomassFeedstockAvailability * 0.0019) ** 0.6 +
    4.36 * (BiomassFeedstockAvailability * 0.0025) ** 0.7 +
    1.57 *
      (NutrientProduction * BiomassFeedstockAvailability * 0.0045) ** 0.65 +
    3.57 *
      ((SugarProduction + ProteinProduction + SaltProduction) *
        BiomassFeedstockAvailability *
        0.00055) **
        0.33 +
    1.57 * (SaltProduction * BiomassFeedstockAvailability * 0.0045) ** 0.65 +
    2.1 * (SugarProduction * BiomassFeedstockAvailability * 0.00055) ** 0.65;

  let DeliveredCostofEquipmentFDCA =
    1.22 * ((FDCAProduction * BiomassFeedstockAvailability) / 2.24) ** 0.67;
  let DeliveredCostofEquipmentLacticacid =
    1.73 *
    ((LacticacidProduction * BiomassFeedstockAvailability) / 3.26) ** 0.67;
  let DeliveredCostofEquipmentSuccinicacid =
    3.99 *
    ((SuccinicacidProduction * BiomassFeedstockAvailability) / 2.63) ** 0.67;
  let DeliveredCostofEquipmentLevulinicacid =
    1.95 *
    ((LevulinicacidProduction * BiomassFeedstockAvailability) / 0.46) ** 0.67;
  let CapexSugar =
    DeliveredCostofEquipmentSugar * InstallationFactor * AnnualCapitalCharge;
  let CapexFDCA =
    DeliveredCostofEquipmentFDCA * InstallationFactor * AnnualCapitalCharge;
  let CapexLacticacid =
    DeliveredCostofEquipmentLacticacid *
    InstallationFactor *
    AnnualCapitalCharge;
  let CapexSuccinicacid =
    DeliveredCostofEquipmentSuccinicacid *
    InstallationFactor *
    AnnualCapitalCharge;
  let CapexLevulinicacid =
    DeliveredCostofEquipmentLevulinicacid *
    InstallationFactor *
    AnnualCapitalCharge;

  let OpexSugar =
    1.3 *
    (1.29 * BiomassFeedstockAvailability * ElectricityCost +
      1.014 * BiomassFeedstockAvailability * SteamCost +
      0.55 * DeliveredCostofEquipmentSugar);
  let OpexFDCA =
    1.3 *
    (0.507 * BiomassFeedstockAvailability * ElectricityCost +
      0.55 * DeliveredCostofEquipmentFDCA);
  let OpexLacticacid =
    1.3 *
    (0.608 * BiomassFeedstockAvailability * ElectricityCost +
      0.55 * DeliveredCostofEquipmentLacticacid);
  let OpexSuccinicacid =
    1.3 *
    (0.33 * BiomassFeedstockAvailability * ElectricityCost +
      0.44 * BiomassFeedstockAvailability * SteamCost +
      0.55 * DeliveredCostofEquipmentSuccinicacid);
  let OpexLevulinicacid =
    1.3 *
    (0.406 * BiomassFeedstockAvailability * SteamCost +
      0.55 * DeliveredCostofEquipmentLevulinicacid);

  let FeedstockCost =
    (BiomassCost * BiomassFeedstockAvailability * 365) / 1000000;
  let COPSugar =
    (CapexSugar + OpexSugar + FeedstockCost) /
    (BiomassFeedstockAvailability * 0.365);
  let COPFDCA =
    (CapexFDCA +
      OpexFDCA +
      COPSugar * SugarProduction * BiomassFeedstockAvailability * 0.365) /
    (BiomassFeedstockAvailability * 0.365);
  let COPLacticacid =
    (CapexLacticacid +
      OpexLacticacid +
      COPSugar * SugarProduction * BiomassFeedstockAvailability * 0.365) /
    (BiomassFeedstockAvailability * 0.365);
  let COPSuccinicacid =
    (CapexSuccinicacid +
      OpexSuccinicacid +
      COPSugar * SugarProduction * BiomassFeedstockAvailability * 0.365) /
    (BiomassFeedstockAvailability * 0.365);
  let COPLevulinicacid =
    (CapexLevulinicacid +
      OpexLevulinicacid +
      COPSugar * SugarProduction * BiomassFeedstockAvailability * 0.365) /
    (BiomassFeedstockAvailability * 0.365);
  ///////////////////////////////////////////////////////

  let GlobalWarmingPotentialSugar =
    ((LigninFraction * 23 * 0.8 * 0.35 - 12.69) * 0.024 +
      (LigninFraction * 23 * 0.8 * 0.7 - 10) * 0.078) /
    SugarProduction;
  let GlobalWarmingPotentialFDCA =
    (-5 * 0.024) / FDCAProduction +
    GlobalWarmingPotentialSugar * FDCAProduction +
    3.47;
  let GlobalWarmingPotentialLacticacid =
    (-6 * 0.024) / LacticacidProduction +
    GlobalWarmingPotentialSugar * LacticacidProduction +
    3.47;
  let GlobalWarmingPotentialSuccinicacid =
    (-3.24 * 0.024 + -4.3 * 0.078) / SuccinicacidProduction +
    GlobalWarmingPotentialSugar * SuccinicacidProduction +
    3.47;
  let GlobalWarmingPotentialLevulinicacid =
    ((0.08 * SugarProduction * 0.8 - 4) * 0.078) / LevulinicacidProduction +
    GlobalWarmingPotentialSugar * LevulinicacidProduction +
    3.47;

  //////////////////////////////////////////////////////////
  let TotalSocial =
    props.state.data.ProportionImportBrazil +
    props.state.data.ProportionImportSpain +
    props.state.data.ProportionImportFrance +
    props.state.data.ProportionImportGermany +
    props.state.data.ProportionImportNetherlands +
    props.state.data.ProportionImportUSA +
    props.state.data.ProportionImportBelgium +
    props.state.data.ProportionImportChina +
    props.state.data.ProportionImportMalaysia +
    props.state.data.ProportionImportJapan +
    props.state.data.ProportionImportColombia;
  let LRDW =
    (Social.Brazil.LRDW * props.state.data.ProportionImportBrazil +
      Social.Spain.LRDW * props.state.data.ProportionImportSpain +
      Social.France.LRDW * props.state.data.ProportionImportFrance +
      Social.Germany.LRDW * props.state.data.ProportionImportGermany +
      Social.Netherlands.LRDW * props.state.data.ProportionImportNetherlands +
      Social.USA.LRDW * props.state.data.ProportionImportUSA +
      Social.China.LRDW * props.state.data.ProportionImportChina +
      Social.Belgium.LRDW * props.state.data.ProportionImportBelgium +
      Social.Malaysia.LRDW * props.state.data.ProportionImportMalaysia +
      Social.Japan.LRDW * props.state.data.ProportionImportJapan +
      Social.Colombia.LRDW * props.state.data.ProportionImportColombia -
      Social.Mexico.LRDW * TotalSocial)*100 /
    (Social.Mexico.LRDW * TotalSocial);

  let HS =
    (Social.Brazil.HS * props.state.data.ProportionImportBrazil +
      Social.Spain.HS * props.state.data.ProportionImportSpain +
      Social.France.HS * props.state.data.ProportionImportFrance +
      Social.Germany.HS * props.state.data.ProportionImportGermany +
      Social.Netherlands.HS * props.state.data.ProportionImportNetherlands +
      Social.USA.HS * props.state.data.ProportionImportUSA +
      Social.China.HS * props.state.data.ProportionImportChina +
      Social.Belgium.HS * props.state.data.ProportionImportBelgium +
      Social.Malaysia.HS * props.state.data.ProportionImportMalaysia +
      Social.Japan.HS * props.state.data.ProportionImportJapan +
      Social.Colombia.HS * props.state.data.ProportionImportColombia -
      Social.Mexico.HS * TotalSocial)*100 /
    (Social.Mexico.HS * TotalSocial);

  let HR =
    (Social.Brazil.HR * props.state.data.ProportionImportBrazil +
      Social.Spain.HR * props.state.data.ProportionImportSpain +
      Social.France.HR * props.state.data.ProportionImportFrance +
      Social.Germany.HR * props.state.data.ProportionImportGermany +
      Social.Netherlands.HR * props.state.data.ProportionImportNetherlands +
      Social.USA.HR * props.state.data.ProportionImportUSA +
      Social.China.HR * props.state.data.ProportionImportChina +
      Social.Belgium.HR * props.state.data.ProportionImportBelgium +
      Social.Malaysia.HR * props.state.data.ProportionImportMalaysia +
      Social.Japan.HR * props.state.data.ProportionImportJapan +
      Social.Colombia.HR * props.state.data.ProportionImportColombia -
      Social.Mexico.HR * TotalSocial)*100 /
    (Social.Mexico.HR * TotalSocial);
  let G =
    (Social.Brazil.G * props.state.data.ProportionImportBrazil +
      Social.Spain.G * props.state.data.ProportionImportSpain +
      Social.France.G * props.state.data.ProportionImportFrance +
      Social.Germany.G * props.state.data.ProportionImportGermany +
      Social.Netherlands.G * props.state.data.ProportionImportNetherlands +
      Social.USA.G * props.state.data.ProportionImportUSA +
      Social.China.G * props.state.data.ProportionImportChina +
      Social.Belgium.G * props.state.data.ProportionImportBelgium +
      Social.Malaysia.G * props.state.data.ProportionImportMalaysia +
      Social.Japan.G * props.state.data.ProportionImportJapan +
      Social.Colombia.G * props.state.data.ProportionImportColombia -
      Social.Mexico.G * TotalSocial)*100 /
    (Social.Mexico.G * TotalSocial);

  let CI =
    (Social.Brazil.CI * props.state.data.ProportionImportBrazil +
      Social.Spain.CI * props.state.data.ProportionImportSpain +
      Social.France.CI * props.state.data.ProportionImportFrance +
      Social.Germany.CI * props.state.data.ProportionImportGermany +
      Social.Netherlands.CI * props.state.data.ProportionImportNetherlands +
      Social.USA.CI * props.state.data.ProportionImportUSA +
      Social.China.CI * props.state.data.ProportionImportChina +
      Social.Belgium.CI * props.state.data.ProportionImportBelgium +
      Social.Malaysia.CI * props.state.data.ProportionImportMalaysia +
      Social.Japan.CI * props.state.data.ProportionImportJapan +
      Social.Colombia.CI * props.state.data.ProportionImportColombia -
      Social.Mexico.CI * TotalSocial)*100 /
    (Social.Mexico.CI * TotalSocial);

  return (
    <div className={classes.HeatMaps}>
      <div className={classes.HeatMapEnergyPerformance}>
        <img src={BioethanolPic} width="100%" alt="Bioethanol Pic"></img>
      </div>

      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={"Product yield t/t biomass (dry)"}
          labelData1={[
            {
              label: "Sugar",
              y: parseFloat(SugarProduction.toFixed(2)),
            },

            {
              label: "Protein",
              y: parseFloat(ProteinProduction.toFixed(2)),
            },

            {
              label: "Salt",
              y: parseFloat(SaltProduction.toFixed(2)),
            },
            {
              label: "Nutrient",
              y: parseFloat(NutrientProduction.toFixed(2)),
            },

            {
              label: "Mineral",
              y: parseFloat(MineralProduction.toFixed(2)),
            },
          ]}
          type={"bar"}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={"Chemical (from sugar) yield t/t biomass (dry)"}
          labelData1={[
            {
              label: "FDCA (2,5-furandicarboxylic acid)",
              y: parseFloat(FDCAProduction.toFixed(2)),
            },
            {
              label: "Lactic Acid",
              y: parseFloat(LacticacidProduction.toFixed(2)),
            },
            {
              label: "Succinic Acid",
              y: parseFloat(SuccinicacidProduction.toFixed(2)),
            },

            {
              label: "Levulinic Acid",
              y: parseFloat(LevulinicacidProduction.toFixed(2)),
            },
          ]}
          type={"bar"}
        />
      </div>

      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={"CAPEX million$/year"}
          labelData1={[
            {
              label: "Sugar from Biomass ",
              y: parseFloat(CapexSugar.toFixed(2)),
            },

            {
              label: "FDCA from Sugar ",
              y: parseFloat(CapexFDCA.toFixed(2)),
            },
            {
              label: "Lactic Acid from Sugar ",
              y: parseFloat(CapexLacticacid.toFixed(2)),
            },
            {
              label: "Succinic Acid from Sugar ",
              y: parseFloat(CapexSuccinicacid.toFixed(2)),
            },
            {
              label: "Levulinic Acid from Sugar ",
              y: parseFloat(CapexLevulinicacid.toFixed(2)),
            },
          ]}
          type={"column"}
        />
      </div>

      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={"OPEX million$/year"}
          labelData1={[
            {
              label: "Sugar from Biomass ",
              y: parseFloat(OpexSugar.toFixed(2)),
            },

            {
              label: "FDCA from Sugar ",
              y: parseFloat(OpexFDCA.toFixed(2)),
            },
            {
              label: "Lactic Acid from Sugar ",
              y: parseFloat(OpexLacticacid.toFixed(2)),
            },
            {
              label: "Succinic Acid from Sugar ",
              y: parseFloat(OpexSuccinicacid.toFixed(2)),
            },
            {
              label: "Levulinic Acid from Sugar ",
              y: parseFloat(OpexLevulinicacid.toFixed(2)),
            },
          ]}
          type={"column"}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={"Cost of Production from Biomass $/kg"}
          labelData1={[
            {
              label: "Sugar",
              y: parseFloat(COPSugar.toFixed(2)),
            },

            {
              label: "FDCA",
              y: parseFloat(COPFDCA.toFixed(2)),
            },
            {
              label: "Lactic Acid",
              y: parseFloat(COPLacticacid.toFixed(2)),
            },
            {
              label: "Succinic Acid",
              y: parseFloat(COPSuccinicacid.toFixed(2)),
            },
            {
              label: "Levulinic Acid",
              y: parseFloat(COPLevulinicacid.toFixed(2)),
            },
            {
              label: "Chemical Price $/kg",
              y: parseFloat(ChemicalPrice.toFixed(2)),
            },
          ]}
          type={"column"}
        />
      </div>

      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={"Climate Impact Saving by Product from Biomass kg CO2 eq./kg"}
          labelData1={[
            {
              label: "Sugar",
              y: parseFloat(GlobalWarmingPotentialSugar.toFixed(2)),
            },
            {
              label: "FDCA",
              y: parseFloat(GlobalWarmingPotentialFDCA.toFixed(2)),
            },
            {
              label: "Lactic Acid",
              y: parseFloat(GlobalWarmingPotentialLacticacid.toFixed(2)),
            },
            {
              label: "Succinic Acid",
              y: parseFloat(GlobalWarmingPotentialSuccinicacid.toFixed(2)),
            },
            {
              label: "Levulinic Acid",
              y: parseFloat(GlobalWarmingPotentialLevulinicacid.toFixed(2)),
            },
          ]}
          type={"bar"}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={"Social LCA Savings in % (Mexico)"}
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
