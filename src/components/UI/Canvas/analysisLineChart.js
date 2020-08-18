import React, { Component } from "react";
import CanvasJSReact from "../../../assets/canvasjs.react";
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

class MyLineChart extends Component {
  render() {
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
              data={this.props.dataPoints}
              // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="t"
                label={{
                  value: this.props.axisNames[0],
                  position: "insideBottom",
                }}
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
                dataKey="calculated"
                stroke="#8884d8"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#82ca9d"
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
