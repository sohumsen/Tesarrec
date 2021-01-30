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

class MyLineChart extends Component {
  render() {
    return (
      <div
        style={{ position: "relative", width: "100%", paddingBottom: "300px" }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
          }}
        >
          <ResponsiveContainer>
            <LineChart
              data={this.props.dataPoints[0]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="x"
                label={{
                  value: this.props.axisNames[0],
                  position: "left",
                }}
              />

              <YAxis>
                <Label
                  value={this.props.axisNames[1]}
                  angle="-90"
                  position="insideBottomLeft"
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
