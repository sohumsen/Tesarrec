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
  ReferenceLine,
} from "recharts";

export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer>
        <LineChart
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          data={this.props.dataPoints}
        >
          <ReferenceLine
            y={this.props.dataPoints[0]["ProcessingValue"]}
            label="Jet Fuel"
            stroke="red"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={
              this.props.dataPoints[
                2
              ]["ProcessingValue"]
            }
            label="Char"
            stroke="purple"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={
              this.props.dataPoints[this.props.dataPoints.length - 1][
                "ProcessingValue"
              ]
            }
            label={"Steam"}
            stroke="green"
          />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" type="number" label="Flowrate kg/hr" height={70} />
          <YAxis type="number"   />
          <Tooltip />
          <Legend />
          <Line
            dot={false}
            type="monotone"
            dataKey="ProductCost"
            stroke="blue"
            name="Cost of Production ($/kg)"

          />
          <Line
            dot={false}
            type="monotone"
            dataKey="ProcessingValue"
            stroke="red"
            name="Value on Processing ($/kg)"

          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
