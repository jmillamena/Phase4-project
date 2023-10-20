#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, House, Wand, Pet, Student, Subject, student_subject_association

with app.app_context():
    print("Deleting data...")
    House.query.delete()
    Wand.query.delete()
    Pet.query.delete()
    Student.query.delete()
    Subject.query.delete()

    print("Creating Houses...")
    gryffindor = House(name="Gryffindor")
    slytherin = House(name="Slytherin")
    hufflepuff = House(name="Hufflepuff")
    ravenclaw = House(name="Ravenclaw")

    houses = [gryffindor, slytherin, hufflepuff, ravenclaw]

    print("Creating Wands...")
    w1 = Wand(wood="Holly", core="Phoenix Feather", length=11)
    w2 = Wand(wood="Willow", core="Unicorn Hair", length=14)
    w3 = Wand(wood="Alder", core="Unicorn Hair", length=13)
    w4 = Wand(wood="Hawthorn", core="Unicorn Hair", length=10)
    w5 = Wand(wood="Acacia", core="Unicorn Hair", length=13)
    w6 = Wand(wood="Ash", core="Unicorn Hair", length=12.25)

    wands = [w1, w2, w3, w4, w5, w6]

    print("Creating Pets...")
    p1 = Pet(name="Hedwig", type="Owl")
    p2 = Pet(name="Pigwidgeon", type="Owl")
    p3 = Pet(name="Illari", type="Owl")
    p4 = Pet(name="Ulyssess", type="Owl")

    pets = [p1, p2, p3, p4]

    print("Creating Subjects...")
    transfig = Subject(name="Transfiguration")
    charms = Subject(name="Charms")
    potions = Subject(name="Potions")
    hom = Subject(name="History of Magic")
    dada = Subject(name="Defence Against the Dark Arts")
    astro = Subject(name="Astronomy")
    herb = Subject(name="Herbology")
    fly = Subject(name="Flying")

    subjects = [transfig, charms, potions, hom, dada, astro, herb, fly]

    print("Creating Students...")
    s1 = Student(name="Harry Potter", house=gryffindor, wand=w1, pet=p1)
    s2 = Student(name="Ron Weasley", house=gryffindor, wand=w2, pet=p2)
    s3 = Student(name="Oliver Scamander", house=gryffindor, wand=w3, pet=p3)
    s4 = Student(name="Draco Malfoy", house=slytherin, wand=w4, pet=p4)
    s5 = Student(name="Luna Lovegood", house=ravenclaw, wand=w5)
    s6 = Student(name="Cedric Diggory", house=hufflepuff, wand=w6)

    students = [s1, s2, s3, s4, s5, s6]

    students_with_subjects_and_grades = [
        (s1, [(fly, "Outstanding"), (herb, "Acceptable"), (charms,
         "Acceptable"), (potions, "Acceptable"), (dada, "Outstanding")]),
        (s2, [(potions, "Acceptable"), (hom, "Acceptable"),
         (charms, "Acceptable"), (dada, "Acceptable")]),
        (s3, [(fly, "Acceptable"), (potions, "Exceeds Expectations"),
         (charms, "Outstanding"), (transfig, "Acceptable"), (astro, "Troll")]),
        (s4, [(fly, "Exceeds Expectations"), (charms, "Exceeds Expectations"),
         (potions, "Outstanding"), (astro, "Acceptable"), (dada, "Exceeds Expectations")]),
        (s5, [(charms, "Exceeds Expectations"), (hom, "Exceeds Expectations"),
         (dada, "Exceeds Expectations"), (herb, "Outstanding"), (astro, "Outstanding")]),
        (s6, [(fly, "Outstanding"), (charms, "Exceeds Expectations"),
         (dada, "Exceeds Expectations"), (transfig, "Acceptable")])
    ]

    db.session.add_all(houses)
    db.session.add_all(wands)
    db.session.add_all(pets)
    db.session.add_all(students)
    db.session.add_all(subjects)

    # Create and execute the insert statements for grades
    grades_data = [
        {"grade": "Outstanding"},
        {"grade": "Exceeds Expectations"},
        {"grade": "Acceptable"},
        {"grade": "Poor"},
        {"grade": "Dreadful"},
        {"grade": "Troll"},
    ]
    for data in grades_data:
        db.session.execute(student_subject_association.insert().values(**data))

    # Commit the session to save the changes to the database
    db.session.commit()

    for student, subjects_with_grades in students_with_subjects_and_grades:
        student_record = Student.query.filter_by(name=student.name).first()
        if student_record:
            print(f"Associating subjects and grades for {student_record.name}")

            for subject, grade in subjects_with_grades:
                subject_name = subject.name
                subject_record = Subject.query.filter_by(
                    name=subject_name).first()
                if subject_record:
                    db.session.execute(student_subject_association.insert().values(
                        student_id=student_record.id,
                        subject_id=subject_record.id,
                        grade=grade
                    ))
                else:
                    print(f"Subject {subject_name} not found")
        else:
            print(f"Student {student.name} not found")

    db.session.commit()

    print("Seeding done!")
