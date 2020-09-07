from flask import Flask
from flask import Flask, render_template, make_response
from flask import Blueprint,jsonify
import os 
from scipy import integrate
from flask import request
import time
from flask_cors import CORS, cross_origin
from matplotlib.figure import Figure
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
import io
from flask import Response

import random

app=Flask(__name__)
CORS(app)

main=Blueprint('main',__name__)



@main.route('/scipy_integrate' , methods=['POST'])
def scipy_integrate():
    #take a modelobj here
    modelObj=request.get_json(force=True)
    print(modelObj)
    x0=[]
    for Var in modelObj.Vars:
        if Var.VarType=="Independent":
            t=np.linespace(Var.VarCurrent,30*modelObj.Config.h,30)
        elif Var.VarType=="Dependent":
            x0.append(Var.VarCurrent)
        

    return json
    

@app.route('/plot.png')
def plot_png():
    fig = create_figure()
    output = io.BytesIO()
    FigureCanvas(fig).print_png(output)
    return Response(output.getvalue(), mimetype='image/png')

def create_figure():
    fig = Figure()
    axis = fig.add_subplot(1, 1, 1)
    xs = range(100)
    ys = [random.randint(1, 50) for x in xs]
    axis.plot(xs, ys)
    return fig


@main.route('/')
def index():
    return render_template('index.html', context={})

if __name__ == '__main__':
    print("Running my server")
    app.config["test"]='test'
    app.register_blueprint(main)
    app.run(debug=True,port=int(os.environ.get('PORT', 8080)))


