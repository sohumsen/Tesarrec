import time

import numpy as np
from scipy.integrate import odeint


def ode_integrate(modelObj):

    num_of_cycles = int(modelObj["Config"]["numOfCycles"])

    x_0_arr = []
    constants = {}
    dep_names = []
    indep_latex = ""
    for i in range(len(modelObj["Vars"])):
        var = modelObj["Vars"][i]
        if var["VarType"] == "Independent":
            t = np.linspace(
                var["VarCurrent"],
                num_of_cycles * float(modelObj["Config"]["h"]),
                num_of_cycles,
            )
            indep_latex = var["LatexForm"]
        elif var["VarType"] == "Dependent":
            x_0_arr.append(float(var["VarCurrent"]))
            dep_names.append(var["LatexForm"])

        else:
            constants[var["LatexForm"]] = float(var["VarCurrent"])

    compiled_eqn = []
    for i in range(len(modelObj["Eqns"])):
        compiled_eqn.append(
            compile(
                modelObj["Eqns"][i]["textEqn"]
                .replace("^", "**")
                .replace("e", str(np.exp(1))),
                "<string>",
                "eval",
            )
        )

    def func(x, t):
        x_0 = {}
        for idx, val in enumerate(x):
            x_0[dep_names[idx]] = x[idx]

        returned_arr = []
        for idx in range(len(modelObj["Eqns"])):

            returned_arr.append(
                eval(compiled_eqn[idx], {**constants, **x_0, indep_latex: t})
            )

        return returned_arr

    start = time.process_time()

    x = odeint(func, x_0_arr, t)
    print(time.process_time() - start)

    return x
