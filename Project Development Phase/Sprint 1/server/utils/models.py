from sqlalchemy import inspect, ForeignKey
from flask_sqlalchemy import SQLAlchemy
from .db import DBConnection

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    mobile = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String)
    isActivated = db.Column("is_activated", db.Boolean, default=False)

    def serialize(self):
        return {c: getattr(self, c) for c in inspect(self).attrs.keys()}


class UserOtp(db.Model):
    __tablename__ = 'users_otp'
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column("user_id", db.Integer, ForeignKey(User.id))
    otp = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {c: getattr(self, c) for c in inspect(self).attrs.keys()}