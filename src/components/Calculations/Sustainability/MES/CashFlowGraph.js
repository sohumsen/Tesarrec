import React from "react";

const CashFlowGraph = (props) => {
  let i = 2,
    j = 2;
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

    let a=ProductValue-Opex-Capex
    console.log(ProductValue,Capex,Opex)
  // for (let l = 0; l < 10; l++) {
  //     data.push({
  //         x:l, y:(props.TwoDCapitalCostData[i][j])
  //     })
  // }


  return <div></div>;
};
export default CashFlowGraph;
