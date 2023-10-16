// src/components/HogwartsHouse.js
import React from 'react';

function HogwartsHouse() {
  // Sample data for Hogwarts houses (you can fetch this from your API)
  const sampleHouses = [
    // Sample house data
  ];

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

      <div className="house-cards">
        {sampleHouses.map((house, index) => (
          <div className="house-card" key={index}>
            <div className="house-header">
              <h2>{house.name}</h2>
              <div className={`house-crest ${house.name.toLowerCase()}`}>
                {/* House Crest */}
              </div>
              <p>Active Students: {house.activeStudents}</p>
            </div>
            <div className="house-info">
              <h3>House Info:</h3>
              <p>House Founder: {house.founder}</p>
              <p>House Traits: {house.traits}</p>
              <p>House Location: {house.location}</p>
              <p>House Head: {house.head}</p>
              <p>House Item: {house.item}</p>
              <p>Famous Alumni: {house.famousAlumni}</p>
              <p>Prefect: {house.prefect}</p>
              <p>Mascot: {house.mascot}</p>
            </div>
            <div className="house-ghosts">
              <h3>House Ghosts:</h3>
              {house.ghosts.map((ghost, ghostIndex) => (
                <div key={ghostIndex}>
                  <p>Name: {ghost.name}</p>
                  <p>About: {ghost.about}</p>
                </div>
              ))}
            </div>
            <div className="upcoming-events">
              <h3>Upcoming Events:</h3>
              <p>{house.upcomingEvents}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HogwartsHouse;
