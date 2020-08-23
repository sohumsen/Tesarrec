import React from "react";

//import ReadCathodeJSON from "../../Excel/Cathode/ReadCathodeJSON";
import CashFlowGraph from "./CashFlowGraph";
import CHPPic from "../../../../assets/CHP.png";
import classes from "./OverallReactionAnodeCathodeCHP.module.css";
import ColumnChart from "../../../UI/Canvas/ColumnChart";
import StackedChart from "../../../UI/Canvas/StackedChart";

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
              ),            },
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
            "Global Warming Potential Saving compared to natural gas (t CO2 eq.)/year"
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
    </div>
  );
};

export default OverallReactionAnodeCathode;
