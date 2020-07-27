import React, { Component } from "react";
import CanvasJSReact from "../../../assets/canvasjs.react";
//import classes from './Chart.module.css';
//import FractionDisplay from '../../Math/Math'
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
        logarithmic: true,
        gridThickness: 0,
        tickLength: 0,
        lineThickness: 0,
 
      },
      axisX: {
        title: this.props.axisNames[0],

        gridThickness: 0,
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
      // data: [
      //   {
      //     type: "line",
      //     name: this.props.LineNames[0],
      //     showInLegend: true,

      //     toolTipContent: this.props.LineNames[0]+ ": {x}, {y}",
      //     dataPoints: this.props.EulerData,
      //     markerType: "none",
      //   },
      //   {
      //     type: "line",
      //     name: this.props.LineNames[1],
      //     showInLegend: true,

      //     toolTipContent: this.props.LineNames[1]+ ": {x}, {y}",
      //     dataPoints: this.props.MidpointData,
      //     markerType: "none",
      //   },
      //   {
      //     type: "line",
      //     name: this.props.LineNames[2],
      //     showInLegend: true,

      //     toolTipContent: this.props.LineNames[2]+ ": {x}, {y}",
      //     dataPoints: this.props.RungeKuttaData,
      //     markerType: "none",
      //   },
      //   {
      //     type: "line",
      //     name: this.props.LineNames[3],
      //     showInLegend: true,

      //     toolTipContent:this.props.LineNames[3]+ ":  {x}, {y}",
      //     dataPoints: this.props.Line4Data,
      //     markerType: "none",
      //   },
      // ],
    };
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
