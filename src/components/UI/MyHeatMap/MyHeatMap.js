import React from "react";
import HeatMap from "react-heatmap-grid";

const consoleLogger = (background, value, min, max, data, x, y) => {
  console.log(background, value, min, max, data, x, y);
  //console.log(1 - (max - value) / (max - min))

  return null;
};

const MyHeatMap = (props) => {
  let maxRow = props.data.map(function (row) {
    return Math.max.apply(Math, row);
  });
  let max = Math.max.apply(null, maxRow);

  let minRow = props.data.map(function (row) {
    return Math.min.apply(Math, row);
  });
  let min = Math.min.apply(null, minRow);

  let transparrency = 0;
  if (max !== min) {
    transparrency = 1 - (max - 10) / (max - min);
  }

  let data = props.data;

  return (
    <div>
      <HeatMap
        xLabels={props.xLabels}
        yLabels={props.yLabels}
        yLabelWidth={100}
        height={60}
        xLabelWidth={100}
        xLabelsLocation={"bottom"}
        data={data}

        cellStyle={(background, value, min, max, data, x, y) => ({
      
          background: `${props.color}, ${1 - (max - value) / (max - min)})`,
          fontSize: "11px",
        })}
        
        //onClick={(x, y,value) => alert(`Clicked ${x}, ${y}, ${value}`)}

        onClick={(x, y) => props.HeatMapChangedOnClick({ x }, { y }, data)}
        cellRender={(value) => value && `${value}`}
        title={(value) => ` ${value}`}
      />
    </div>
  );
};

export default MyHeatMap;

/* graveyard

    cellStyle={(background, value, min, max, data, x, y) => ({
      
      background: `${props.color}, ${1 - (max - value) / (max - min)})`,
      fontSize: "11px",
    })}


        cellStyle={(background, value,min, max, data, x, y) => (
      consoleLogger(background, value, min, max, data, x, y),

      {

      background: `rgba(66, 86, 244, ${1 - (max - value) / (max - min)})`,
      fontSize: "11px",
      }
    )}


       cellStyle={(background, value,min, max, data, x, y) => (
      consoleLogger(background, value, min, max, data, x, y),

      {

      background: `rgba(66, 86, 244, ${transparrency})`,
      fontSize: "11px",
      }
    )}

    */
