// src/components/HomePage.js
import React from "react";
import HouseCard from "./HouseCard";
import EventCard from "./EventCard"; 



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
      emblem: "https://cdn11.bigcommerce.com/s-ydriczk/products/88364/images/91134/Harry-Potter-Hufflepuff-Crest-Official-wall-mounted-cardboard-cutout-buy-now-at-star__21122.1507644096.450.659.jpg?c=2",
      founder: "Helga Hufflepuff",
      traits: ["Hard work", "Loyalty", "Fair play"],
    },
    {
      name: "Ravenclaw",
      emblem: "https://i.pinimg.com/1200x/b1/52/d8/b152d8c930aeb6412dd3b44081cccb80.jpg",
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

  const upcomingEvents = [
    {
      eventName: "Dragon Days: A Tribute to Magical Beasts",
      date: "April 12th",
      location: "Hogwarts School of Witchcraft and Wizardry, Forbidden Forest Clearing",
      description:
        "Dragon Days is an annual event held at Hogwarts, dedicated to celebrating the wonder and majesty of magical creatures, with a special emphasis on dragons. The event is organized by the Care of Magical Creatures Club and welcomes students and professors alike to explore the incredible world of these mythical beasts.",
    },
    {
      eventName: "The Great Potion Palooza",
      date: "November 15th",
      location: "Hogwarts School of Witchcraft and Wizardry, Potions Classroom",
      description:
        "The Great Potion Palooza is an enchanting annual event held at Hogwarts, celebrating the art and science of potion-making. It is organized by the Hogwarts Potions Club and is open to all students, from first years to seventh years.",
    },
    // Add more upcoming events here...
  ];


  return (




    
    <div className="home-container">
      

      <h2 className="title-ue">Upcoming Events</h2>
      <div className="eventcards">
      {upcomingEvents.map((event, index) => (
        <EventCard key={index} {...event} />
      ))}
</div>
      

      <h2 className="hpl"></h2>
      <div className="housecardcontainer">
      {houses.map((house, index) => (
      <HouseCard key={index} {...house} />
      ))}
      </div>
      
      
  
    </div>
  );
}

export default Home;
