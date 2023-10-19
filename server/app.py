# Standard library imports

# Remote library imports
from flask import Flask, request, make_response
from flask_restful import Resource, Api
from flask_migrate import Migrate
import os

# Local imports
from config import app, db, api
# Add your model imports
from models import House, Wand, Pet, Student


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


api.add_resource(Students, '/students')


class Pets(Resource):
    def get(self):
        pets = [pet.to_dict() for pet in Pet.query.all()]
        return make_response(pets, 200)


api.add_resource(Pets, '/pets')


class Wands(Resource):
    def get(self):
        wands = [wand.to_dict() for wand in Wand.query.all()]
        return make_response(wands, 200)


api.add_resource(Wands, '/wands')


class StudentById(Resource):
    def get(self, id):
        student = Student.query.get(id)
        if not student:
            return make_response({"errors": "Student not found."})
        return make_response(student.to_dict(), 200)


api.add_resource(StudentById, '/students/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
