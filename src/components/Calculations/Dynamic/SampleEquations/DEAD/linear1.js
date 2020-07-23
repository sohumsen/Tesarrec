import {simplify , parse} from "mathjs"

let varObjects = {
  K_1: 20,
};

let NUMCYCLES = 20;

let eqns = ["t"];
let actualSolutionArr = [];
for (let index = 0; index < NUMCYCLES; index++) {
  let t = 0.5 + (index + 1) * 0.05;
  let y = t ** 2 / 2;
  //let y = t
  actualSolutionArr.push([y, t]);
}

//TODO Allow coupled

let parsedEqns = [];
eqns.forEach(element => {
  let parsedEqn = simplify(parse(element));
  parsedEqns.push(parsedEqn)
});

const generateSolution=()=>{

  
  let eqns = ["t"];
  let actualSolutionArr = [];
  for (let index = 0; index < NUMCYCLES; index++) {
    let t = 0.5 + (index + 1) * 0.05;
    let y = t ** 2 / 2;
    //let y = t
    actualSolutionArr.push([y, t]);
  }
  
  let parsedEqns = [];
  eqns.forEach(element => {
    let parsedEqn = simplify(parse(element));
    parsedEqns.push(parsedEqn)
  });
}


const props = {
  varObjects: varObjects,
  NUMCYCLES: NUMCYCLES,
  eqns: parsedEqns,
  actualSolutionArr: actualSolutionArr,
};

export default props;
