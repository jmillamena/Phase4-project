import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper">
        <h1 class="title-header">
          Platform 9 <span class="exponent">3/4</span>
        </h1>

        <ul id="nav-mobile" className="center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/student-list">Student List</Link>
          </li>
          <li>
            <Link to="/hogwarts-house">Hogwarts House</Link>
          </li>
          <li>
            <Link to="/magical-creatures">Magical Creatures</Link>
          </li>
          <li>
            {/* <Link to="/wands">Wands</Link> */}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
