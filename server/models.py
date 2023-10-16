from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
from app import db

# class House(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(50), nullable=False)
#     traits = db.Column(db.String(200), nullable=False)
#     points = db.relationship('Points', backref='house', lazy=True)

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(100), unique=True, nullable=False)
#     password = db.Column(db.String(100), nullable=False)
#     points = db.relationship('Points', backref='user', lazy=True)

# class Points(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     value = db.Column(db.Integer, nullable=False)
#     description = db.Column(db.String(200))
#     date = db.Column(db.DateTime, nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     house_id = db.Column(db.Integer, db.ForeignKey('house.id'), nullable=False)