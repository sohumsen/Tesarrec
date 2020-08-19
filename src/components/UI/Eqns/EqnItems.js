import React from "react";
import EqnItem from "./EqnItem";

const EqnItems = (props) => {

  let Eqns = props.Eqns;
  let newEqns = [];
  // let order = ["a", "b", "c", "d","e","f","g","h","i","j","k"];
  let order = ["Y_1", "Y_2", "Y_3", "Y_4","Y_5","Y_6","Y_7","Y_8","Y_9"];

  order.forEach((letter) => {
    Eqns.forEach((obj) => {
      if (obj.lineName === letter) {
        newEqns.push(obj);
      }
    });
  });

  return newEqns.map((Eqn) => {
    return (
      <EqnItem
        key={Eqn.id}
        error={Eqn.errorMessage}
        // id={Eqn.id}
        disabledRemoveButton={props.Eqns.length === 1}
        removeItem={() => props.removeItem(Eqn.id, "Eqns")}
        DByDLatex={Eqn.DByDLatex}
        LatexEqn={Eqn.latexEqn}
        //onDoubleClick={props.onDoubleClickMathQuill(Eqn.id)}
        // mathquillDidMount={props.mathquillDidMount(Eqn.id, "Eqns")}

        handleMathQuillInputChange={props.handleMathQuillInputChange(Eqn.id, "Eqns")}
      />
    );
  });
};

export default EqnItems;
