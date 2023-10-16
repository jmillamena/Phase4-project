// src/components/StudentList.js
import React, { useState } from "react";

function StudentList() {
  // Sample student data (you can fetch this from your API)
  const sampleStudents = [
    // Sample student data
  ];

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
        <h2>New Student Registry</h2>
        <form>
          <input type="text" placeholder="Name" />
          <select>
            <option value="Gryffindor">Gryffindor</option>
            <option value="Hufflepuff">Hufflepuff</option>
            <option value="Ravenclaw">Ravenclaw</option>
            <option value="Slytherin">Slytherin</option>
          </select>
          <textarea placeholder="About Me"></textarea>
          <div className="wand-fields">
            <input type="text" placeholder="Wood" />
            <input type="text" placeholder="Core" />
            <input type="text" placeholder="Length" />
          </div>
          <div className="pet-fields">
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Species" />
          </div>
          <button>Add Student</button>
        </form>
      </div>
    </div>
  );
}

export default StudentList;
