import React from "react";

//import ReadCathodeJSON from "../../Excel/Cathode/ReadCathodeJSON";
import CashFlowGraph from "./CashFlowGraph";
import CHPPic from "../../../../assets/CHP.png";
import classes from "./OverallReactionAnodeCathodeCHP.module.css";
import ColumnChart from "../../../UI/Canvas/ColumnChart";
import StackedColumnChart from "../../../UI/Canvas/StackedColumnChart";

const OverallReactionAnodeCathode = (props) => {
  //console.log(props.anodeSubstrate)
  //console.log(props.cathodeProduct)
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

  let CapitalCost =
    (0.00174 * BiomassNeeded ** 0.7 + 0.1942 * ElectricityDemand ** 0.7) *
    LangFactor;

  let Capex = CapitalCost * AnnualCapitalCharge;

  let Opex =
    1.3 *
      ((0.19 * CapitalCost * AnnualCapitalCharge) / LangFactor +
        (0.09 * BiomassNeeded) / 1000) +
    BiomassNeeded * BiomassCost * 0.000009;

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
      <p> BiomassNeeded={BiomassNeeded}</p>
      <p> SteamGeneration={SteamGeneration}</p>
      <p> ElectricityGenerationEfficiency={ElectricityGenerationEfficiency}</p>
      <p> ChpGenerationEfficiency={ChpGenerationEfficiency}</p>
      <p> GlobalWarmingPotentialSaving={BiomassGWPSaving}</p>
      <p> CapitalCost={CapitalCost}</p>
      <p> Capex={Capex}</p>
      <p> Opex={Opex}</p>
      <p> CostOfChpProduction={CostOfChpProduction}</p>
      <p> ProductValue={ProductValue}</p>
      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          labelData1={[
            { label: "Biomass needed", y: BiomassNeeded },
            { label: "Steam Generation", y: SteamGeneration },
          ]}
          type={"column"}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          labelData1={[
            { label: "Heat Generation Efficiency", y: ChpGenerationEfficiency-ElectricityGenerationEfficiency },
            { label: "Electricity Generation Efficiency", y: ElectricityGenerationEfficiency },
          ]}
          type={"doughnut"}
        />
      </div>

      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          labelData1={[
            { label: "Pumped Hydro", y: PumpedHydroGWPSaving },
            { label: "Solar", y: SolarGWPSaving },
            { label: "Biomass", y: BiomassGWPSaving },

          ]}
          type={"bar"}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          labelData1={[
            { label: "Cost Of Chp Production", y: CostOfChpProduction },
            { label: "Electricity Price", y: ElectricityPrice },
          ]}
          type={"column"}
        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <StackedColumnChart
          labelData1={[
            { label: "Capex", y: Capex },
            { label: "Opex", y: Opex },
            { label: "Product Value", y: ProductValue },

          ]}
        
          type1={"doughnut"}

        />
      </div>
      <div className={classes.HeatMapEnergyPerformance}>
        <CashFlowGraph
          CapitalCost={CapitalCost}
          Capex={Capex}
          Opex={Opex}
          ProductValue={ProductValue}
          IRRCost={IRRCost}
        />
      </div>
    </div>
  );
};

export default OverallReactionAnodeCathode;
