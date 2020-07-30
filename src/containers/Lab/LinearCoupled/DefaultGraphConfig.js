const DEFAULTGRAPHCONFIG = {
  show: false,
  submitted: true,
  LegendHorizontal: "left",
  LegendVertical: "top",
  DecimalPrecision: 2,
  initialConditions: [0.5, 0.5, 0.5, 0.5],
  lineNames:["a","b","c","d"],
  xAxis: "t", //x,y,
  yAxis: "a",
  method: "RK4",
  t0:0,
  h:0.05

};

export default DEFAULTGRAPHCONFIG;
