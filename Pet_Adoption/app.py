import os
from flask import Flask, jsonify, render_template
import pymongo
import pet_scrape
import json
from bson.json_util import dumps



app = Flask(__name__)

db=pet_scrape.createDBConnection()


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/cats")
def cats():
    """Return a list of cats data."""
    cats=db.pets_info.find({'pet_type': 'cat'})
    # print(len(cats))
    # dumps(cats)
    return dumps(cats)
    # Return a list of the column names (sample names)
    # return jsonify({'cats':cats})
    # return jsonify({"hi":"world"})


@app.route("/dogs")
def dogs():
    dogs=db.pets_info.find({'pet_type': 'dog'})
  
    # Return a list of the column names (sample names)
    # return jsonify(dogs)
    return dumps(dogs)

if __name__ == "__main__":
    app.run(debug=True)
