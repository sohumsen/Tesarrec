import React from "react";
import EqnItem from "./EqnItem/EqnItem";

const EqnItems = (props) => {
  const disabledRemoveButton = () => {
    if (props.Eqns.length === 1) {
      return true;
    } else {
      return false;
    }
  };
  let Eqns = props.Eqns;
  let newEqns = [];
  let order = ["a", "b", "c", "d"];
  order.forEach((letter) => {
    Eqns.forEach((obj) => {
      if (obj.line === letter) {
        newEqns.push(obj);
      }
    });
  });

  Eqns.sort((a,b)=>{
    let keyA= a.line
    let keyB=b.line
    
    return keyA.localeCompare(keyB)
  })

  return Eqns.map((Eqn) => {
    return (
      <EqnItem
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
