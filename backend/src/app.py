import os
# from pylatexenc.latex2text import LatexNodes2Text

from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS


from methods.ode_integrate import ode_integrate
from methods.dae_integrate import dae_integrate


app = Flask(__name__)
CORS(app)

main = Blueprint("main", __name__)


@main.route("/solve_ode", methods=["POST"])
def solve_ode():
    model_obj = request.get_json()
    solution = ode_integrate(model_obj)

    return jsonify(solution.tolist())


@main.route("/solve_dae", methods=["POST"])
def solve_dae():
    model_obj = request.get_json()

    # try:
    solution = dae_integrate(model_obj)
    return jsonify(solution)

    # except Exception as e:
    #     return jsonify(e)


  



if __name__ == "__main__":
    print("Running my server")
    app.config["test"] = "test"
    app.register_blueprint(main)
    app.run(debug=True, port=int(os.environ.get("PORT", 8080)))
