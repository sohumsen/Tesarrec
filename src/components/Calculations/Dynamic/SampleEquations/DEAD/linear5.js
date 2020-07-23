import {simplify , parse} from "mathjs"


let varObjects = {}
let eqns = ["b*t","a"];
let actualSolutionArr = [];
let parsedEqns = [];
eqns.forEach(element => {
  let parsedEqn = simplify(parse(element));
  parsedEqns.push(parsedEqn)
});


const props = {
  t0: 0,
  h:0.1,
  varObjects: varObjects,
  NUMCYCLES: 10,
  eqns: parsedEqns,
  actualSolutionArr: actualSolutionArr,
  initialConditions : [1,1],
};

export default props;
