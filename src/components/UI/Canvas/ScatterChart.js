import React, { Component } from "react";
import CanvasJSReact from "../../../assets/canvasjs.react";
//import classes from './Chart.module.css';
//import FractionDisplay from '../../Math/Math'
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChart extends Component {
  render() {

    let data = [];
    data.push({
      type: "scatter",
      name: this.props.LineNames,
      toolTipContent:
        '<span style="color:#4F81BC ">{label}</span><br>time {x}ns<br>rmse {y}',

      dataPoints: this.props.dataPoints,
    });

    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", // "light1", "dark1", "dark2"

      axisY: {
        title: this.props.axisNames[1],
        // labelFormatter: function(e){
        //   return  "10^e" + Math.log10(e.value);
        // },
        // logarithmic: true,
        // logarithmBase:10,
        gridThickness: 1,
        tickLength: 0,
        lineThickness: 0,
 
      },
      axisX: {
        title: this.props.axisNames[0],

        gridThickness: 1,
        tickLength: 0,
        lineThickness: 0,
        labelFormatter: function () {
          return " ";
        },
      },
      legend: {
        verticalAlign: this.props.verticalAlign,
        horizontalAlign: this.props.horizontalAlign,
      },
      backgroundColor: "white",
      zoomEnabled: true,
      data: data,
   
    };
    // return (
    //   <ScatterChart
    //     width={400}
    //     height={400}
    //     margin={{
    //       top: 20, right: 20, bottom: 20, left: 20,
    //     }}
    //   >
    //     <CartesianGrid />
    //     <XAxis type="number" dataKey="x" name="time" unit="ns" />
    //     <YAxis type="number" dataKey="y" name="rmse" unit="kg" />
    //     <Tooltip cursor={{ strokeDasharray: '3 3' }} />
    //     <Scatter name="A school" data={data} fill="#8884d8" />
    //   </ScatterChart>
    // );
    return (
      <div style={{ width: "100%" }}>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default LineChart;
