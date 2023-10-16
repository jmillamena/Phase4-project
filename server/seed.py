#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, House, Year, Wand, Pet, Student, Subject

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
    Subject.query.delete()
    Year.query.delete()

    print("Creating Houses...")
    gryffindor = House(name="Gryffindor")
    slytherin = House(name="Slytherin")
    hufflepuff = House(name="Hufflepuff")
    ravenclaw = House(name="Ravenclaw")

    houses = [gryffindor, slytherin, hufflepuff, ravenclaw]

    print("Creating Years...")
    first = Year(year=1)
    second = Year(year=2)
    third = Year(year=3)
    fourth = Year(year=4)
    fifth = Year(year=5)
    sixth = Year(year=6)
    seventh = Year(year=7)

    years = [first, second, third, fourth, fifth, sixth, seventh]

    print("Creating Wands...")
    w1 = Wand(wood="Holly", core="Phoenix Feather", length=11)
    w2 = Wand(wood="Willow", core="Unicorn Hair", length=14)
    w3 = Wand(wood="Alder", core="Unicorn Hair", length=13)
    w4 = Wand(wood="Hawthorn", core="Unicorn Hair", length=10)
    w5 = Wand(wood="Acacia", core="Unicorn Hair", length=13)

    wands = [w1, w2, w3, w4, w5]

    print("Creating Pets...")
    p1 = Pet(name="Hedwig", type="Owl")
    p2 = Pet(name="Pigwidgeon", type="Owl")
    p3 = Pet(name="Illari", type="Owl")
    p4 = Pet(name="Ulyssess", type="Owl")

    pets = [p1, p2, p3, p4]

    print("Creating Subjects...")
    transfig = Subject(subject="Transfiguration")
    charms = Subject(subject="Charms")
    potions = Subject(subject="Potions")
    hom = Subject(subject="History of Magic")
    dada = Subject(subject="Defence Against the Dark Arts")
    astro = Subject(subject="Astronomy")
    herb = Subject(subject="Herbology")
    fly = Subject(subject="Flying")

    subjects = [transfig, charms, potions, hom, dada, astro, herb, fly]

    print("Creating Students...")
    s1 = Student(name="Harry Potter", house=gryffindor,
                 year=third, wand=w1, pet=p1)
    s1.subjects = [fly, herb, charms, potions, dada]
    s2 = Student(name="Ron Weasley", house=gryffindor,
                 year=third, wand=w2, pet=p2)
    s2.subjects = [potions, hom, charms, dada]
    s3 = Student(name="Oliver Scamander",
                 house=gryffindor, year=fourth, wand=w3, pet=p3)
    s3.subjects = [fly, potions, charms, transfig, astro]
    s4 = Student(name="Draco Malfoy", house=slytherin,
                 year=third, wand=w4, pet=p4)
    s4.subjects = [fly, charms, potions, astro, dada]
    s5 = Student(name="Luna Lovegood", house=ravenclaw,
                 year=third, wand=w5)
    s5.subjects = [charms, hom, dada, herb, astro]

    students = [s1, s2, s3, s4, s5]

    db.session.add_all(houses)
    db.session.add_all(wands)
    db.session.add_all(pets)
    db.session.add_all(students)
    db.session.add_all(subjects)
    db.session.add_all(years)
    db.session.commit()

    print("Seeding done!")
