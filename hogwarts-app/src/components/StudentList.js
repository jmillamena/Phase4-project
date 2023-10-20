// src/components/StudentList.js
import React, { useState, useEffect } from "react";
import "../App.css";
import { Formik, Field, Form } from "formik";
import Button from "react-bootstrap/Button";

function StudentList() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);

  // Function to open the edit form
  const openEditForm = (student) => {
    setIsEditing(true);
    setEditedStudent(student);
  };

  // Function to close the edit form
  const closeEditForm = () => {
    setIsEditing(false);
    setEditedStudent(null);
  };

  const handleEditStudent = async (editedData) => {
    // You can make an API request to update the student data here
    // Update the student data in your state or API
    // Make sure to handle success and error cases

    // After updating, close the edit form
    closeEditForm();
  };

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

  //deleting student from DB

  const handleDeleteStudent = (studentId) => {
    fetch(`http://127.0.0.1:5555/students/${studentId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          // Remove the deleted student from the state
          setStudents((prevStudents) =>
            prevStudents.filter((student) => student.id !== studentId)
          );
        }
      })
      .catch((error) => {
        console.error("Error deleting student: ", error);
      });
  };

  // State for search filter
  const [searchTerm, setSearchTerm] = useState("");
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Number of Students: {students.length}</h1>
      <input
        type="text"
        placeholder="Search Students"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="about">
        <h2 className="heading-about">About</h2>
        <p className="about-house">
          Welcome to the Hogwarts Students List In the hallowed halls of
          Hogwarts School of Witchcraft and Wizardry, young witches and wizards
          from all corners of the wizarding world come together to embark on a
          magical journey. Each student brings their unique talents,
          backgrounds, and aspirations to this enchanted institution, creating a
          diverse tapestry of personalities and abilities. The "Hogwarts
          Students List" is your gateway to explore the vibrant student
          community at Hogwarts. Here, you'll find a comprehensive collection of
          information about the students who call this mystical castle their
          home. From the courageous and chivalrous Gryffindors to the studious
          and wise Ravenclaws, from the loyal Hufflepuffs to the cunning
          Slytherins, the students of Hogwarts represent the future of the
          wizarding world. Delve into the profiles of these remarkable young
          witches and wizards, learning about their backgrounds, achievements,
          and the magical qualities that define their characters. Discover the
          friendships, rivalries, and adventures that make their time at
          Hogwarts truly unforgettable. Whether you're a lifelong fan of the
          wizarding world or a newcomer just setting foot in Diagon Alley, this
          page invites you to immerse yourself in the enchanting lore of
          Hogwarts and its extraordinary students.
        </p>
      </div>
      <div className="students-container">
        <h2>Students on Campus</h2>
        <div className="students-list">
          {filteredStudents.map((student, index) => (
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
              <button onClick={() => handleDeleteStudent(student.id)}>
                Delete
              </button>
              <button onClick={() => openEditForm(student)}>Edit</button>
            </div>
          ))}
        </div>
      </div>

      <div className="new-student-form">
        <h1 className="heading-about">Student Registry</h1>
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
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <Form className="form-border">
              <label htmlFor="name" className="form-labels">
                Name:{" "}
              </label>
              <br />
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
              <label htmlFor="house" className="form-labels">
                House:{" "}
              </label>
              <br />
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
              <label htmlFor="wand" className="form-labels">
                Wand
              </label>
              <br />
              <label htmlFor="wood">Wood: </label>
              <br />
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
              <br />
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
              <br />
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
              <label htmlFor="pet" className="form-labels">
                Pet
              </label>
              <br />
              <label htmlFor="petName">Name: </label>
              <br />
              <input
                id="petName"
                name="petName"
                placeholder="Enter pet name..."
                value={values.petName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <br />
              <label htmlFor="petSpecies">Species: </label>
              <br />
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default StudentList;
