import { ResponsiveLine } from '@nivo/line'
import React from 'react'
import classes from './Graph.module.css'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.



const MyResponsiveLine = (props) => (
  <div className={classes.Graph}>
    <ResponsiveLine

        data={props.data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            
            legend: 'Concentration',
            legendOffset: 36,
            legendPosition: 'middle'
            
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            tickValues:3,
            legend: props.YAxis,
            legendOffset: -50,
            legendPosition: 'middle',
            
        }}
        colors={{ scheme: 'nivo' }}
        lineWidth={6}
        pointSize={1}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={6}
        pointBorderColor={{ from: 'serieColor', modifiers: [] }}
        enablePointLabel={false}
        pointLabel={function(e){return e.x+": "+e.y}}
        pointLabelYOffset={-14}
        crosshairType="bottom-left"
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 105,
                translateY: -13,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 103,
                itemHeight: 20,
                
                itemOpacity: 0.75,
                symbolSize: 15,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        motionStiffness={85}
    />
    </div>
)

export default MyResponsiveLine