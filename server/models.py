from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import Table, Column, Integer, ForeignKey, ForeignKeyConstraint, CheckConstraint, Enum
from config import db


grades_enum = Enum(
    'Outstanding',
    'Exceeds Expectations',
    'Acceptable',
    'Poor',
    'Dreadful',
    'Troll',
    name='grades_enum'
)


student_subject_association = db.Table(
    'student_subject_association',
    db.Column('student_id', db.Integer, db.ForeignKey('students.id')),
    db.Column('subject_id', db.Integer, db.ForeignKey('subjects.id')),
    db.Column('grade', grades_enum)
)


class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    house_id = db.Column(db.Integer, db.ForeignKey('houses.id'))

    wand_id = db.Column(db.Integer, db.ForeignKey('wands.id'))
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'))

    house = db.relationship('House', backref='students')
    wand = db.relationship('Wand',  uselist=False)
    pet = db.relationship('Pet', uselist=False)

    __table_args__ = (
        ForeignKeyConstraint(['pet_id'], ['pets.id'], ondelete="CASCADE"),
        ForeignKeyConstraint(['wand_id'], ['wands.id'], ondelete="CASCADE"),
    )

    subjects = db.relationship(
        'Subject',
        secondary=student_subject_association,
        backref='students'
    )

    serialize_rules = ("-house.students", "-subjects.students")

    def __repr__(self):
        return f'<Student {self.name}>'


class Subject(db.Model, SerializerMixin):
    __tablename__ = 'subjects'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    def __repr__(self):
        return f'<Subject {self.name}>'


class House(db.Model, SerializerMixin):
    __tablename__ = 'houses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

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
