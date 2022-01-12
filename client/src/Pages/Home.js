import React from "react";
import "../styles/Home.css";
import jartrio from "../image/trio-jar.png";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

import introImg from "../image/intro-img.png";
import guideImg from "../image/guide-img.png";
import heroImg from "../image/cookiewall.jpg";
function Home() {
  return (
    <>
      <Navbar />
      <div className="welcome-sec">
        <img src={heroImg} id="hero-img" alt="hero" />
        <div id="hero-title">
          <h1>Welcome to Cookie Station</h1>
          <p>A place to save good memories and spread happiness to others</p>
          <br />
            <Link to="/signup" className="main-btn">
              Get Started
            </Link>
        </div>
      </div>
      <div className="two-col-sec">
        <span className="col-left">
          <h2>What is Cookie Station</h2>
          <p>
            Based on the "The Cookie Jar Method" - a self-motivation technique
            by recalling positive memories. <br />
            We look forward to creating a relaxing place for people who need to
            express their souls and feelings.
          </p>
        </span>
        <span className="col-right">
        <img className="illustration" src={introImg}></img>
        </span>
      </div>
      <div className="two-col-sec">
        <span className="col-left">
            <img className="illustration" src={guideImg}></img>
        </span>
        <span className="col-right">
          <h2>How can you use this</h2>
          <p>
            Create a Cookie Jar and keep it in your shelf or send it to others so
            they can share the memories with you. <br />
            When you have a bad day, read some cookies.
        </p>
        </span>
      </div>
      <div className="cta-sec">
        <img src={jartrio} id="cta" alt="hehe" />
        <h2>Are you ready for your first Cookie Jar?</h2>
        <Link to="/shelf" className="main-btn">
          Create Jar
        </Link>
      </div>
    </>
  );
}

export default Home;
