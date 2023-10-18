// src/components/HomePage.js
import React from "react";
import HouseCard from "./HouseCard";

function Home() {

  const houses = [
    {
      name: "Gryffindor",
      emblem: "https://i.pinimg.com/originals/5e/89/88/5e89889df44a4a0782851eba00012434.png",
      founder: "Godric Gryffindor",
      traits: ["Bravery", "Chivalry", "Courage"],
    },
    {
      name: "Hufflepuff",
      emblem: "/path/to/hufflepuff.png",
      founder: "Helga Hufflepuff",
      traits: ["Hard work", "Loyalty", "Fair play"],
    },
    {
      name: "Ravenclaw",
      emblem: "/path/to/ravenclaw.png",
      founder: "Rowena Ravenclaw",
      traits: ["Intelligence", "Wit", "Wisdom"],
    },
    {
      name: "Slytherin",
      emblem: "https://i.pinimg.com/originals/eb/74/a4/eb74a45a16792919d780d8406ad9c8c5.png",
      founder: "Salazar Slytherin",
      traits: ["Ambition", "Cunning", "Resourcefulness"],
    },
    // Add the other houses here...
  ];



  return (




    
    <div className="home-container">
      

      <h2 class="title-ue">Upcoming Events</h2>
      <p class="event-1">Sample Event 1</p>
      <p class="event-2">Sample Event 2</p>
      <h2 class="hpl">House Points Leaderboard</h2>
      <div className="housecardcontainer">
      {houses.map((house, index) => (
      <HouseCard key={index} {...house} />
      ))}
      </div>
      
      
  
    </div>
  );
}

export default Home;
