# Standard library imports

# Remote library imports
from flask import Flask, request, make_response
from flask_restful import Resource, Api
from flask_migrate import Migrate
import os

# Local imports
from config import app, db, api
# Add your model imports
from models import House, Wand, Pet, Student, Subject, student_subject_association


@app.route('/')
def index():
    return '<h1>Project Server</h1>'


class Houses(Resource):
    def get(self):
        houses = [house.to_dict() for house in House.query.all()]
        return make_response(houses, 200)


api.add_resource(Houses, '/houses')


class Students(Resource):
    def get(self):
        students = [student.to_dict()
                    for student in Student.query.all()]
        return make_response(students, 200)

    def post(self):
        student_data = request.get_json()
        try:
            house_name = student_data.get('house', '').strip()
            house = House.query.filter_by(name=house_name).first()
            if not house:
                house = House(name=house_name)
                db.session.add(house)
                db.session.commit()

            # Create a new Pet instance and add it to the database
            new_pet = Pet(
                name=student_data["petName"],
                type=student_data["petSpecies"]
            )
            db.session.add(new_pet)

            # Create a new Wand instance and add it to the database
            new_wand = Wand(
                wood=student_data["wood"],
                core=student_data["core"],
                length=student_data["length"]
            )
            db.session.add(new_wand)

            # Create a new Student instance and associate it with House, Pet, and Wand
            new_student_data = Student(
                name=student_data["name"],
                house=house,
                pet=new_pet,
                wand=new_wand
            )
            db.session.add(new_student_data)
            db.session.commit()
            return make_response(new_student_data.to_dict(), 201)
        except ValueError as e:
            return make_response({"errors": ["validations"]}, 400)


api.add_resource(Students, '/students')


class Pets(Resource):
    def get(self):
        pets = [pet.to_dict() for pet in Pet.query.all()]
        return make_response(pets, 200)

    def post(self):
        pet_data = request.get_json()
        try:
            new_pet_data = Pet(**pet_data)
        except ValueError as e:
            return make_response({"errors": ["validations"]}, 400)
        db.session.add(new_pet_data)
        db.session.commit()
        return make_response(new_pet_data.to_dict(), 200)


api.add_resource(Pets, '/pets')


class Wands(Resource):
    def get(self):
        wands = [wand.to_dict() for wand in Wand.query.all()]
        return make_response(wands, 200)

    def post(self):
        wand_data = request.get_json()
        try:
            new_wand_data = Wand(**wand_data)
        except ValueError as e:
            return make_response({"errors": ["validations"]}, 400)
        db.session.add(new_wand_data)
        db.session.commit()
        return make_response(new_wand_data.to_dict(), 200)


api.add_resource(Wands, '/wands')


class StudentById(Resource):
    def get(self, id):
        student = Student.query.get(id)
        if not student:
            return make_response({"errors": "Student not found."})
        return make_response(student.to_dict(), 200)

    def delete(self, id):
        student = Student.query.get(id)
        if not student:
            return make_response({"error": "Student not found."})
        db.session.delete(student)
        db.session.commit()
        return ("", 204)

    def patch(self, id):
        student = Student.query.get(id)
        student_data = request.get_json()
        if not student:
            return make_response({"error": "Student not found."}, 404)

        if 'name' in student_data:
            student.name = student_data['name']

        if 'house' in student_data:

            house = House.query.filter_by(name=student_data['house']).first()
            if house:
                student.house = house
            else:
                return make_response({"error": "House not found."}, 404)

        if 'wood' in student_data:
            student.wand.wood = student_data['wood']

        if 'core' in student_data:
            student.wand.core = student_data['core']

        if 'length' in student_data:
            student.wand.length = student_data['length']

        if 'petName' in student_data:
            student.pet.name = student_data['petName']

        if 'petSpecies' in student_data:
            student.pet.type = student_data['petSpecies']

        db.session.commit()
        return make_response(student.to_dict(), 200)


api.add_resource(StudentById, '/students/<int:id>')


class Subjects(Resource):
    def get(self):
        subjects = [subject.to_dict() for subject in Subject.query.all()]
        return make_response(subjects, 200)

    def post(self):
        subject_data = request.get_json()
        try:
            new_subject_data = Subject(**subject_data)
        except ValueError as e:
            return make_response({"errors": ["validations"]}, 400)
        db.session.add(new_subject_data)
        db.session.commit()
        return make_response(new_subject_data.to_dict(), 200)


api.add_resource(Subjects, '/subjects')


class SubjectsList(Resource):
    def get(self):
        subjects = Subject.query.all()
        subject_data = [{'id': subject.id, 'name': subject.name}
                        for subject in subjects]
        return make_response(subject_data, 200)


api.add_resource(SubjectsList, '/subjectlist')


class Grades(Resource):

    def post(self):
        grade_data = request.get_json()
        try:
            student_id = grade_data.get('student_id')
            subject_id = grade_data.get('subject_id')
            grade = grade_data.get('grade')

            valid_grades = ["Outstanding", "Exceeds Expectations",
                            "Acceptable", "Poor", "Dreadful", "Troll"]

            if grade not in valid_grades:
                return {'error': 'Invalid grade value'}, 400

            db.session.execute(student_subject_association.insert().values(
                student_id=student_id,
                subject_id=subject_id,
                grade=grade
            ))
            db.session.commit()
            return {'message': 'Grade inserted successfully'}, 200

        except Exception as e:
            return {'error': 'Invalid data format or other error'}, 400


api.add_resource(Grades, '/grades')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
