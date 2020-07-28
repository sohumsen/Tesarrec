

class Model {
    constructor(){
        this.eqns= DEFAULTEQNS,
        this.vars= DEFAULTVARS,
        this.name= "Untitled",
        this.lineNames = { t: 1 },
        this.Description= "Please add Description",
        this.ActualSolution= {},
        this.SolutionTechnique= "RK4",
        this.CalcuatedSolutions = {}
        this.ModelResult = { }
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