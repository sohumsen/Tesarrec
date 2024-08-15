import React, { Component } from "react";
import { Bar, Line, Pie } from 'react-chartjs-2';
import classes from './Chart.module.css'
class Chart extends Component {

    state={
        chartData:{
            labels:["bar1", "bar2", "bar3"],
            datasets:[
                {label:"label",
            data:[
                32,
                3,
                23
            ],
        backgroundColor:[

            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',


        ]}
            ]

        }
    }

  render() {


    return (
      <div className={classes.Chart}>
        <p>Process Page</p>
        <Bar
        data={this.state.chartData}
        width={10}
        height={5}
        options={{
            aspectRatio: 1.5,
            title:{
            display:true,
            text:"some random stuff",
            fontSize:25

        },
        legend:{
            display:true,
            position:"bottom"
        }
    }}
        />
        <Bar
        data={this.state.chartData}
        width={100}
        height={50}
        options={{
            title:{
            display:true,
            text:"some random stuff",
            fontSize:25

        },
        legend:{
            display:true,
            position:"bottom"
        }
    }}
        />

        <br/><br/><br/><br/>
        <Line
        data={this.state.chartData}
        width={100}
        height={50}
        options={{
            title:{
            display:true,
            text:"some random stuff",
            fontSize:25

        },
        legend:{
            display:true,
            position:"bottom"
        }
    }}
        />
        <br/><br/><br/><br/>
        <Pie
        data={this.state.chartData}
        width={100}
        height={50}
        options={{
            title:{
            display:true,
            text:"some random stuff",
            fontSize:25

        },
        legend:{
            display:true,
            position:"bottom"
        }
    }}
        />
      </div>
    );
  }
}

export default Chart;
