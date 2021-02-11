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
  Label,
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
            stroke="red"
            strokeDasharray="3 3"
          >
            <Label value="Jet Fuel" offset={5} position="insideBottom" />
          </ReferenceLine>
          <ReferenceLine
<<<<<<< HEAD
            y={
              this.props.dataPoints[
                2
              ]["ProcessingValue"]
            }
            label="Char"
            stroke="red"
=======
            y={this.props.dataPoints[2]["ProcessingValue"]}
            stroke="purple"
>>>>>>> cd220a56e9f60b7ec65c71e367cef062610c3671
            strokeDasharray="3 3"
          >
            <Label value="Char" offset={5} position="insideBottom" />
          </ReferenceLine>
          <ReferenceLine
            y={
              this.props.dataPoints[this.props.dataPoints.length - 4][
                "ProcessingValue"
              ]
            }
<<<<<<< HEAD
            label={"Steam"}
            stroke="red"
            strokeDasharray="3 3"
          />
=======
            stroke="green"
          >
            <Label value="Steam" offset={5} position="insideBottom" />
          </ReferenceLine>
>>>>>>> cd220a56e9f60b7ec65c71e367cef062610c3671
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" type="number" label="Flowrate kg/hr" height={70} />
          <YAxis type="number" />
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
