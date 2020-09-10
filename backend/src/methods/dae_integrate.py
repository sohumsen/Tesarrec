from gekko import GEKKO
import numpy as np
import matplotlib.pyplot as plt


def dae_integrate(model_obj):

    m = GEKKO()

    num_of_cycles = int(model_obj["Config"]["numOfCycles"])

    x_0_arr = []
    constants = {}
    dep_names = []
    indep_latex = ""

    for i in range(len(model_obj["Vars"])):
        var = model_obj["Vars"][i]
        if var["VarType"] == "Independent":
            m.time = np.linspace(
                var["VarCurrent"],
                num_of_cycles * float(model_obj["Config"]["h"]),
                num_of_cycles,
            )
            indep_latex = var["LatexForm"]
        elif var["VarType"] == "Dependent":

            dep_names.append(var["LatexForm"])

            expr=str(var["LatexForm"])+"="+str(m.Var(value=float(var["VarCurrent"])))
            expr=var["LatexForm"]+"= "+"m.Var(value="+str(float(var["VarCurrent"]))+")"
            
            print(expr)
            exec(expr)


        else:
            
            
            expr=str(var["LatexForm"])+"="+str(m.Param(value=float(var["VarCurrent"])))
            expr=var["LatexForm"]+"= "+"m.Const(value="+str(float(var["VarCurrent"]))+")"

            print(expr)

            exec(expr)



    m.options.IMODE = 4
    m.options.NODES = 3

    clean_eqn = []
    for i in range(len(model_obj["Eqns"])):
        new_eqn = (
            model_obj["Eqns"][i]["textEqn"]
            .replace("^", "**")
            .replace("e", str(np.exp(1)))
            .replace("/d" + indep_latex, ".dt()")
            .replace("=", "==")
        )
        for i in range(len(dep_names)):
            letter=dep_names[i]
            new_eqn=new_eqn.replace("d"+letter,letter)

        clean_eqn.append(new_eqn)
    print(clean_eqn)
    for i in range(len(clean_eqn)):
        m.Equation(eval(clean_eqn[i]))



  
    m.solve(disp=False)
    # plt.plot(x)
    print("######################################")
    print(m.time)
    print("######################################")

    return model_obj
