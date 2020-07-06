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
  console.log(props.Vars)

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
