from sqlalchemy import inspect, ForeignKey
from flask_sqlalchemy import SQLAlchemy
from .db import DBConnection
from sqlalchemy.sql import func

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    mobile = db.Column(db.String, unique=True, nullable=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=True)
    isActivated = db.Column("is_activated", db.Boolean, default=False)

    def serialize(self):
        return {c: getattr(self, c) for c in inspect(self).attrs.keys()}


class UserMultiplePrediction(db.Model):
    __tablename__ = "users_multiple_prediction"
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column("user_id", db.Integer,
                       ForeignKey(User.id), nullable=False)
    createdAt = db.Column("created_at", db.Date, nullable=False, server_default=func.now())

class UserSinglePrediction(db.Model):
    __tablename__ = 'users_single_prediction'
    id = db.Column(db.Integer, primary_key=True)
    vehicleNumber = db.Column("vehicle_number", db.String, nullable=True)
    userId = db.Column("user_id", db.Integer,
                       ForeignKey(User.id), nullable=False)
    mileage = db.Column(db.Numeric, nullable=True)
    fuelType = db.Column('fuel_type', db.String, nullable=True)
    distance = db.Column(db.Numeric, nullable=True)
    roadType = db.Column('road_type', db.String, nullable=True)
    averageSpeed = db.Column('avg_speed', db.Numeric, nullable=True)
    vehicleWeight = db.Column('vehicle_weight', db.Numeric, nullable=False)
    payloadWeight = db.Column('payload_weight', db.Numeric, nullable=True)
    predicted = db.Column(db.Numeric, nullable=False)
    actual = db.Column(db.Numeric, nullable=True)
    userMultiplePredictionId = db.Column("user_multiple_prediction_id", db.Integer, ForeignKey(
        UserMultiplePrediction.id), nullable=True)
    createdAt = db.Column("created_at", db.Date, nullable=False, server_default=func.now())

    def serialize(self):
        return {c: getattr(self, c) for c in inspect(self).attrs.keys()}


class UserOtp(db.Model):
    __tablename__ = 'users_otp'
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column("user_id", db.Integer, ForeignKey(User.id))
    otp = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {c: getattr(self, c) for c in inspect(self).attrs.keys()}
