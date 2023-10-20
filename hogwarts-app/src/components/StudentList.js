// src/components/StudentList.js
import React, { useState, useEffect } from "react";
import "../App.css";
import { Formik, Field, Form } from "formik";

function StudentList() {
  // Sample student data (you can fetch this from your API)
  const sampleStudents = [
    // Sample student data
  ];

  //Grabbing student info from API
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/students")
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw r;
      })
      .then((students) => setStudents(students));
  }, []);

  // State for search filter
  const [searchTerm, setSearchTerm] = useState("");
  const filteredStudents = sampleStudents.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Number of Students: {filteredStudents.length}</h1>

      <input
        type="text"
        placeholder="Search Students"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="students-container">
        <h2>Students on Campus</h2>
        <div className="students-info">
          {students.map((student, index) => (
            <div key={index} className="student-info-card">
              <p>Name: {student.name}</p>
              <p>House: {student.house ? student.house.name : "Unknown"}</p>
              <p>Wand </p>
              <p> Wood: {student.wand ? student.wand.wood : "Unknown"}</p>
              <p> Core: {student.wand ? student.wand.core : "Unknown"}</p>
              <p> Length: {student.wand ? student.wand.length : "Unknown"}</p>
              {student.pet && (
                <div>
                  <p>Pet Name: {student.pet.name}</p>
                  <p>Pet Species: {student.pet.type}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="student-list">
        {filteredStudents.map((student) => (
          <div className="student-card" key={student.id}>
            <div className={`house-crest ${student.house.toLowerCase()}`}>
              {/* House Crest */}
            </div>
            <div className="student-details">
              <img
                src={student.profilePicture}
                alt={`${student.name}'s profile`}
              />
              <h2>{student.name}</h2>
              <p>House: {student.house}</p>
              <button>Details</button>
            </div>
          </div>
        ))}
      </div>

      <div className="about">
        <h2>About</h2>
        <p>Sample text about the Student List page and its functions.</p>
      </div>

      <div className="new-student-form">
        <h1>Student Registry</h1>
        <Formik
          initialValues={{
            name: "",
            house: "",
            pet: "", // Add an initial value for "pet"
          }}
          onSubmit={async (values) => {
            const response = await fetch("http://127.0.0.1:5555/students", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: values.name,
                house: values.house,
                pet: values.pet,
              }),
            });

            const data = await response.json();

            if (response.status === 201) {
              // Handle successful registration
              alert("Registration successful!");
            } else {
              // Handle errors
              alert(data.message || "Registration failed.");
            }
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <form className="form-border" onSubmit={handleSubmit}>
              <label htmlFor="name">Name:</label>
              <br />
              <input
                id="name"
                name="name"
                placeholder="Insert name here."
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <br />
              <label htmlFor="house">House:</label>
              <br />
              <Field
                as="select"
                name="house"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="" label="Select a house" />
                <option value="Gryffindor">Gryffindor</option>
                <option value="Hufflepuff">Hufflepuff</option>
                <option value="Ravenclaw">Ravenclaw</option>
                <option value="Slytherin">Slytherin</option>
              </Field>
              <br />
              <label htmlFor="pet">Pet</label>
              <br />
              <input
                id="pet"
                name="pet"
                placeholder="Insert pet here."
                value={values.pet}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <br />
              <button type="submit">Submit</button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default StudentList;
