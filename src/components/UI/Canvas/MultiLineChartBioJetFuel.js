import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default class Example extends PureComponent {
  render() {
    return (
     
    
          <ResponsiveContainer>
            <LineChart
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              data={this.props.dataPoints}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" type="number" />
              <YAxis type="number" />
              <Tooltip />
              <Legend />
              <Line
                dot={false}
                type="monotone"
                dataKey="ProductCost"
                stroke="blue"
              />
              <Line
                dot={false}
                type="monotone"
                dataKey="ProcessingValue"
                stroke="red"
              />
            </LineChart>
          </ResponsiveContainer>
    );
  }
}
