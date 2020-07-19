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
      title:{
        text: this.props.title,
        fontSize: 15,
       // more attributes 
    },
   
      backgroundColor: "white",
      zoomEnabled: true,
      data: [{
				type: "stackedBar",
				name: this.props.name1,
				showInLegend: "true",

				dataPoints:this.props.data1
			},
			{
				type: "stackedBar",
				name: this.props.name2,
				showInLegend: "true",
				dataPoints: this.props.data2
			}]
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
