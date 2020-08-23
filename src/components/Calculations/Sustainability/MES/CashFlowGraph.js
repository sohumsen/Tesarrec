import React from "react";
import MyChart from "../../../UI/Canvas/LineChart";

const CashFlowGraph = (props) => {
  let j = props.xCoordAnode,
    i = props.yCoordCathode;
  // convert all to float

  let ProductValue =
    props.ProductionPriceCost *
    parseFloat(props.TwoDProductionRategData[i][j]) *
    24 *
    365;

  let Capex = parseFloat(props.TwoDCapitalCostData[i][j]) * props.ACCCost;
  let Opex =
    1.3 *
    ((0.189 * Capex) / props.LangFactorCost +
      ((((props.AnolyteCost + props.CatholyteCost) * 0.29) / 1000) *
        parseFloat(props.TwoDProductionRategData[i][j]) *
        24 *
        365) /
        1000 /
        0.1 +
      ((1.71 * 52033) / 1000000) *
        parseFloat(props.TwoDProductionRategData[i][j]) +
      props.ExternalEnergyCost *
        2.43 *
        parseFloat(props.TwoDGibbsEnergyData[i][j]));
  
  let k = ProductValue - Opex - Capex;
  // let CC0 = props.TwoDCapitalCostData[i][j];
  // let CC1 = CC0 - k / (1 + props.IRRCost) ** 1;
  // let CC2 = CC1 - k / (1 + props.IRRCost) ** 2;
  // let CC3 = CC2 - k / (1 + props.IRRCost) ** 3;

  let dataArr = [-1 * parseFloat(props.TwoDCapitalCostData[i][j])];
  for (let t = 1; t < 11; t++) {
    dataArr[t] = dataArr[t - 1] + k / (1 + props.IRRCost) ** t;
  }

  let data = [
    { x: -3, y: 0 },
    { x: -2, y: dataArr[0] / 3 },
    { x: -1, y: (2 * dataArr[0]) / 3 },
  ];
  for (let l = 0; l < dataArr.length; l++) {
    data.push({
      x: l,
      y: parseFloat(dataArr[l].toFixed(2)),
    });
  }

  return (
    <div>
      <MyChart
        axisNames={["Year", "Discounted cash flow (€)"]}
        verticalAlign={"top"}
        horizontalAlign={"center"}
        LineNames={["Discounted cash flow analysis"]}
        dataPoints={[data]}
      />
    </div>
  );
};
export default CashFlowGraph;
