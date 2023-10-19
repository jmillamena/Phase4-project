// src/components/HogwartsHouse.js
import React, { useEffect, useState } from "react";

function HogwartsHouse() {
  // Sample data for Hogwarts houses (you can fetch this from your API)
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/houses")
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw r;
      })
      .then((houses) => setHouses(houses));
  }, []);

  return (
    <div className="container">
      <div className="about">
        <h2>About</h2>
        <p>Sample text about the Hogwarts House page.</p>
      </div>

      <div className="house-lore">
        <h2>House Lore</h2>
        {/* You can add lore content here */}
      </div>

      <div className="container">
        <h2>Hogwarts Houses</h2>
        <div className="house-info">
          {houses.map((house, index) => (
            <div key={index}>
              <p>Name: {house.name}</p>
              <p>Founder: {house.founder}</p>
              <p>House Traits: {house.traits}</p>
              <p>Location: {house.location}</p>
              <p>Head: {house.head}</p>
              <p>Item: {house.item}</p>
              <p>Famous Alumni: {house.famousAlumni}</p>
              <p>Prefect: {house.prefect}</p>
              <p>Mascot: {house.mascot}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HogwartsHouse;
