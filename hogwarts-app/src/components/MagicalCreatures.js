// src/components/MagicalCreatures.js
import React, { useState, useEffect } from "react";

function MagicalCreatures() {
  // Sample data for magical creatures (you can fetch this from your API)
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/pets")
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw r;
      })
      .then((pets) => setPets(pets));
  }, []);

  const sampleCreatures = [];

  return (
    <div className="container">
      <div className="about">
        <h2>About</h2>
        <p>Sample text about the Magical Creatures page.</p>
      </div>

      <h2>Types of Pets</h2>

      <div className="pet-container">
        <h2>Pets on Campus</h2>
        <div className="pet-info">
          {pets.map((pet, index) => (
            <div key={index}>
              <p>Pet Name: {pet.name}</p>
              <p>Type: {pet.type}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="creature-cards">
        {sampleCreatures.map((creature, index) => (
          <div className="creature-card" key={index}>
            <div className="creature-header">
              <h2>{creature.name}</h2>
              <img src={creature.image} alt={creature.name} />
              <p>Active Students: {creature.activeStudents}</p>
            </div>
            <div className="creature-info">
              <h3>Traits:</h3>
              <p>Caring for {creature.name}:</p>
              <ul>
                <li>Food: {creature.caring.food}</li>
                <li>Hygiene: {creature.caring.hygiene}</li>
                <li>Lodging: {creature.caring.lodging}</li>
              </ul>
              <h3>Pros:</h3>
              <p>{creature.pros}</p>
              <h3>Cons:</h3>
              <p>{creature.cons}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="creatures-spotted">
        <h2>Creatures Spotted</h2>
        {/* Add content about creatures spotted and where to find them */}
      </div>

      <div className="hagrid-says">
        <h2>Hagrid Says</h2>
        {/* Add advice from Hagrid on caring for pets */}
      </div>

      <div className="dangerous-creatures">
        <h2>Dangerous Creatures</h2>
        {/* Add information about dangerous creatures */}
      </div>
    </div>
  );
}

export default MagicalCreatures;
