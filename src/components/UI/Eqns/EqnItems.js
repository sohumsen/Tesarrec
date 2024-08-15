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
        LHSLatexEqn={Eqn.LHSLatexEqn}
        LatexEqn={Eqn.latexEqn}
        TextEqn={Eqn.textEqn}

        showMathQuillBox={props.showMathQuillBox}
        //onDoubleClick={props.onDoubleClickMathQuill(Eqn.id)}
        // mathquillDidMount={props.mathquillDidMount(Eqn.id, "Eqns")}
        handleTextEqnInputChange={props.handleTextEqnInputChange(Eqn.id)}
        handleMathQuillInputChange={props.handleMathQuillInputChange(Eqn.id, "Eqns")}
        handleLHSEqnInputChange={props.handleMathQuillInputChange(Eqn.id, "LHSEqns")}
      />
    );
  });
};

export default EqnItems;
