import React from "react";
import "./navbar.css";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="navleft"></div>
        <div className="navcenter">
          <ul>
            <a href="#">Home</a>
            <a href="#">Shelf</a>
            <a href="#">Forum</a>
            <a href="#">Login</a>
          </ul>
        </div>
        <div className="navright"></div>
      </div>
    </>
  );
}

export default Navbar;
