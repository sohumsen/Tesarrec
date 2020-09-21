from gekko import GEKKO
import numpy as np
from pylatexenc.latex2text import LatexNodes2Text


def dae_integrate(model_obj):
    # eqnlooks like ["da/dt=a+t"...]

    m = GEKKO()


    dep_names = []
    variables_list = []
    indep_latex = ""

    for i in range(len(model_obj["Vars"])):
        var = model_obj["Vars"][i]
        if var["VarType"] == "Independent":

            m.time = np.linspace(
                float(var["VarCurrent"]),
                int(model_obj["Config"]["numOfCycles"]) * float(model_obj["Config"]["h"]),
                int(model_obj["Config"]["numOfCycles"]) + 1,
            )
            indep_latex = var["LatexForm"]

            variable = (
                var["LatexForm"]
                + "= "
                + "m.Param(value=m.time"
                + ")"
            )
        elif var["VarType"] == "Dependent":

            dep_names.append(var["LatexForm"])

            variable = (
                var["LatexForm"]
                + "= "
                + "m.Var(value="
                + str(float(var["VarCurrent"]))
                + ")"
            )

        else:

            variable = (
                var["LatexForm"]
                + "= "
                + "m.Param(value="
                + str(float(var["VarCurrent"]))
                + ")"
            )

        variables_list.append(variable)

    # (IMODE=1, 4, and 7) where the problem must have the same number of variables and equations and optimization is not allowed.
    # m.options.NODES = 3
    # m.time = np.linspace(0, 100, 101)

    clean_eqn = []
    for i in range(len(model_obj["Eqns"])):
     
        first_bit = (
            (LatexNodes2Text().latex_to_text(model_obj["Eqns"][i]["LHSLatexEqn"]))
            .replace("/d" + indep_latex, ".dt()")
            .replace("=", "==")
        )

        second_bit = (
            model_obj["Eqns"][i]["textEqn"]
            .replace("^", "**")
            .replace("e", str(np.exp(1)))
            # .replace("/d" + indep_latex, ".dt()")
        )
      
        for i in range(len(dep_names)):
            letter = dep_names[i]
            first_bit = first_bit.replace("d" + letter, letter)

        new_eqn = first_bit + second_bit

        clean_eqn.append(new_eqn)

    m.options.IMODE = 7
    m.options.NODES = 3

    for i in range(len(variables_list)):
        exec(variables_list[i], globals(), locals())


    for i in range(len(clean_eqn)):
        m.Equation(eval(str(clean_eqn[i])))

    m.solve(disp=False)

    solution_arr = []
    for i in range(len(dep_names)):
      
        exec("solution_arr.append(" + dep_names[i] + ".value)")
    solution_arr.append(m.time.tolist())

    solution_arr = np.transpose(solution_arr)

    return solution_arr.tolist()
