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
        <p>
          Hogwarts School of Witchcraft and Wizardry is not just a place for
          young witches and wizards to hone their magical skills; it's also a
          sanctuary for an astonishing array of magical creatures that inhabit
          its grounds, its Forbidden Forest, and the surrounding areas. From the
          majestic to the mysterious, the world of Hogwarts is a haven for an
          incredible variety of magical beings. The "Magical Creatures at
          Hogwarts" page invites you to embark on a fantastical journey through
          the wondrous and diverse wildlife of the wizarding world. Here, you'll
          uncover the secrets of creatures that soar through the skies, lurk in
          the shadows, and roam the magical landscapes. Whether it's the noble
          Hippogriff, the mischievous Niffler, the elusive Thestral, or the
          enigmatic centaurs, the pages within this collection will introduce
          you to these remarkable beings and their place in the rich tapestry of
          Hogwarts. As you delve into the profiles of these enchanting
          creatures, you'll gain insight into their origins, characteristics,
          and the magical properties that make them an integral part of the
          Hogwarts experience. Whether you're a devoted magizoologist or a
          casual enthusiast, this page offers a gateway to the captivating and
          often awe-inspiring realm of magical creatures that call Hogwarts
          their home. Prepare to be enthralled, enchanted, and educated as you
          explore this repository of knowledge and appreciation for the
          extraordinary beings that inhabit the wizarding world.
        </p>
      </div>

      <div className="pet-about">
        <h2>Types of Pets</h2>
        <h3>Cats</h3>
        <p>
          Cats are known for their loyalty and can provide great companionship
          to their owners. Cats are relatively independent pets and don't
          require constant attention. They are well-suited for students with
          busy schedules. Some magical cat breeds, like the Maine Coon or the
          Kneazle, possess special abilities or traits that can be helpful in
          various magical tasks. Cats have a natural instinct to catch small
          creatures, making them effective pest controllers around the castle.
        </p>
        <h3>Owls</h3>
        <p>
          Owls are commonly used for delivering letters and packages, which is a
          crucial means of communication in the wizarding world. Owls can
          reliably send and receive messages for students.Owls are highly
          intelligent birds, making them easy to train for specific tasks. They
          are also capable of finding people and objects, which can be extremely
          useful.Owls are often associated with wisdom and knowledge, reflecting
          positively on their owners.
        </p>
        <h3>Toads</h3>
        <p>
          Toads are relatively low-maintenance pets and require less attention
          than cats or owls. They are easy to care for and can be a good choice
          for students who prefer a straightforward pet.Toads are often used in
          potion-making, and some breeds have magical properties that make them
          valuable for certain potions and spells.Toads come in various shapes
          and sizes, and their unique appearance can make them stand out as
          magical companions.
        </p>
        <br />
        <p>
          Each of these pets has its own unique qualities, and the choice
          ultimately depends on the personality and preferences of the student.
          Whether you opt for a cat, owl, or toad, the bond formed with your
          magical pet can be a cherished part of your Hogwarts experience.
        </p>
      </div>

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
