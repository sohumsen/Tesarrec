import { v4 as uuidv4 } from "uuid";
import { parse, evaluate, simplify } from "mathjs";
import NewDiffEquationSolver from "../LinearCoupled/NewDiffEquationSolver";
import Model from "./Model";

export default class ModelWrapper extends Model {
  constructor(inputModel, meta) {
    super(inputModel, meta);

    this.config = {
      show: inputModel.show,
      submitted: inputModel.submitted,
      LegendHorizontal: inputModel.LegendHorizontal,
      LegendVertical: inputModel.LegendVertical,
      DecimalPrecision: inputModel.LegendHorizontal,
      initialConditions: inputModel.initialConditions,
      lineNames: inputModel.lineNames,
      xAxis: inputModel.xAxis, 
      yAxis: inputModel.yAxis,
      method: inputModel.method,
      t0: inputModel.t0,
      h: inputModel.h,
    };

    this.eqns = inputModel.eqns;
    this.vars = inputModel.vars;
  }
}
