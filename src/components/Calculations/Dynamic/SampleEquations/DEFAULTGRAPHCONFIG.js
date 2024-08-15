const DEFAULTGRAPHCONFIG = {
  show: false,
  submitted: true,
  // LegendHorizontal: "left",
  // LegendVertical: "top",
  DecimalPrecision: 2,
  // initialConditions: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
  // lineNames: ["Y_1", "Y_2", "Y_3", "Y_4","Y_5","Y_6","Y_7","Y_8","Y_9"],
  xAxis: "X_1", //x,y,
  yAxis: "Y_1",
  method: "RK4",
  numOfCycles: 30,
  t0: 0,
  h: 0.05,
  // axis: ["a", "t"],
  solvable: false,
  calculate:false,



};

export default DEFAULTGRAPHCONFIG;
