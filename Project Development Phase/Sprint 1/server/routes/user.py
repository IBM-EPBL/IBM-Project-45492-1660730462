import datetime
import hashlib
from flask import jsonify, request
import jwt
from psycopg2 import IntegrityError
from app import app
from utils.helper import generateRandomNumber, msgResponse
from utils.mail import send_otp_mail
from utils.models import User, UserOtp
from utils.route_schema import registerValidator, loginRequestValidator, otpRequestValidator
from utils.models import db

@app.route("/user/register", methods=['POST'])
def register_user():

    isValidated = registerValidator.validate(request.get_json())
    if (not isValidated):
        return jsonify(registerValidator.errors), 400

    email = request.json['email']
    password = hashlib.md5(request.json['password'].encode()).hexdigest()
    name = request.json['name']
    mobile = request.json['mobile']

    try:
        user = User(name=name, mobile=mobile, password=password, email=email)
        db.session.add(user)
        db.session.flush()

        randomOtp = generateRandomNumber()
        userOtp = UserOtp(otp=randomOtp, userId=user.id)
        print("Otp is ", randomOtp)
        db.session.add(userOtp)
        db.session.commit()
        send_otp_mail(user.name, user.email, userOtp.otp);
        authToken = jwt.encode(
            {'userId': user.id, 'userOtpId': userOtp.id}, app.config['SECRET_KEY'])
        return jsonify({'token': authToken}), 200
    except IntegrityError:
        db.session.rollback()
        return msgResponse('user already exists'), 400



@app.route("/user/login", methods=['POST'])
def login_user():
    isValidated = loginRequestValidator.validate(request.get_json())
    if (not isValidated):
        return jsonify(loginRequestValidator.errors), 400

    email = request.json['email']
    password = request.json['password']

    user = User.query.filter_by(email=email).first()
    if (user is not None):
        if (user.password == hashlib.md5(password.encode()).hexdigest()):
            payload = {
                'type': 'AUTH_TOKEN',
                'id': user.id,
                'email': user.email,
                'exp': datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(hours=24)
            }
            token = jwt.encode(payload=payload, key=app.config['SECRET_KEY'])
            return jsonify({'user': {'id': user.id, 'email': user.email, 'mobile': user.mobile, 'name': user.name}, 'token': token}), 200
        else:
            return msgResponse('Invalid Password'), 400

    return msgResponse('User not found'), 400



@app.route("/user/otp", methods=['POST'])
def validate_otp():
    isValidated = otpRequestValidator.validate(request.get_json())
    if (not isValidated):
        return jsonify(otpRequestValidator.errors), 400

    token = request.json['token']
    otp = request.json['otp']

    try:
        decoded = jwt.decode(token, app.config['SECRET_KEY'], "HS256")
        userId, userOtpId = decoded['userId'], decoded['userOtpId']
        user = db.session.get(User, userId)
        userOtp = db.session.get(UserOtp, userOtpId)
        if (user is not None):
            if (userOtp is not None and userOtp.otp == otp):
                user.isActivated = True
                db.session.delete(userOtp)
                db.session.commit()
                return msgResponse("User Registered Successfully"), 200
            else:
                return msgResponse("Invalid Otp"), 400
        else:
            return "Invalid User", 400
    except jwt.InvalidSignatureError:
        return "bad request", 400
