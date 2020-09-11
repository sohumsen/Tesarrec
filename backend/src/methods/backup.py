from gekko import GEKKO
import numpy as np
import matplotlib.pyplot as plt


def dae_integrate(model_obj):

    m = GEKKO()

    num_of_cycles = int(model_obj["Config"]["numOfCycles"])

    x_0_arr = []
    constants = {}
    dep_names = []
    all_expr = []
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

            expr = (
                var["LatexForm"]
                + "= "
                + "m.Param(value=m.time"
                # + str(float(var["VarCurrent"]))
                + ")"
            )
        elif var["VarType"] == "Dependent":

            dep_names.append(var["LatexForm"])

            # expr=str(var["LatexForm"])+"="+str(m.Var(value=float(var["VarCurrent"])))
            expr = (
                var["LatexForm"]
                + "= "
                + "m.Var(value="
                + str(float(var["VarCurrent"]))
                + ")"
            )

        else:

            # expr=str(var["LatexForm"])+"="+str(m.Param(value=float(var["VarCurrent"])))
            expr = (
                var["LatexForm"]
                + "= "
                + "m.Param(value="
                + str(float(var["VarCurrent"]))
                + ")"
            )


        all_expr.append(expr)

    m.options.IMODE = 4
    # (IMODE=1, 4, and 7) where the problem must have the same number of variables and equations and optimization is not allowed.
    # m.options.NODES = 3

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
        print(new_eqn)

        clean_eqn.append(new_eqn)
    print(clean_eqn)
    # for i in range(len(clean_eqn)):
    #     m.Equation(eval(str(clean_eqn[i])))

    # temp_arr=["S.dt() == -(R_t) / (T_2) * I * S","E.dt() == -(R_t) / (T_2) * I * S * -(E) / (T_1)","I.dt() == -(E) / (T_1) - (I) / (T_2)","R == (I) / (T_2)"]
    m.time = np.linspace(0, 100, 101)

    temp_arr = [
        "R_t = m.Param(value=0.73)",
        "T_2 = m.Param(value=2.9)",
        "T_1 = m.Param(value=5.29)",
        "t = m.Param(value=m.time)",
        "S = m.Var(value=2.0)",
        "E = m.Var(value=1)",
        "I = m.Var(value=1)",
        "R = m.Var(value=1)"
    ]

   
    # R_t = 0.73
    # T_2 = 2.9
    # T_1 = 5.29
    m.options.IMODE = 4
    m.options.NODES = 3


    # exec("R_t = m.Param(value=0.73)")
    # T_2 = m.Param(value=2.9)
    # T_1 = m.Param(value=5.29)

    # t = m.Param(value=m.time)

    # S = m.Var(value=2.0)
    # E = m.Var(value=1)
    # I = m.Var(value=1)
    # R = m.Var(value=1)
    print(all_expr)
    print(temp_arr)

    for i in range(len(all_expr)):
        exec(all_expr[i],globals(), locals())
    # for i in range(len(temp_arr)):
    #     m.Equation(eval(temp_arr[i]))

    for i in range(len(clean_eqn)):
        m.Equation(eval(str(clean_eqn[i])))

    # m.Equation(eval("S.dt() == -(R_t) / (T_2) * I * S"))
    # m.Equation(E.dt() == -(R_t) / (T_2) * I * S * -(E) / (T_1))
    # m.Equation(I.dt() == -(E) / (T_1) - (I) / (T_2))
    # m.Equation(R == (I) / (T_2))

    m.solve(disp=False)
    # plt.plot(x)
    print("######################################")
    print(S.value, E.value, I.value, R.value)
    print("######################################")

    return model_obj
