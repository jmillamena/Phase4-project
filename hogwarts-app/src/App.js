// App.js
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your components here
import Home from "./components/Home";
import StudentList from "./components/StudentList";
import HogwartsHouse from "./components/HogwartsHouse";
import MagicalCreatures from "./components/MagicalCreatures";
import Navbar from "./components/Navbar";

function App() {
  // const [data, setData] = useState(null);
  // // code for adding a GET request to the Flask API endpoint
  // useEffect(() => {
  //   fetch("http://127.0.0.1:5555/wands")
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       setData(responseData);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-list" element={<StudentList />} />
        <Route path="/hogwarts-house" element={<HogwartsHouse />} />
        <Route path="/magical-creatures" element={<MagicalCreatures />} />
      </Routes>
    </Router>
  );
}

export default App;
