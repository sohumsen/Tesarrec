import React from "react";
import VarItem from "./VarItem";

const VarItems = (props) => {
  const disabledRemoveButton = () => {
    if (props.Vars.length === 2) {
      return true;
    } else {
      return false;
    }
  };
  let Vars = props.Vars;
  let newVars = [];


  // let order = ["a", "b", "c", "d","e","f","g","h","i","j","k"];
  // order.forEach((letter) => {
  //   Eqns.forEach((obj) => {
  //     if (obj.line === letter) {
  //       newEqns.push(obj);
  //     }
  //   });
  // });

  Vars.sort((a, b) =>
    a.LatexForm.slice(2, a.LatexForm.length) >
    b.LatexForm.slice(2, b.LatexForm.length)
      ? 1
      : -1
  );

  Vars.forEach((Var) => {
    if (Var.VarType === "Dependent") {
      newVars.push(Var);
    }
  });
  
  Vars.forEach((Var) => {
    if (Var.VarType === "Independent") {
      newVars.push(Var);
    }
  });

  Vars.forEach((Var) => {
    if (Var.VarType === "Constant") {
      newVars.push(Var);
    }
  });





  return newVars.map((Var) => {
    return (
      <VarItem
        key={Var.id}
        error={Var.errorMessage}
        id={Var.id}
        disabledRemoveButton={disabledRemoveButton()}
        removeItem={() => props.removeItem(Var.id, "Vars")}
        LatexForm={Var.LatexForm}
        Unit={Var.Unit}
        VarType={Var.VarType} // Dependent, Independent , Constants
        VarLow={Var.VarLow} // low, current, high
        VarCurrent={Var.VarCurrent} // low, current, high
        VarHigh={Var.VarHigh} // low, current, high
        handleMathQuillInputChange={props.handleMathQuillInputChange(
          Var.id,
          "Vars"
        )}
        handleVariableInputChange={props.handleVariableInputChange(Var.id)}
        SliderHandleChange={props.SliderHandleChange}
        SliderTextHandleChange={props.SliderTextHandleChange}
      />
    );
  });
};

export default VarItems;
