import sys
from numpy import linspace
from scipy.integrate import odeint
from scipy.optimize import fsolve


def dae_integrate():

    y0 = [0, 5]
    time = linspace(0., 10., 1000)
    F_lon = 10.
    mass = 1000.

    def F_r(a, v):
        return (((1 - a) / 3) ** 2 + (2 * (1 + a) / 3) ** 2) * v

    def constraint(a, v):
        return (F_lon - F_r(a, v)) / mass - a

    def integral(y, _):
        v = y[1]
        a, _, ier, mesg = fsolve(constraint, 0, args=[v, ], full_output=True)
        if ier != 1:
            print( "I coudn't solve the algebraic constraint, error:\n\n", mesg)
            sys.stdout.flush()
        return [v, a]

    dydt = odeint(integral, y0, time)

    return dydt

