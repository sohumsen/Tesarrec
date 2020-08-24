import React, { Component } from "react";
//import classes from './Chart.module.css';
//import FractionDisplay from '../../Math/Math'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// class LineChart extends Component {
//   render() {
//     let data = [];
//     for (let i = 0; i < this.props.dataPoints.length; i++) {
//       data.push({
//         type: "line",
//         // name: this.props.LineNames[i],

//         toolTipContent: " {x}, {y}",
//         dataPoints: this.props.dataPoints[i],
//         markerType: "none",
//       });
//     }

//     const options = {
//       animationEnabled: true,
//       // exportEnabled: true,
//       theme: "light2", // "light1", "dark1", "dark2"

//       title: {
//         text: this.props.title,
//         // more attributes
//       },
//       axisY: {
//         title: this.props.axisNames[1],
//       },
//       axisX: {
//         title: this.props.axisNames[0],
//       },
//       legend: {
//         verticalAlign: this.props.verticalAlign,
//         horizontalAlign: this.props.horizontalAlign,
//       },
//       backgroundColor: "white",
//       zoomEnabled: true,
//       data: data,
//     };
//     return (
//       <div style={{ width: "100%" }}>
//         <CanvasJSChart
//           options={options}
//           /* onRef={ref => this.chart = ref} */
//         />
//         {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
//       </div>
//     );
//   }
// }

class MyLineChart extends Component {
  render() {
    
    console.log(this.props.dataPoints[0][5].x)
    console.log(this.props.dataPoints[0][5].y)
    return (
      <div
        style={{
          paddingBottom: "56.25%" /* 16:9 */,
          position: "relative",
          height: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
        >
          <ResponsiveContainer width="95%" height="100%">
            <LineChart
              data={this.props.dataPoints[0]}
              // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="x"
                label={{ value: this.props.axisNames[0], position: "insideBottom" }}
              />

              <YAxis>
                <Label
                  value={this.props.axisNames[1]}
                  position="insideLeft"
                  angle={-90}
                  style={{ textAnchor: "middle" }}
                />
              </YAxis>
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="y"
                stroke="#8884d8"
                legendType="none"
              />
              {/* <Line type="monotone" dataKey="y" stroke="#82ca9d" /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default MyLineChart;
