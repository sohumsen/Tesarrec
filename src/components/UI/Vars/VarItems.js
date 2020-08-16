import React from "react";
import VarItem from "./VarItem";

const VarItems = (props) => {
  let Vars = props.Vars;
  let newVars = [];

  // Vars.sort((a, b) =>
  //   a.LatexForm.slice(2, a.LatexForm.length) >
  //   b.LatexForm.slice(2, b.LatexForm.length)
  //     ? 1
  //     : -1
  // );

  let order = ["Dependent", "Independent", "Constant"];

  for (let i = 0; i < order.length; i++) {
    let type = order[i];
    Vars.forEach((Var) => {
      if (Var.VarType === type) {
        newVars.push(Var);
      }
    });
  }

  return newVars.map((Var) => {
    return (
      <VarItem
        key={Var.id}
        error={Var.errorMessage}
        id={Var.id}
        removeItem={() => props.removeItem(Var.id, "Vars")}
        LatexForm={Var.LatexForm}
        Unit={Var.Unit}
        VarType={Var.VarType} // Dependent, Independent , Constants
        VarLow={Var.VarLow} // low, current, high
        VarCurrent={Var.VarCurrent} // low, current, high
        VarHigh={Var.VarHigh} // low, current, high
        // VarDescription={Var.VarDescription}
        handleMathQuillInputChange={props.handleMathQuillInputChange(
          Var.id,
          "Vars"
        )}
        handleVariableInputChange={props.handleVariableInputChange(
          Var.id,
          false
        )}
        SliderHandleChange={props.handleVariableInputChange(
          Var.id,
          true
        )}
        disabledRemoveButton={Vars.length === 2}
      />
    );
  });
};

export default VarItems;
