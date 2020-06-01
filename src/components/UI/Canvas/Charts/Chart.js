import React, { Component } from "react";
import CanvasJSReact from "../../../../assets/canvasjs.react";
//import classes from './Chart.module.css';
//import FractionDisplay from '../../Math/Math'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChart extends Component {
  render() {
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", // "light1", "dark1", "dark2"

      axisY: {
        title: this.props.axisNames[1],
      },
      axisX: {
        title: this.props.axisNames[0],
      },
      legend:{
        verticalAlign:this.props.verticalAlign,
        horizontalAlign:this.props.horizontalAlign
      },
      backgroundColor: "white",
      zoomEnabled: true,
      data: [
        {
          type: "line",
          name: this.props.LineNames[0],
          showInLegend: true,

          toolTipContent: this.props.LineNames[0]+ ": {x}, {y}",
          dataPoints: this.props.EulerData,
        },
        {
          type: "line",
          name: this.props.LineNames[1],
          showInLegend: true,

          toolTipContent: this.props.LineNames[1]+ ": {x}, {y}",
          dataPoints: this.props.MidpointData,
        },
        {
          type: "line",
          name: this.props.LineNames[2],
          showInLegend: true,

          toolTipContent: this.props.LineNames[2]+ ": {x}, {y}",
          dataPoints: this.props.RungeKuttaData,
        },
        {
          type: "line",
          name: this.props.LineNames[3],
          showInLegend: true,

          toolTipContent:this.props.LineNames[3]+ ":  {x}, {y}",
          dataPoints: this.props.Line4Data,
        },
      ],
    };
    return (
      <div style={{ width: "500px" }}>
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
