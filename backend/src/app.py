import os

from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS


from methods.ode_integrate import ode_integrate
from methods.dae_integrate import dae_integrate


app = Flask(__name__)
CORS(app)

main = Blueprint("main", __name__)


@main.route("/scipy_integrate", methods=["POST"])
def scipy_integrate():
    # take a modelobj here
    model_obj = request.get_json()
    solution = ode_integrate(model_obj)
    # print(dae_integrate())
    # return jsonify(dae_integrate().tolist())

    return jsonify(solution.tolist())


if __name__ == "__main__":
    print("Running my server")
    app.config["test"] = "test"
    app.register_blueprint(main)
    app.run(debug=True, port=int(os.environ.get("PORT", 8080)))
