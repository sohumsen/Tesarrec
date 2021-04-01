import { Grid, Paper } from "@material-ui/core";
import React from "react";
import EconomicAnalysisData from "../../../containers/EconomicAnalysis/EconomicAnalysisData.json";
import CustomizedTables from "../../UI/Table/CustomTable";

export default function EconomicAnalysis(props) {
  let {
    BiomassThroughput,
    ReagentUse,
    ElectricityGeneration,
    SteamGeneration,
    ProductionRate,
    InstallationFactor,
    AnnualCapitalCharge,
    InternalRateofReturn,
    BiomassCost,
    ReagentCost,
    ElectricityPrice,
    SteamPrice,
    ProductPrice,
  } = props.userNavData;
  console.log(props);

  ///////////////////////////////////////////////
  let DeliveredCost = 0;
  let DeliveredCostofProcessArr = [];
  for (let i = 0; i < props.selectedProcesses.length; i++) {
    let {
      BaseCost,
      ScaleFactor,
      BaseSize,
      BaseSizeDefault,
    } = props.selectedProcesses[i];

    let DeliveredCostofProcess =
      BaseCost * (BaseSizeDefault / BaseSize) ** ScaleFactor;
    DeliveredCost += DeliveredCostofProcess;
    DeliveredCostofProcessArr.push(DeliveredCostofProcess);
  }
  let TotalCapitalInvestment = DeliveredCost * InstallationFactor;
  let Capex = TotalCapitalInvestment * AnnualCapitalCharge;
  let Opex =
    1.3 *
    (DeliveredCost * AnnualCapitalCharge * 0.25 +
      0.1 * ProductionRate +
      ReagentUse * ReagentCost * 0.008);
  let FeedstockCost = BiomassCost * BiomassThroughput * 0.008;
  let ProductValue =
    (ProductPrice * ProductionRate * 1000 +
      ElectricityGeneration * ElectricityPrice +
      SteamGeneration * SteamPrice) *
    0.008;
  let CostofProduction =
    ((Capex + Opex + FeedstockCost) * (1000000 / 8000)) / ProductionRate;

  let tableData = [];
  props.selectedProcesses.map((el, i) => {
    tableData.push({
      name: el["Name"],
      value: DeliveredCostofProcessArr[i],
    });
  });

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={5} spacing={3}>
          <Paper>
            <CustomizedTables
              rows={tableData}
              title={"Delivered cost of equipment (millions $)"}
            />
          </Paper>
        </Grid>
        <Grid item xs={5} spacing={3}>
          <Paper>
            <CustomizedTables
              rows={tableData}
              title={"Delivered cost of equipment (millions $)"}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
