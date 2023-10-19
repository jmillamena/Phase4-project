from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import Table, Column, Integer, ForeignKey

from config import db

# student_subject_association = Table(
#     'student_subject_association',
#     db.Model.metadata,
#     Column('student_id', Integer, ForeignKey('students.id')),
#     Column('subject_id', Integer, ForeignKey('subjects.id'))
# )


class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    house_id = db.Column(db.Integer, db.ForeignKey('houses.id'))
#     year_id = db.Column(db.Integer, db.ForeignKey('years.id'))
    wand_id = db.Column(db.Integer, db.ForeignKey('wands.id'))
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'))

    house = db.relationship('House', backref='students')
    wand = db.relationship('Wand',  uselist=False)
    pet = db.relationship('Pet', uselist=False)

    serialize_rules = ("-house.student", "-house.students")
#     year = db.relationship('Year', backref='school_year')
#     subjects = db.relationship(
#         'Subject', secondary=student_subject_association, back_populates="students")

#     def custom_to_dict(self):
#         # Initialize the dictionary
#         serialized = {
#             "id": self.id,
#             "name": self.name,
#             "year": self.year.to_dict(),
#             "wand": self.wand.to_dict(),
#             "pet": self.pet.to_dict(),
#             "subjects": [subject.to_dict() for subject in self.subjects],
#         }

#         return serialized

    def __repr__(self):
        return f'<Student {self.name}>'


# Student.serialize_rules = (
#     '-house.students', '-subjects.students', '-year.students')


class House(db.Model, SerializerMixin):
    __tablename__ = 'houses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    # one to many relationship with students
    # house_students = db.relationship('Student', backref='house_relationship')

    # serialize_rules = ('-students.house')

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


# House.serialize_rules = ('-house.students')


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


# class Year(db.Model, SerializerMixin):
#     __tablename__ = 'years'

#     id = db.Column(db.Integer, primary_key=True)
#     year = db.Column(db.Integer)

#     student_year = db.relationship('Student', backref='student_year')

#     @validates('year')
#     def validate_year(self, key, year):
#         if not 1 <= year <= 7:
#             return ValueError("Year must be between 1 and 7 inclusive")
#         return year

#     def __repr__(self):
#         return f'<Student {self.year}>'


# class Subject(db.Model, SerializerMixin):
#     __tablename__ = 'subjects'

#     id = db.Column(db.Integer, primary_key=True)
#     subject = db.Column(db.String)

#     enrolled_students = db.relationship(
#         'Student',
#         secondary=student_subject_association,
#         back_populates="subjects"
#     )

#     students = db.relationship(
#         'Student', secondary=student_subject_association, back_populates="subjects")

#     def __repr__(self):
#         return f'<Subject {self.subject}>'
