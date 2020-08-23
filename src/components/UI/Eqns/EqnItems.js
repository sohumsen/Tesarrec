import React from "react";
import EqnItem from "./EqnItem";

const EqnItems = (props) => {

  let Eqns = props.Eqns;

  return Eqns.map((Eqn) => {
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
