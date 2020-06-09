import React from "react";
import MyChart from "../../../UI/Canvas/Charts/Chart";

const CashFlowGraph = (props) => {
  
  console.log(props.yCoordCathode)
  let i = props.xCoordAnode,
    j = props.yCoordCathode;
  // convert all to float
  let data = [];

  let ProductValue =
    props.ProductionPriceCost * props.TwoDProductionRategData[i][j] * 24 * 365;
  let Capex = props.TwoDCapitalCostData[i][j] * props.ACCCost;
  let Opex =
    1.3 *
    ((0.189 * Capex) / props.LangFactorCost +
      ((((props.AnolyteCost + props.CatholyteCost) * 0.29) / 1000) *
        props.TwoDProductionRategData[i][j] *
        24 *
        365) /
        0.1 +
      ((1.71 * 52033) / 1000000) * props.TwoDProductionRategData[i][j] +
      props.ExternalEnergyCost * props.TwoDGibbsEnergyData[i][j]);

  let k = ProductValue - Opex - Capex;
  // let CC0 = props.TwoDCapitalCostData[i][j];
  // let CC1 = CC0 - k / (1 + props.IRRCost) ** 1;
  // let CC2 = CC1 - k / (1 + props.IRRCost) ** 2;
  // let CC3 = CC2 - k / (1 + props.IRRCost) ** 3;

  let dataArr = [parseFloat(props.TwoDCapitalCostData[i][j])];
  for (let t = 1; t < 11; t++) {
    dataArr[t] = dataArr[t - 1] - k / (1 + props.IRRCost) ** t;
  }
  console.log(dataArr);

  console.log(ProductValue, Capex, Opex);
  for (let l = 0; l < dataArr.length; l++) {
    data.push({
      x: l,
      y: dataArr[l],
    });
  }
  console.log(data);

  return (
    <div>
      <MyChart
        axisNames={["yr", "dcf"]}
        verticalAlign={"top"}
        horizontalAlign={"center"}
        LineNames={["dcf"]}
        EulerData={data}
      />
    </div>
  );
};
export default CashFlowGraph;
