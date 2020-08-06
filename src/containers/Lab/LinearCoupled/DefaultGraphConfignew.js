const DEFAULTGRAPHCONFIG = {
  show: false,
  submitted: true,
  LegendHorizontal: "left",
  LegendVertical: "top",
  DecimalPrecision: 2,
  initialConditions: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
  lineNames:["a","b","c","d","f","g","h","j","k"],
  xAxis: "t", //x,y,
  yAxis: "a",
  method: "RK4",
  numOfCycles:30,
  t0:0,
  h:0.05

};

export default DEFAULTGRAPHCONFIG;
