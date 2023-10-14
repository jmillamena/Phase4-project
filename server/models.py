from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!


class House(db.Model, SerializerMixin):
    __tablename__ = 'houses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)


class Wand(db.Model, SerializerMixin):
    __tablename__ = 'wands'

    id = db.Column(db.Integer, primary_key=True)
    wood = db.Column(db.String)
    core = db.Column(db.String)
    length = db.Column(db.Integer)


class Pet(db.Model, SerializerMixin):
    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    type = db.Column(db.String)


class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    house_id = db.Column(db.Integer, db.ForeignKey('houses.id'))
