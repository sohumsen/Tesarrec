import os

# from pylatexenc.latex2text import LatexNodes2Text

from flask import Flask, Blueprint, jsonify, request, render_template
from flask_cors import CORS
import time

from methods.dae_integrate import dae_integrate


app = Flask(__name__)
CORS(app)

# main = Blueprint("main", __name__)


# @app.route("/")
# @app.route("/index")
# def index():
#     return render_template("index.html")


@app.route("/solve_dae", methods=["POST"])
def solve_dae():
    model_obj = request.get_json()
    # start_time = time.time()

    solution = dae_integrate(model_obj)
    # print("--- %s seconds ---" % (time.time() - start_time))

    return jsonify(solution)


if __name__ == "__main__":
    # print("Running my server")
    # app.config["test"] = "test"
    # app.register_blueprint(main)
    # app.run(debug=True, port=int(os.environ.get("PORT", 8080)))
    # app.register_blueprint(main)

    app.run()
