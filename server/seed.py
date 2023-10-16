#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, House, Wand, Pet, Student

# if __name__ == '__main__':
#     fake = Faker()
#     with app.app_context():
#         print("Starting seed...")
#         # Seed code goes here!
with app.app_context():
    print("Deleting data...")
    House.query.delete()
    Wand.query.delete()
    Pet.query.delete()
    Student.query.delete()

    print("Creating Houses...")
    gryffindor = House(name="Gryffindor")
    slytherin = House(name="Slytherin")
    hufflepuff = House(name="Hufflepuff")
    ravenclaw = House(name="Ravenclaw")

    houses = [gryffindor, slytherin, hufflepuff, ravenclaw]

    print("Creating Wands...")
    w1 = Wand(wood="Holly", core="Phoenix Feather", length=11)
    w2 = Wand(wood="Willow", core="Unicore Hair", length=14)

    wands = [w1, w2]

    print("Creating Pets...")
    p1 = Pet(name="Hedwig", type="owl")
    p2 = Pet(name="Pigwidgeon", type="owl")

    pets = [p1, p2]

    print("Creating Students...")
    s1 = Student(name="Harry Potter", house=gryffindor, wand=w1, pet=p1)
    s2 = Student(name="Ron Weasley", house=gryffindor, wand=w2, pet=p2)
    students = [s1, s2]

    db.session.add_all(houses)
    db.session.add_all(wands)
    db.session.add_all(pets)
    db.session.add_all(students)
    db.session.commit()

    print("Seeding done!")
