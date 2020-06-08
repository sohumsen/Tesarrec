import { parse, simplify } from "mathjs";

const DiffEquationSolver = (props) => {
  /**
   * A method component that takes in a equation and outputs a chart
   * The equation cannot contain an error and parent components do the error handling
   */
  let y0 = parseFloat(props.Y0);
  let x0 = parseFloat(props.X0);
  let h = parseFloat(props.h);

  let retEuler = [];
  let retMidpoint = [];
  let retRungaKutta = [];

  const parsedEquation = simplify(parse(props.eqn));

  //console.log(eval(props.eqn));

  const calcValueAt = (x, y) => {
    // eslint-disable-next-line
    return parsedEquation.evaluate({ x: x, y: y });
  };

  const solveForRthMidpoint = (x0, y0, h) => {
    let k1 = h * calcValueAt(x0, y0);
    let k2 = h * calcValueAt(x0 + h / 2, y0 + k1 / 2);
    let y1 = y0 + k2;
    let x1 = x0 + h;
    return [x1, y1, h];
  };

  const solveForRthEuler = (x0, y0, h) => {
    let y1 = y0 + h * calcValueAt(x0, y0);
    let x1 = x0 + h;
    return [x1, y1, h];
  };

  const solveForRthRungeKutta = (x0, y0, h) => {
    let k1 = h * calcValueAt(x0, y0);
    let k2 = h * calcValueAt(x0 + h / 2, y0 + k1 / 2);
    let k3 = h * calcValueAt(x0 + h / 2, y0 + k2 / 2);
    let k4 = h * calcValueAt(x0 + h, y0 + k3);

    let y1 = y0 + k1 / 6 + k2 / 3 + k3 / 3 + k4 / 6;

    let x1 = x0 + h;

    return [x1, y1, h];
  };

  const solveRecursively = (numberOfLoops, x, y, h, method) => {
    for (let i = 0; i < numberOfLoops; i++) {
      if (method === "RungeKutta") {
        [x, y, h] = solveForRthRungeKutta(x, y, h);
      } else if (method === "Midpoint") {
        [x, y, h] = solveForRthMidpoint(x, y, h);
      } else if (method === "Euler") {
        [x, y, h] = solveForRthEuler(x, y, h);
      }
    }
    return [x, y, h];
  };

 
  for (let i = 1; i <= props.numberOfCycles; i++) {
    retEuler.push(solveRecursively(i, x0, y0, h, "Euler"));
    retMidpoint.push(solveRecursively(i, x0, y0, h, "Midpoint"));
    retRungaKutta.push(solveRecursively(i, x0, y0, h, "RungeKutta"));
  }

  
  return { 'Euler': retEuler, 'MidPoint' : retMidpoint, 'RungaKutta' : retRungaKutta}
  
};

export default DiffEquationSolver;
