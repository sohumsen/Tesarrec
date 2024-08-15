import Model from "./Model";
import DEFAULTEQUATIONSnew from "./DEFAULTEQUATIONSnew";
import DEFAULTGRAPHCONFIGnew from "../../../../containers/Lab/LinearCoupled/DefaultGraphConfignew";
import DEFAULTVARS from "./DEFAULTVARS";

describe("<Model/>", () => {
  it("Model ", () => {
    let eqnsText = DEFAULTEQUATIONSnew.map((eqn) => eqn.TextEqn);

    
    let newModel = new Model(
      {
        vars: { K_1: 3, K_2: 3, K_3: 3, K_4: 3, K_5: 3 },
        eqns: eqnsText,
        ...DEFAULTGRAPHCONFIGnew,
      },
      {
        modelId: "IKJGDFKHGFDJKHKJGFD",
        calculate: true,
      }
    );
    newModel.eqns.parsedEqns.forEach(eqn => {
        newModel.validateExpressions([eqn],
            newModel.config.lineNames, newModel.Vars)
    });
   

  });
});
