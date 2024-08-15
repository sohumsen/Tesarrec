import { simplify, parse } from "mathjs";

const ReadJSON = (fileObj) => {
  let parsedEqns = [];
  fileObj.eqns.forEach((element) => {
    let parsedEqn = simplify(parse(element));
    parsedEqns.push(parsedEqn);
  });

  let actualSolutionArr = [];

  fileObj.solved.forEach((element) => {
    let parsedEqn = simplify(parse(element));
    for (let i = 0; i < fileObj.numOfCycles; i++) {
      let t = fileObj.t0 + i * fileObj.h;
    //   let a =fileObj.lineNames[0]
      let y = parsedEqn.evaluate({
        t: t,
        // a:4
        // y: y,
      });
      //let y = t
      actualSolutionArr.push([y, t]);
    }
  });

  return {
    t0: fileObj.t0,
    h: fileObj.h,
    vars: fileObj.vars,
    numOfCycles: fileObj.numOfCycles,
    eqns: parsedEqns,
    textEqn:fileObj.eqns,
    actualSolutionArr: actualSolutionArr,
    initialConditions: fileObj.initialConditions,
    lineNames:fileObj.lineNames
  };
};

export default ReadJSON;
