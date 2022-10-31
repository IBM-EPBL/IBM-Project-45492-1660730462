import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from utils.helper import generateRandomNumber, msgResponse
from cerberus import Validator
import jwt
import hashlib
from utils.mail import send_otp_mail
from utils.models import User, UserOtp, db
from utils.db import DBConnection

app = Flask(__name__)

CORS(app, resources={"*": {"origins": "*"}})
app.config['SECRET_KEY'] = 'secret_key_hkr'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres@localhost:5432/tbfcp'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db.init_app(app)

with app.app_context():
    db.create_all()

# import all routes
import routes.auth
import routes.user