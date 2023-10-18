import React from "react";

// HouseCard component for each Hogwarts house
function HouseCard ({name, emblem, founder, traits}){

    

    
        return (
          <div className="house-card">
            <h2>{name}</h2>
            <img src={emblem} alt={`${name} emblem`} />
            <p>Founder: {founder}</p>
            <p>Traits: {traits.join(', ')}</p>
          </div>
        );
      };

export default HouseCard;
