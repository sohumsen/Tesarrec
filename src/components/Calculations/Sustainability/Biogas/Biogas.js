import { Grid, Paper } from "@material-ui/core";
import BiogasPic from "../../../../assets/Biogas.png";
import ColumnChart from "../../../UI/Canvas/ColumnChart";
import StackedChart from "../../../UI/Canvas/StackedChart";

import React from "react";
const Biogas = (props) => {
  console.log(props);
  let {
    ADFeedstock,

    ManureFraction,
    SludgeFraction,
    UsedCookingOilFraction,
    GrassSilageFraction,
    BiowasteFraction,

    ElectricityUse,
    HeatUse,
    SteamUse,

    BiogasYield,

    BiomethaneYield,
  } = props.state;

  ///////////////////////////////////////////////
  let Total =
    ManureFraction +
    SludgeFraction +
    UsedCookingOilFraction +
    GrassSilageFraction +
    BiowasteFraction;
  let ManureFraction1 = ManureFraction / Total;
  let SludgeFraction1 = SludgeFraction / Total;
  let UsedCookingOilFraction1 = UsedCookingOilFraction / Total;
  let GrassSilageFraction1 = GrassSilageFraction / Total;
  let BiowasteFraction1 = BiowasteFraction / Total;
  ///////////////////////////////////////////////
  let GWPManureCH =
    (87.8 + 5.5 * ElectricityUse + 5.8 * HeatUse) *
    ADFeedstock *
    ManureFraction1;
  let GWPManureROW =
    (88.8 + 84.5 * ElectricityUse + 15.2 * HeatUse) *
    ADFeedstock *
    ManureFraction1;
  let GWPSludgeCH =
    (14.3 + 13.3 * ElectricityUse + 5.3 * HeatUse + 14.6 * SteamUse) *
    ADFeedstock *
    SludgeFraction1;
  let GWPSludgeROW =
    (23.7 + 44.7 * ElectricityUse + 8.2 * HeatUse + 20.8 * SteamUse) *
    ADFeedstock *
    SludgeFraction1;
  let GWPUCOCH =
    (245.4 + 0.005 * ElectricityUse + 0.005 * HeatUse) *
    ADFeedstock *
    UsedCookingOilFraction1;
  let GWPUCOROW =
    (136 + 620.4 * ElectricityUse + 110.8 * HeatUse) *
    ADFeedstock *
    UsedCookingOilFraction1;
  let GWPBiowasteCH = 0.18 * BiogasYield * ADFeedstock * BiowasteFraction1;
  let GWPBiowasteROW = 0.23 * BiogasYield * ADFeedstock * BiowasteFraction1;
  let GWPGrassSilage =
    (224.7 + 31.9 * ElectricityUse + 19.8 * HeatUse) *
    ADFeedstock *
    GrassSilageFraction1;

  let GWPFeedCH =
    GWPManureCH + GWPSludgeCH + GWPUCOCH + GWPBiowasteCH + GWPGrassSilage;
  let GWPFeedROW =
    GWPManureROW + GWPSludgeROW + GWPUCOROW + GWPBiowasteROW + GWPGrassSilage;

  let GWPBiogasCH = GWPFeedCH / (ADFeedstock*BiogasYield);
  let GWPBiogasROW = GWPFeedROW / (ADFeedstock*BiogasYield);
  let BiogenicGWPBiogasCH = -(ManureFraction1*3.1103054 + SludgeFraction1*0.044920374 + UsedCookingOilFraction1*0.33735073 + GrassSilageFraction1*0.012879702 + BiowasteFraction1*0.12088928);
  let BiogenicGWPBiogasROW = -(ManureFraction1*3.0631942 + SludgeFraction1*0.055278704 + UsedCookingOilFraction1*0.134941 + GrassSilageFraction1*0.012879702 + BiowasteFraction1*0.077214499);
 let NaturalgasGWPavoidedperbiogas = - 0.2*BiomethaneYield/BiogasYield;
let BiogenicGWPBiogasCHTotal = BiogenicGWPBiogasCH*BiogasYield*ADFeedstock;
let BiogenicGWPBiogasROWTotal = BiogenicGWPBiogasROW*BiogasYield*ADFeedstock;
 let NaturalgasGWPavoidedTotal = NaturalgasGWPavoidedperbiogas*BiogasYield*ADFeedstock;
   
  let GWPBiomethaneCH = (GWPFeedCH) / (ADFeedstock*BiomethaneYield)+0.4;
  let GWPBiomethaneROW = (GWPFeedROW) / (ADFeedstock*BiomethaneYield)+0.4;
  let BiogenicGWPBiomethaneCH = (BiogenicGWPBiogasCH*BiogasYield/BiomethaneYield);
  let BiogenicGWPBiomethaneROW = (BiogenicGWPBiogasROW*BiogasYield/BiomethaneYield);
  let NaturalgasGWPavoidedperbiomethane = - 0.2;
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={6} spacing={3}>
        <Paper>
          <img src={BiogasPic} width="100%" alt="Bioethanol Pic"></img>
        </Paper>
      </Grid>

      {/* Stacked Bar Chart for GWP (kg CO2e) */}
      <Grid item xs={6} spacing={3}>
      <Paper>
          <StackedChart
          axisXData={ {title: "",  // Optional: Title for X-axis
            interval: 1,
            labelFormatter: function(e) {
              return e.value === 1 ? "CH (Switzerland)" : "ROW (Rest of the World)";
            }}}
            data={[
            {
                type: "stackedBar",
                name: "Avoided natural gas",
                showInLegend: "true",
                dataPoints: [
                  { y: parseFloat(NaturalgasGWPavoidedTotal.toFixed(2)), x: 1 },
                  { y: parseFloat(NaturalgasGWPavoidedTotal.toFixed(2)), x: 2 },
                ],
              }, 
            {
                type: "stackedBar",
                name: "Biogenic carbon dioxide",
                showInLegend: "true",
                dataPoints: [
                  { y: parseFloat(BiogenicGWPBiogasCHTotal.toFixed(2)), x: 1 },
                  { y: parseFloat(BiogenicGWPBiogasROWTotal.toFixed(2)), x: 2 },
                ],
              },
              {
                type: "stackedBar",
                name: "Manure",
                showInLegend: "true",
                dataPoints: [
                  { y: parseFloat(GWPManureCH.toFixed(2)), x: 1 },
                  { y: parseFloat(GWPManureROW.toFixed(2)), x: 2 },
                ],
              },
              {
                type: "stackedBar",
                name: "Sludge",
                showInLegend: "true",
                dataPoints: [
                  { y: parseFloat(GWPSludgeCH.toFixed(2)), x: 1 },
                  { y: parseFloat(GWPSludgeROW.toFixed(2)), x: 2 },
                ],
              },
              {
                type: "stackedBar",
                name: "Used Cooking Oil",
                showInLegend: "true",
                dataPoints: [
                  { y: parseFloat(GWPUCOCH.toFixed(2)), x: 1 },
                  { y: parseFloat(GWPUCOROW.toFixed(2)), x: 2 },
                ],
              },
              {
                type: "stackedBar",
                name: "Biowaste",
                showInLegend: "true",
                dataPoints: [
                  { y: parseFloat(GWPBiowasteCH.toFixed(2)), x: 1 },
                  { y: parseFloat(GWPBiowasteROW.toFixed(2)), x: 2 },
                ],
              },
              {
                type: "stackedBar",
                name: "Grass Silage",
                showInLegend: "true",
                dataPoints: [
                  { y: parseFloat(GWPGrassSilage.toFixed(2)), x: 1 },
                  { y: parseFloat(GWPGrassSilage.toFixed(2)), x: 2 },
                ],
              },
            ]}
            title={"Global Warming Potential (kg CO₂e)"}
          />
        </Paper>
      </Grid>

      {/* Bar Chart for GWP (kg CO2e/m3 biogas) */}
      <Grid item xs={6} spacing={3}>
        <Paper>
         <StackedChart
          axisXData={ {title: "",  // Optional: Title for X-axis
            interval: 1,
            labelFormatter: function(e) {
              return e.value === 1 ? "CH (Switzerland)" : "ROW (Rest of the World)";
            }}}
            data={[
            {
                type: "stackedBar",
                name: "Avoided natural gas",
                showInLegend: "true",
                dataPoints: [
                  { y: parseFloat(NaturalgasGWPavoidedperbiogas.toFixed(2)), x: 1 },
                  { y: parseFloat(NaturalgasGWPavoidedperbiogas.toFixed(2)), x: 2 },
                ],
              }, 
            {
                type: "stackedBar",
                name: "Biogenic carbon dioxide",
                showInLegend: "true",
                dataPoints: [
                  { y: parseFloat(BiogenicGWPBiogasCH.toFixed(2)), x: 1 },
                  { y: parseFloat(BiogenicGWPBiogasROW.toFixed(2)), x: 2 },
                ],
              },
              {
                type: "stackedBar",
                name: "Biogas generation",
                showInLegend: "true",
                dataPoints: [
                  { y: parseFloat(GWPBiogasCH.toFixed(2)), x: 1 },
                  { y: parseFloat(GWPBiogasROW.toFixed(2)), x: 2 },
                ],
              },
             
            ]}
            title={"Global Warming Potential (kg CO₂e/m³ biogas)"}
          />
      </Paper>
      </Grid>

               {/* Bar Chart for GWP (kg CO2e/m3 biomethane) */}
      <Grid item xs={6} spacing={3}>
        <Paper>
         <StackedChart
          axisXData={ {title: "",  // Optional: Title for X-axis
            interval: 1,
            labelFormatter: function(e) {
              return e.value === 1 ? "CH (Switzerland)" : "ROW (Rest of the World)";
            }}}
            data={[
            {
                type: "stackedBar",
                name: "Avoided natural gas",
                showInLegend: "true",
                dataPoints: [
                  { y: parseFloat(NaturalgasGWPavoidedperbiomethane.toFixed(2)), x: 1 },
                  { y: parseFloat(NaturalgasGWPavoidedperbiomethane.toFixed(2)), x: 2 },
                ],
              }, 
            {
                type: "stackedBar",
                name: "Biogenic carbon dioxide",
                showInLegend: "true",
                dataPoints: [
                  { y: parseFloat(BiogenicGWPBiomethaneCH.toFixed(2)), x: 1 },
                  { y: parseFloat(BiogenicGWPBiomethaneROW.toFixed(2)), x: 2 },
                ],
              },
              {
                type: "stackedBar",
                name: "Biomethane generation",
                showInLegend: "true",
                dataPoints: [
                  { y: parseFloat(GWPBiomethaneCH.toFixed(2)), x: 1 },
                  { y: parseFloat(GWPBiomethaneROW.toFixed(2)), x: 2 },
                ],
              },
             
            ]}
            title={"Global Warming Potential (kg CO₂e/m³ biomethane)"}
          />
      </Paper>
      </Grid>
              
              
    </Grid>
  );
};

export default Biogas;
