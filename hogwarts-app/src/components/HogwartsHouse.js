import React, { useState } from "react";
import "../App.css";

const hardCodedHouses = [
  {
    id: 1,
    name: "Gryffindor",
    founder: "Godric Gryffindor",
    values: "Bravery, courage, chivalry",
    commonRoom: "Gryffindor Tower",
  },
  {
    id: 2,
    name: "Hufflepuff",
    founder: "Helga Hufflepuff",
    values: "Hard work, patience, loyalty",
    commonRoom: "Hufflepuff Basement",
  },
  {
    id: 3,
    name: "Ravenclaw",
    founder: "Rowena Ravenclaw",
    values: "Intelligence, creativity, wisdom",
    commonRoom: "Ravenclaw Tower",
  },
  {
    id: 4,
    name: "Slytherin",
    founder: "Salazar Slytherin",
    values: "Ambition, cunning, leadership",
    commonRoom: "Slytherin Dungeon",
  },
];

function HogwartsHouse() {
  const [selectedHouse, setSelectedHouse] = useState(null);

  const handleHouseClick = (house) => {
    setSelectedHouse(house);
  };

  return (
    <div className="container">
      <div className="about">
        <h2 className="heading-about">About</h2>
        <p className="about-house">
          Welcome to the enchanting world of Hogwarts School of Witchcraft and
          Wizardry! If you're here, it means the Sorting Hat has placed you into
          one of the four esteemed houses: Gryffindor, Hufflepuff, Ravenclaw, or
          Slytherin. Congratulations on beginning your magical journey! This
          page is your gateway to discovering the unique qualities, values, and
          history of each house. Whether you're a brave Gryffindor, a loyal
          Hufflepuff, a wise Ravenclaw, or a cunning Slytherin, here is where
          you'll find all the information you need to better understand your
          house and the adventures that await you within its hallowed walls. So,
          let's dive into the magic and mystique of Hogwarts houses and uncover
          what makes your chosen house so special.
        </p>
      </div>

      <h2 className="heading-about">Hogwarts Houses</h2>
      <div className="house-info">
        {hardCodedHouses.map((house) => (
          <div key={house.id}>
            <p
              onClick={() => handleHouseClick(house)}
              className="house-name"
              style={{ cursor: "pointer" }}
            >
              {house.name}
            </p>
            {selectedHouse && selectedHouse.id === house.id && (
              <div className="about-house">
                <p>Founder: {house.founder}</p>
                <p>Values: {house.values}</p>
                <p>Common Room: {house.commonRoom}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HogwartsHouse;
