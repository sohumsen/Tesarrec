from flask import Flask 


app = Flask(__name__) 
 
 
@app.route("/") 
def hello():   
    #do your things here 
    return "It works!" 
 
if __name__ == "__main__": 
    app.run()


    
def main(x):
    return x +3


if __name__ == "__main__":
    main(2)
