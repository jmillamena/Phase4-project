// src/components/HomePage.js
import React from "react";

function Home() {
  return (
    <div className="home-container">
      

      <h2 class="title-ue">Upcoming Events</h2>
      <p class="event-1">Sample Event 1</p>
      <p class="event-2">Sample Event 2</p>
      <h2>House Points Leaderboard</h2>
      <div className="house-card">
        <h3>Gryffindor</h3>
        <p>Points: 100</p>
      </div>
      <div className="house-card">
        <h3>Hufflepuff</h3>
        <p>Points: 90</p>
      </div>
      <div className="house-card">
        <h3>Ravenclaw</h3>
        <p>Points: 110</p>
      </div>
      <div className="house-card">
        <h3>Slytherin</h3>
        <p>Points: 95</p>
      </div>
    </div>
  );
}

export default Home;
