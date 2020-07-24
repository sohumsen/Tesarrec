

class Model {
    constructor(){
        this.Eqns= DEFAULTEQNS,
        this.Vars= DEFAULTVARS,
        this.Name= "Untitled",
        this.lineNames = { t: 1 },
        this.Description= "Please add Description",
        this.ActualSolution= {},
        this.SolutionTechnique= "RK4",
        this.CalcuatedSolutions = {}
    }

    validateExpression(expr, line){
        this.Eqns.forEach(eqn => {
            this.lineNames[eqn.line] = 1
        });
        this.Vars.forEach(kVar => {
            this.lineNames[kVar.LatexForm] = 1
        });
        try {
            evaluate(expr, lineNames);
            return true;
          } catch (error) {
      
            return false;
          }
    }

    fromJson(json){
        aModel = JSON.parse(json)
        return aModel

    }
    toJson(){
        return JSON.stringify(this)
    }
    
}