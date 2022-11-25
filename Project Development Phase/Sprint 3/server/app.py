import json

from flask import Flask, jsonify, request
from flask_cors import CORS

from utils.helper import process_metadata
from utils.models import db
from utils.np_encoder import NpEncoder
from utils.prediction import DataSet, MultiModel
from utils.report_generator import PDF
import atexit
from utils.scheduled_jobs import start_jobs
from utils.metadata import MetaData
from ibm_db import connect
app = Flask(__name__)


CORS(app, resources={"*": {"origins": "*"}})
app.config['SECRET_KEY'] = 'secret_key_hkr'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres@localhost:5432/tbfcp'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['FRONTEND_URL'] = 'http://localhost:3000'

app.config['GOOGLE_CLIENT_ID'] = ''
app.config['GOOGLE_CLIENT_SECRET'] = ''
db.init_app(app)

with app.app_context():
    db.create_all()

dataset = DataSet()
model = MultiModel()
# model.train_model()
metadata = process_metadata()



@app.route('/metadata', methods=['GET'])
def get_metadata():
    return  json.dumps(metadata, cls=NpEncoder) , 200


# import all routes
import routes.auth
import routes.prediction
import routes.user

thread = start_jobs(app=app)


def cleanOnExit():
    print("Cleaning Thread")
    thread.set()

atexit.register(cleanOnExit);