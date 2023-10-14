from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

# Models go here!


class House(db.Model, SerializerMixin):
    __tablename__ = 'houses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    # house has many students
    students = db.relationship(
        'Student', backref='house', cascade='all, delete')

    serialize_rules = ('-students.house',)

    @validates('name')
    def validate_name(self, key, name):
        valid_house_names = ['Gryffindor',
                             'Slytherin', 'Hufflepuff', 'Ravenclaw']
        if name not in valid_house_names:
            raise ValueError(
                'Invalid house name. Choose from Gryffindor, Slytherin, Hufflepuff, or Ravenclaw')
        return name


class Wand(db.Model, SerializerMixin):
    __tablename__ = 'wands'

    id = db.Column(db.Integer, primary_key=True)
    wood = db.Column(db.String)
    core = db.Column(db.String)
    length = db.Column(db.Integer)

    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))

    student = db.relationship('Student', backref='wand')

    serialize_rules = ('-students.wand',)


class Pet(db.Model, SerializerMixin):
    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    type = db.Column(db.String)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))

    student = db.relationship('Student', backref='pet')

    serialize_rules = ('-students.pet')


class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    house_id = db.Column(db.Integer, db.ForeignKey('houses.id'))
    wand_id = db.Column(db.Integer, db.ForeignKey('wands.id'))
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'))

    wand = db.relationship('Wand', backref='student', cascade='all, delete')
    pet = db.relationship('Pet', backref='student',
                          cascade='all,delete-orphan')
