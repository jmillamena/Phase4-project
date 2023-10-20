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
        <h2 className="heading-about">About</h2>
        <p className="about-house">
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
        <p className="about-house">
          Cats are known for their loyalty and can provide great companionship
          to their owners. Cats are relatively independent pets and don't
          require constant attention. They are well-suited for students with
          busy schedules. Some magical cat breeds, like the Maine Coon or the
          Kneazle, possess special abilities or traits that can be helpful in
          various magical tasks. Cats have a natural instinct to catch small
          creatures, making them effective pest controllers around the castle.
        </p>
        <h3>Owls</h3>
        <p className="about-house">
          Owls are commonly used for delivering letters and packages, which is a
          crucial means of communication in the wizarding world. Owls can
          reliably send and receive messages for students.Owls are highly
          intelligent birds, making them easy to train for specific tasks. They
          are also capable of finding people and objects, which can be extremely
          useful.Owls are often associated with wisdom and knowledge, reflecting
          positively on their owners.
        </p>
        <h3>Toads</h3>
        <p className="about-house">
          Toads are relatively low-maintenance pets and require less attention
          than cats or owls. They are easy to care for and can be a good choice
          for students who prefer a straightforward pet.Toads are often used in
          potion-making, and some breeds have magical properties that make them
          valuable for certain potions and spells.Toads come in various shapes
          and sizes, and their unique appearance can make them stand out as
          magical companions.
        </p>
        <br />
        <p className="about-house">
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
            <div className="about-house" key={index}>
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
        <h2 className="heading-about">Creatures Spotted</h2>
        <p className="about-house"> "While exploring the Forbidden Forest, I encountered a mischievous Hinkypunk. It had one leg and carried a lantern, trying to lead us off the path. We quickly realized it was up to no good." -Anonymous</p>
        {/* Add content about creatures spotted and where to find them */}
      </div>

      <div className="hagrid-says">
        <h2 className="heading-about">Hagrid Says</h2>
        <p className="about-house">"Right, now listen up, all of you! Caring for magical creatures and pets ain't nothin' to take lightly. They deserve all the love and care you can give 'em, just like any of us. Here's some advice from me heart to yours:
<p></p>
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
        {/* <h2>Dangerous Creatures</h2> */}
        {/* Add information about dangerous creatures */}
      </div>
    </div>
  );
}

export default MagicalCreatures;
