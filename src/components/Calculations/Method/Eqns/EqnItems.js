import React from "react";
import EqnItem from "./EqnItem";

const EqnItems = (props) => {
  const disabledRemoveButton = () => {
    if (props.Eqns.length === 2) {
      return true;
    } else {
      return false;
    }
  };
  let Eqns = props.Eqns;
  let newEqns = [];
  let order = ["a", "b", "c", "d","e","f","g","h","i","j","k"];
  order.forEach((letter) => {
    Eqns.forEach((obj) => {
      if (obj.line === letter) {
        newEqns.push(obj);
      }
    });
  });


  return newEqns.map((Eqn) => {
    return (
      <EqnItem
      key={Eqn.id}
        error={Eqn.errorMessage}
        id={Eqn.id}
        disabledRemoveButton={disabledRemoveButton()}
        removeEqn={() => props.removeEqn(Eqn.id)}
        DByDLatex={Eqn.DByDLatex}
        LatexEqn={Eqn.LatexEqn}
        handleMathQuillInputChange={props.handleMathQuillInputChange(Eqn.id)}
      />
    );
  });
};

export default EqnItems;
