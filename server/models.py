from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import Table, Column, Integer, ForeignKey

from config import db

# Models go here!


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

student_subject_association = Table(
    'student_subject_association',
    db.Model.metadata,
    Column('student_id', Integer, ForeignKey('students.id')),
    Column('subject_id', Integer, ForeignKey('subjects.id'))
)


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

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    wood = db.Column(db.String)
    core = db.Column(db.String)
    length = db.Column(db.Float)

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


class Year(db.Model, SerializerMixin):
    __tablename__ = 'years'

    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer)

    student_year = db.relationship('Student', backref='student_year')

    @validates('year')
    def validate_year(self, key, year):
        if not 1 <= year <= 7:
            return ValueError("Year must be between 1 and 7 inclusive")
        return year

    def __repr__(self):
        return f'<Student {self.year}>'


class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    house_id = db.Column(db.Integer, db.ForeignKey('houses.id'))
    year_id = db.Column(db.Integer, db.ForeignKey('years.id'))
    wand_id = db.Column(db.Integer, db.ForeignKey('wands.id'))
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'))

    house = db.relationship('House', backref='students')
    wand = db.relationship('Wand', backref='student', uselist=False,
                           cascade='all, delete-orphan', single_parent=True)
    pet = db.relationship('Pet', backref='student',
                          cascade='all, delete-orphan', single_parent=True)
    year = db.relationship('Year', backref='school_year')
    subjects = db.relationship(
        'Subject', secondary=student_subject_association, back_populates="students")

    def __repr__(self):
        return f'<Student {self.name}>'


class Subject(db.Model, SerializerMixin):
    __tablename__ = 'subjects'

    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String)

    enrolled_students = db.relationship(
        'Student',
        secondary=student_subject_association,
        back_populates="subjects"
    )

    students = db.relationship(
        'Student', secondary=student_subject_association, back_populates="subjects")

    def __repr__(self):
        return f'<Subject {self.subject}>'
