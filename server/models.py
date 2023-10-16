from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!


class House(db.Model, SerializerMixin):
    __tablename__ = 'houses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    def __repr__(self):
        return f'<House {self.name}>'


class Wand(db.Model, SerializerMixin):
    __tablename__ = 'wands'

    id = db.Column(db.Integer, primary_key=True)
    wood = db.Column(db.String)
    core = db.Column(db.String)
    length = db.Column(db.Integer)

    def __repr__(self):
        return f'<Wand {self.wood}, {self.core}, {self.length}>'


class Pet(db.Model, SerializerMixin):
    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    type = db.Column(db.String)

    def __repr__(self):
        return f'<Pet {self.name}, {self.type}>'


class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    def __repr__(self):
        return f'<Student {self.name}>'
