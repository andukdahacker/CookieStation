import React from "react";
import Body from "./components/Body/body";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import "./App.css";

export default function App() {
  return (
    <>
      <div className="app">
        <Navbar />
        <Body />
        <Footer />
      </div>
    </>
  );
}
