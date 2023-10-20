// src/components/StudentList.js
import React, { useState, useEffect } from "react";
import "../App.css";
import { Formik, Field, Form } from "formik";
import Button from "react-bootstrap/Button";

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
            wood: "",
            core: "",
            length: "",
            petName: "",
            petSpecies: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            const response = await fetch("http://127.0.0.1:5555/students", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: values.name,
                house: values.house,
                wood: values.wood,
                core: values.core,
                length: values.length,
                petName: values.petName,
                petSpecies: values.petSpecies,
              }),
            });

            const data = await response.json();

            if (response.status === 201) {
              // Handle successful registration
              alert("Registration successful!");
              resetForm();
            } else {
              // Handle errors
              alert(data.message || "Registration failed.");
            }
          }}
        >
          <Form className="form-border">
            <br />
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <form className="form-border" onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Enter name..."
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <br />
                <br />
                <label htmlFor="house">House: </label>
                <Field
                  as="select"
                  name="house"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="" label="Select a House" />
                  <option value="Gryffindor">Gryffindor</option>
                  <option value="Hufflepuff">Hufflepuff</option>
                  <option value="Ravenclaw">Ravenclaw</option>
                  <option value="Slytherin">Slytherin</option>
                </Field>
                <br />
                <br />
                <label htmlFor="wand">Wand</label>
                <br />
                <label htmlFor="wood">Wood: </label>
                <input
                  id="wood"
                  name="wood"
                  placeholder="Enter wood type..."
                  value={values.wood}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <br />
                <label htmlFor="core">Core: </label>
                <Field
                  as="select"
                  name="core"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="" label="Select a Core" />
                  <option value="Unicorn Hair">Unicorn Hair</option>
                  <option value="Dragon Heartstring">Dragon Heartstring</option>
                  <option value="Phoenix Feather">Phoenix Feather</option>
                </Field>
                <br />
                <label htmlFor="length">Length: </label>
                <input
                  id="length"
                  name="length"
                  placeholder="Enter wand length..."
                  value={values.length}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <br />
                <br />
                <label htmlFor="pet">Pet</label>
                <br />
                <label htmlFor="petName">Name: </label>
                <input
                  id="petName"
                  name="petName"
                  placeholder="Insert pet name here."
                  value={values.petName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <br />
                <label htmlFor="petSpecies">Species: </label>
                <Field
                  as="select"
                  name="petSpecies"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="" label="Select a Pet" />
                  <option value="Owl">Owl</option>
                  <option value="Cat">Cat</option>
                  <option value="Toad">Toad</option>
                </Field>
                <br />
                <br />
                <Button variant="primary" type="submit" className="form-button">
                  Register
                </Button>
              </form>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default StudentList;
