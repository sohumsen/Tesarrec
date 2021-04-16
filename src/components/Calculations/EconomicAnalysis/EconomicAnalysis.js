import { Grid, Paper } from "@material-ui/core";
import React from "react";
import EconomicAnalysisData from "../../../containers/EconomicAnalysis/EconomicAnalysisData.json";
import CustomizedTables from "../../UI/Table/CustomTable";
import ColumnChart from "../../../components/UI/Canvas/ColumnChart";
import CashFlowGraph from "./CashFlowGraph";
export default function EconomicAnalysis(props) {
  let {
    BiomassThroughput,
    ReagentUse,
    ElectricityGeneration,
    ElectricityDemand,
    SteamGeneration,
    SteamDemand,
    Product1Rate,
Product2Rate,
Product3Rate,
Product4Rate,
Product5Rate,

    InstallationFactor,
    AnnualCapitalCharge,
    InternalRateofReturn,
    BiomassCost,
    ReagentCost,
    ElectricityPrice,
    SteamPrice,
    Product1Price,
Product2Price,
Product3Price,
Product4Price,
Product5Price

  } = props.userNavData;
  console.log(props.userNavData);

  //////////////////////////////////////////  /////
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
      0.1 * (Product1Rate + Product2Rate + Product3Rate + Product4Rate + Product5Rate) +
      ReagentUse * ReagentCost * 0.008);
  let FeedstockCost = BiomassCost * BiomassThroughput * 0.008;
  let ProductValue =
  ((Product1Price * Product1Rate + Product2Price * Product2Rate + Product3Price * Product3Rate + Product4Price * Product4Rate + Product5Price * Product5Rate) * 1000 +
      (ElectricityGeneration - ElectricityDemand) * ElectricityPrice +
      (SteamGeneration - SteamDemand) * SteamPrice) *
    0.008;
  let CostofProduction =
    ((Capex + Opex + FeedstockCost) * (1000000 / 8000)) / (Product1Rate + Product2Rate + Product3Rate + Product4Rate + Product5Rate);

  let tableData = [];
  props.selectedProcesses.map((el, i) => {
    tableData.push({
      name: el["Name"],
      value: DeliveredCostofProcessArr[i].toFixed(0),
    });
  });
  let WorkingCapital = 0.1861* (TotalCapitalInvestment - DeliveredCost),
    ServiceFacility = 0.1365* (TotalCapitalInvestment - DeliveredCost),
    Installation = 0.0968* (TotalCapitalInvestment - DeliveredCost),
    Contingency = 0.0918* (TotalCapitalInvestment - DeliveredCost),
    ConstructionExpense = 0.0844* (TotalCapitalInvestment - DeliveredCost),
    EngineeringSupervision = 0.0794* (TotalCapitalInvestment - DeliveredCost),
    Piping = 0.0769* (TotalCapitalInvestment - DeliveredCost),
    Building = 0.0720* (TotalCapitalInvestment - DeliveredCost),
    InstrumentationControl = 0.0645* (TotalCapitalInvestment - DeliveredCost),
    ContractorFee = 0.0471* (TotalCapitalInvestment - DeliveredCost),
    YardImprovement = 0.0298* (TotalCapitalInvestment - DeliveredCost),
    ElectricalSystem = 0.0248* (TotalCapitalInvestment - DeliveredCost),
    LegalExpense = 0.0099* (TotalCapitalInvestment - DeliveredCost);

  let TotalCapitalInvestmentTable = [
    { name: "Working capital", value: WorkingCapital.toFixed(0) },
    { name: "Service Facility", value: ServiceFacility.toFixed(0) },
    { name: "Installation", value: Installation.toFixed(0) },
    { name: "Contingency", value: Contingency.toFixed(0) },
    { name: "Construction Expense", value: ConstructionExpense.toFixed(0) },
    {
      name: "Engineering Supervision",
      value: EngineeringSupervision.toFixed(0),
    },
    { name: "Building", value: Building.toFixed(0) },
    { name: "Piping", value: Piping.toFixed(0) },
    {
      name: "Instrumentation Control",
      value: InstrumentationControl.toFixed(0),
    },
    { name: "ContractorFee", value: ContractorFee.toFixed(0) },
    { name: "Yard Improvement", value: YardImprovement.toFixed(0) },
    { name: "Electrical System", value: ElectricalSystem.toFixed(0) },
    { name: "Legal Expense", value: LegalExpense.toFixed(0) },
  ];

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={5} spacing={3}>
          <Paper>
            <CustomizedTables
              rows={tableData}
              title={
                "Delivered cost of equipment   " +
                DeliveredCost.toFixed(0) +
                "   millions $  "
              }
            />
          </Paper>
        </Grid>
        <Grid item xs={5} spacing={3}>
          <Paper>
            <CashFlowGraph
              CapitalCost={TotalCapitalInvestment}
              Capex={parseFloat(Capex.toFixed(2))}
              Opex={parseFloat(Opex.toFixed(2))}
              ProductValue={parseFloat(ProductValue.toFixed(2))}
              IRRCost={InternalRateofReturn}
            />
          </Paper>
        </Grid>
        <Grid item xs={5} spacing={3}>
          <Paper>
            <ColumnChart
              title={"Economic margin analysis million $/y"}
              labelData1={[
                {
                  label: "Product Value",
                  y: parseFloat(ProductValue.toFixed(2)),
                },
                {
                  label: "Feedstock Cost ",
                  y: parseFloat(FeedstockCost.toFixed(2)),
                },
                {
                  label: "Capex ",
                  y: parseFloat(Capex.toFixed(2)),
                },
                {
                  label: "Opex ",
                  y: parseFloat(Opex.toFixed(2)),
                },
              ]}
              type={"pie"}
            />
          </Paper>
        </Grid>
        <Grid item xs={5} spacing={3}>
          <Paper>
            <ColumnChart
              title={" $/kg Product cost and price"}
              labelData1={[
                {
                  label: "Cost of Production  ",
                  y: parseFloat((CostofProduction/1000).toFixed(2)),
                },

                {
                  label: "Product Price ",
                  y: ((Product1Price * Product1Rate + Product2Price * Product2Rate + Product3Price * Product3Rate + Product4Price * Product4Rate + Product5Price * Product5Rate)/ (Product1Rate + Product2Rate + Product3Rate + Product4Rate + Product5Rate)),
                },
              ]}
              type={"bar"}
            />
          </Paper>
        </Grid>
      
        <Grid item xs={5} spacing={3}>
          <Paper>
            <CustomizedTables
              rows={TotalCapitalInvestmentTable}
              title={
                "Total Capital Investment  " +
                TotalCapitalInvestment.toFixed(0) +
                " millions $"
              }
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
