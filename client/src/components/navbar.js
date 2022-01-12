import React, { useState, useEffect } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import cookie from "../image/cookie-logo.png";

function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [showNav, setShowNav] = useState(true);
  // const navControl = () => {
  //   if (window.scrollY > 100) {
  //     setShowNav(false);
  //   } else {
  //     setShowNav(true);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", navControl);
  //   return () => {
  //     window.removeEventListener("scroll", navControl);
  //   };
  // }, []);
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (localStorage.getItem("username")) {
      setIsAuth(true);
    }
    setUsername(localStorage.getItem("username"));
  }, [isAuth]);

  return (
    <>
      <div className="navbar">
        <Link to="/" className="title">
          <img id="site-logo" src={cookie} alt="cookie-logo" />
          <span id="site-title">
            <b>Cookie Station</b>
          </span>
        </Link>
        <div className="main-nav">
          <Link to="/" className="link-btn">
            Home
          </Link>
          <Link to="/shelf" className="link-btn">
            Shelf
          </Link>

          <Link to="/contact" className="link-btn">
            Contact
          </Link>
        </div>
        {isAuth ? (
          <div className="profile-nav">
            <span className="hello-user">Hello, {username}</span>
            <Link to="/logout" className="link-btn">
              Log out
            </Link>
          </div>
        ) : (
          <div className="profile-nav">
            <Link to="/signup" className="link-btn">
              Sign up
            </Link>
            <Link to="/login" className="main-btn">
              Log in
            </Link>
          </div>
        )}
        {/* {isLoading ? (
          <div>Loading</div>
        ) : isAuth ? (
          <>
            <span>Hello, {username}</span>
            <Link to="/logout">Log out</Link>
          </>
        ) : (
          <Link to="/login" className="login">
            Sign up
          </Link>
        )} */}
      </div>
    </>
  );
}

export default Navbar;
