import React from "react";
import MyChart from "../../../UI/Canvas/LineChart";

const CashFlowGraph = (props) => {
  let k = props.ProductValue - props.Opex - props.Capex;

  let dataArr = [-1 * props.CapitalCost];
  for (let t = 1; t < 15; t++) {
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
