import React, { Component } from 'react';
import CanvasJSReact from '../../../../assets/canvasjs.react';
import { renderToString } from 'react-dom/server'
//import classes from './Chart.module.css';
//import FractionDisplay from '../../Math/Math'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class LineChart extends Component {
	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "dy/dx= "+this.props.eqn
			},
			axisY: {
				title: "Y",
			},
			axisX: {
				title: "X",
			},
			backgroundColor: "white",
			zoomEnabled: true, 
			data: [{
				type: "line",
				name: "Euler",
				showInLegend: true,

				toolTipContent: "{x}, {y}",
				dataPoints: this.props.EulerData
			},
			{
				type: "line",
				name: "Midpoint",
				showInLegend: true,

				toolTipContent: "{x}, {y}",
				dataPoints: this.props.MidpointData
			},
			{
				type: "line",
				name: "Runge Kutta",
				showInLegend: true,

				toolTipContent: "{x}, {y}",
				dataPoints: this.props.RungeKuttaData
			}
		
		],
			

		}
		return (
		<div style={{width:"500px"}}>


			
		
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default LineChart;                           