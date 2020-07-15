import React, { Component } from "react";
import CanvasJSReact from "../../../assets/canvasjs.react";
//import classes from './Chart.module.css';
//import FractionDisplay from '../../Math/Math'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ColumnChart extends Component {
  render() {
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", // "light1", "dark1", "dark2"

   
      backgroundColor: "white",
      zoomEnabled: true,
      data: [
        {
          type: this.props.type1,
          showInLegend: true,

          dataPoints: this.props.labelData1,
          markerType: "none",
        }
      ],
     
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

export default ColumnChart;
