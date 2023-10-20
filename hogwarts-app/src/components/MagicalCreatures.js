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
        <p>"Right, now listen up, all of you! Caring for magical creatures and pets ain't nothin' to take lightly.<p></p> They deserve all the love and care you can give 'em, just like any of us. Here's some advice from me heart to yours:<p></p>

Feed 'Em Right: Make sure you're feedin' your creatures the right food. Hippogriffs love a good bit o' ferret, but don't try it with a Niffler. Yer'll lose your shiny things, I guarantee it!
<p></p>
Shelter from the Storm: Give 'em a warm and cozy home. Hippogriffs need a nice paddock, while a Fwooper might prefer a colorful cage with plenty of space.
<p></p>
Lots of Love: Magical creatures need love just as much as we do. Spend time with 'em, talk to 'em, and give 'em a good scratch behind the ears or tentacles, depending on the creature.
<p></p>
Respect Their Nature: Understand your creature's nature. Some like to play, others like to hide. A Thestral may be a bit spooky, but they're loyal and gentle creatures.
<p></p>
Groomin' Time: Keep 'em clean and well-groomed. Brush the fur of a Crup, keep a Kneazle's coat shiny, and never forget to water your Mandrakes (but wear earplugs when you do).
<p></p>
Study Up: Read about your magical creatures. There's plenty of books in the Hogwarts library to help you understand 'em better. Knowledge is power, remember!
<p></p>
Mind the Danger: Some creatures can be dangerous, so be extra careful. Manticores, Blast-Ended Skrewts, and Hungarian Horntails should be left to the professionals.
<p></p>
Don't Spook 'Em: Be gentle when you're handlin' magical creatures. Remember, they've got feelings too. Thestrals, for example, can sense your emotions.
<p></p>
Vet Check: Keep an eye on their health. Find a good magical creature vet who can help when your pets are feelin' under the weather.
<p></p>
Share the Magic: And last but not least, share the magic! Magical creatures bring joy and wonder to our world, so don't be afraid to share 'em with your friends and family. Just be sure to introduce 'em properly.
<p></p>
Remember, look after your creatures and pets, and they'll be loyal to you forever. That's the Hagrid way, it is!"</p>

        {/* Add advice from Hagrid on caring for pets */}
      </div>

      <div className="dangerous-creatures">
        <h2>Dangerous Creatures</h2>
        <p>Warning to All Students

Dear Students,

We wish to inform you of recent sightings of dangerous magical creatures near the school grounds. Your safety is of paramount importance, and we urge you to exercise caution and adhere to the guidelines provided by the school.</p>
        {/* Add information about dangerous creatures */}
      </div>
    </div>
  );
}

export default MagicalCreatures;
