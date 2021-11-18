import React, { useState, useEffect } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <>
      <div className="navbar">
        <Link to="/" className="logo">
          Cookie Station
        </Link>
        <ul className="navlinks">
          <li>
            <Link to="/" className="links">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shelf" className="links">
              Shelf
            </Link>
          </li>
          <li>
            <Link to="/contact" className="links">
              Contact
            </Link>
          </li>
        </ul>
        {isAuth ? (
          <>
            <Link to="/logout">Log out</Link>
          </>
        ) : (
          <Link to="/login" className="login">
            Sign up
          </Link>
        )}
      </div>
    </>
  );
}

export default Navbar;
