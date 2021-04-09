import { Grid, Paper } from "@material-ui/core";
import BiodieselPic from "../../../../assets/biodiesel.png";
import ColumnChart from "../../../UI/Canvas/ColumnChart";
import CashFlowGraph from "./CashFlowGraph";

import React from "react";
const Biodiesel = (props) => {
  console.log(props);
  let {
    OilyfeedstockThroughput,
    TriglycerideFraction,
    FreefattyacidFraction,
    OtherFraction,
    InstallationFactor,
    ACC,
    InternalRateofReturn,
    OilyfeedstockCost,
    MethanolCost,
    BiodieselPrice,
    GlycerolPrice,
    ElectricityPrice,
  } = props.state;
  ///////////////////////////////////////////////
  let Total = TriglycerideFraction + FreefattyacidFraction + OtherFraction;
  let Triglyceride = (TriglycerideFraction / Total) * OilyfeedstockThroughput;
  let Freefattyacid = (FreefattyacidFraction / Total) * OilyfeedstockThroughput;
  let Other = (OtherFraction / Total) * OilyfeedstockThroughput;
  ///////////////////////////////////////////////
  let Biodiesel = Triglyceride * 0.9 + Freefattyacid;
  let Methanol = 0.11 * Biodiesel;
  let RecycledMethanol = 2.65 * Methanol;
  let Glycerol = 0.1 * Triglyceride;
  let Fuel = 0.03 * (Triglyceride + Freefattyacid);
  let HeatDemand = 0.33 * Biodiesel;
  let ElectricityDemand = (0.08 / 1000) * Biodiesel;
  let HeatfromBoiler = Fuel * 16 * 0.8;
  let NetheatTurbine = HeatfromBoiler - HeatDemand;
  let ElectricityfromTurbine = 0.28 * NetheatTurbine;
  let Electricity = ElectricityfromTurbine - ElectricityDemand;
  ///////////////////////////////////////////////
  let DeliveryCostofEquipment =
    45.65 *
      ((((OilyfeedstockThroughput + Methanol) / 145) * 8000) / 365 / 2250) **
        0.65 +
    3.47 *
      ((((OilyfeedstockThroughput + Methanol + RecycledMethanol) / 145) *
        8000) /
        365 /
        2250) **
        0.65 +
    3.47 *
      ((((OilyfeedstockThroughput + Methanol) / 145) * 8000) / 365 / 2250) **
        0.65 +
    3.47 *
      ((((OilyfeedstockThroughput + Methanol - Glycerol) / 145) * 8000) /
        365 /
        2250) **
        0.65 +
    7.76 * (HeatfromBoiler / 0.8 / 3600 / 10.3) ** 0.7;
  let TotalCapitalInvestment = DeliveryCostofEquipment * InstallationFactor;
  let Capex = TotalCapitalInvestment * ACC;
  let Opex =
    1.3 *
    (DeliveryCostofEquipment * ACC * 0.25 +
      0.0001 * Biodiesel +
      MethanolCost * Methanol * 0.000008);
  let FeedstockCost = OilyfeedstockCost * OilyfeedstockThroughput * 0.000008;
  let ProductValue =
    ((BiodieselPrice * Biodiesel) / 0.88 +
      Glycerol * GlycerolPrice +
      (Electricity * ElectricityPrice) / 3.6) *
    0.008;
  let ProductCost =
    (((Capex + Opex + FeedstockCost) * 125) / OilyfeedstockThroughput) * 0.91;
  let GWPSaving = 0.0245 * Biodiesel;
  let FossilSaving = 0.0003 * Biodiesel;

  return (
    <Grid container spacing={3}>
      <Grid item xs={6} spacing={3}>
        <Paper>
          <img src={BiodieselPic} width="100%" alt="Bioethanol Pic"></img>
        </Paper>
      </Grid>
      <Grid item xs={6} spacing={3}>
        <Paper>
          <ColumnChart
            title={"Flowrate kg/h"}
            labelData1={[
              {
                label: "CHP fuel ",
                y: parseFloat(Fuel.toFixed(2)),
              },
              {
                label: "Glycerol",
                y: parseFloat(Glycerol.toFixed(2)),
              },
              {
                label: "Makeup methanol ",
                y: parseFloat(Methanol.toFixed(2)),
              },
              {
                label: "Recycled methanol",
                y: parseFloat(RecycledMethanol.toFixed(2)),
              },

              {
                label: "Biodiesel ",
                y: parseFloat(Biodiesel.toFixed(2)),
              },
              {
                label: "Oily feedstock throughput",
                y: parseFloat(OilyfeedstockThroughput.toFixed(2)),
              },
            ]}
            type={"bar"}
          />
        </Paper>
      </Grid>

      <Grid item xs={6} spacing={3}>
        <Paper>
          <ColumnChart
            title={" Economic margin analysis million $/y"}
            labelData1={[
              {
                label: "Product (Biodiesel, Glycerol and electricity) Value ",
                y: parseFloat(ProductValue.toFixed(2)),
              },
              {
                label: "Feedstock Cost",
                y: parseFloat(FeedstockCost.toFixed(2)),
              },
              {
                label: "Capex  ",
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

     
      <Grid item xs={6} spacing={3}>
        <Paper>
          <ColumnChart
            title={" Environmental impact saving per year"}
            labelData1={[
              {
                label: "Global warming potential kt CO2 eq",
                y: parseFloat(GWPSaving.toFixed(2)),
              },
              {
                label: "Fossil resource PJ",
                y: parseFloat(FossilSaving.toFixed(2)),
              },
            
            ]}
            type={"bar"}
          />
        </Paper>
      </Grid>
      <Grid item xs={6} spacing={3}>
        <Paper>
          <CashFlowGraph
            CapitalCost={parseFloat(
              (DeliveryCostofEquipment  * InstallationFactor).toFixed(2)
            )}
            Capex={parseFloat(Capex.toFixed(2))}
            Opex={parseFloat(Opex.toFixed(2))}
            ProductValue={parseFloat(ProductValue.toFixed(2))}
            IRRCost={parseFloat(InternalRateofReturn.toFixed(2))}
          />
        </Paper>
      </Grid>

    </Grid>
  );
};
export default Biodiesel;
