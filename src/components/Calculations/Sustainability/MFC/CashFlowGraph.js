import React from "react";
import MyChart from "../../../UI/Canvas/LineChart";

const CashFlowGraph = (props) => {
  let j = props.xCoordAnode,
    i = props.yCoordCathode;
  // convert all to float
  let CapitalCostData=parseFloat(props.TwoDCapitalCostData[i][j])
  let ProductValueData=parseFloat(props.TwoDProductValueData[i][j])
  let OpexData=parseFloat(props.TwoDOpexData[i][j])
  let CapexData=parseFloat(props.TwoDCapexData[i][j])


 
  let k = ProductValueData - OpexData - CapexData;
  // let CC0 = props.TwoDCapitalCostData[i][j];
  // let CC1 = CC0 - k / (1 + props.IRRCost) ** 1;
  // let CC2 = CC1 - k / (1 + props.IRRCost) ** 2;
  // let CC3 = CC2 - k / (1 + props.IRRCost) ** 3;

  let dataArr = [-1 * CapitalCostData];
  for (let t = 1; t < 15; t++) {
    dataArr[t] = dataArr[t - 1] + k / (1 + props.IRRCost) ** t;
  }
  // console.log(dataArr);

  let data = [
    { x: -3, y: 0 },
    { x: -2, y: dataArr[0] / 3 },
    { x: -1, y: 2*dataArr[0] / 3 },
  ];

  for (let l = 0; l < dataArr.length; l++) {
    data.push({
      x: l,
      y: parseFloat(dataArr[l].toFixed(2)),
    });
  }
  console.log(data)
  return (
    <div>
      <MyChart
        axisNames={["Year", "Discounted cash flow (€)"]}
        verticalAlign={"top"}
        horizontalAlign={"center"}
        LineNames={["Discounted cash flow analysis"]}
        EulerData={data}
      />
    </div>
  );
};
export default CashFlowGraph;
