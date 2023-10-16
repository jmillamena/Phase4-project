// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your components here
import Home from "./components/Home";
import StudentList from "./components/StudentList";
import HogwartsHouse from "./components/HogwartsHouse";
import MagicalCreatures from "./components/MagicalCreatures";
import Navbar from "./components/Navbar";
function App() {
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
