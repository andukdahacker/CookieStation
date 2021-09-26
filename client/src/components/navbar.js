import React, { useState } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [active, setActive] = useState(1);

  const changeActive = (index) => {
    setActive(index);
  };
  return (
    <>
      <div className="navbar">
        <Link to="/" className="logo">
          Cookie Station
        </Link>
        <ul className="navlinks">
          <li>
            <Link
              to="/"
              className={active === 1 ? "links active" : "links"}
              onClick={() => changeActive(1)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/shelf"
              className={active === 2 ? "links active" : "links"}
              onClick={() => changeActive(2)}
            >
              Shelf
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={active === 3 ? "links active" : "links"}
              onClick={() => changeActive(3)}
            >
              Contact
            </Link>
          </li>
        </ul>

        <Link to="/login" className="login">
          Sign up
        </Link>
      </div>
    </>
  );
}

export default Navbar;
