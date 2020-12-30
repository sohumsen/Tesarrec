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
    console.log(this.props.dataPoints);
    return (
      <ResponsiveContainer width={"100%"} height="100%">
        <LineChart
          data={this.props.dataPoints}
        
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis scale="log" domain={[0, 5]} allowDataOverflow dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dot={false} type="monotone" dataKey="Biomass" stroke="blue" />
          <Line dot={false} type="monotone" dataKey="Gas" stroke="red" />

          <Line
            dot={false}
            type="monotone"
            dataKey="Oil"
            stroke="#8884d8"
          />
          <Line dot={false} type="monotone" dataKey="Char" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
