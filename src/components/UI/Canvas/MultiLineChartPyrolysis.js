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
  Label,
} from "recharts";

export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width={"100%"} height="100%">
        <LineChart data={this.props.dataPoints}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time">
            <Label
              value="Residence time second"
              offset={0}
              position="insideBottom"
            />
          </XAxis>
          <YAxis  label={{ value: 'Mass fraction', angle: -90, position: 'insideLeft' }}/>
          
          <Tooltip />
          <Legend />
          <Line dot={false} type="monotone" dataKey="Biomass" stroke="blue" />
          <Line dot={false} type="monotone" dataKey="Gas" stroke="red" />

          <Line dot={false} type="monotone" dataKey="Oil" stroke="#8884d8" />
          <Line dot={false} type="monotone" dataKey="Char" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
