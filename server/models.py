from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!


class House(db.Model, SerializerMixin):
    __tablename__ = 'houses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    # one to many relationship with students
    house_students = db.relationship('Student', backref='house_relationship')

    @validates('name')
    def validate_name(self, key, name):
        valid_house_names = ["Gryffindor",
                             "Slytherin", "Hufflepuff", "Ravenclaw"]
        if name not in valid_house_names:
            raise ValueError(
                "House must be either Gryffindor, Slytherin, Hufflepuff, or Ravenclaw.")
        return name

    def __repr__(self):
        return f'<House {self.name}>'


class Wand(db.Model, SerializerMixin):
    __tablename__ = 'wands'

    id = db.Column(db.Float, primary_key=True)
    wood = db.Column(db.String)
    core = db.Column(db.String)
    length = db.Column(db.Integer)

    @validates('core')
    def validate_core(self, key, core):
        valid_core_types = ["Phoenix Feather",
                            "Unicorn Hair", "Dragon Heartstring"]
        if core not in valid_core_types:
            raise ValueError(
                "Core type must be Phoenix Feather, Unicorn Hair, or Dragon Heartstring")
        return core

    def __repr__(self):
        return f'<Wand {self.wood}, {self.core}, {self.length}>'


class Pet(db.Model, SerializerMixin):
    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    type = db.Column(db.String)

    @validates('type')
    def validate_pet_type(self, key, type):
        valid_pet_types = ["Owl",
                           "Cat", "Toad"]
        if type not in valid_pet_types:
            raise ValueError(
                "Students may only bring an owl, a cat or a toad.")
        return type

    def __repr__(self):
        return f'<Pet {self.name}, {self.type}>'


class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    house_id = db.Column(db.Integer, db.ForeignKey('houses.id'))
    wand_id = db.Column(db.Integer, db.ForeignKey('wands.id'))
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'))

    house = db.relationship('House', backref='students')
    wand = db.relationship('Wand', backref='student', uselist=False,
                           cascade='all, delete-orphan', single_parent=True)
    pet = db.relationship('Pet', backref='student',
                          cascade='all, delete-orphan', single_parent=True)

    def __repr__(self):
        return f'<Student {self.name}>'
