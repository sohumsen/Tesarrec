import React from "react";
import EqnItem from "./EqnItem/EqnItem";

const EqnItems = (props) => {
  return props.Eqns.map((Eqn, index) => {
    return (
      <EqnItem
        removeEqn={() => props.removeEqn(Eqn.id)}
        DByDLatex={Eqn.DByDLatex}
        LatexEqn={Eqn.LatexEqn}
        handleMathQuillInputChange={props.handleMathQuillInputChange(Eqn.id)}
      />
    );
  });
};

export default EqnItems;
