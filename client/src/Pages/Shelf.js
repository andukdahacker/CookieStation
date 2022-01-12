import React, { useState, useEffect } from "react";
import "../styles/Shelf.css";
import Modal from "react-modal";
import CreateJar from "../components/CreateJar";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import cookie from "../image/cookie.png";
Modal.setAppElement("#root");

function Shelf() {
  const [jarForm, setJarForm] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const URL = "http://localhost:5000/shelf";
  useEffect(() => {
    axios
      .get(URL, { withCredentials: true })
      .then((response) => {
        setData(response.data.jars);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="shelf-container">
        <div className="jar-welcome">
          <h1>Welcome bitch</h1>
        </div>
        <div className="quick-nav">
          <div>
            <input type="text" id="search-jar" placeholder="Find your jar..." />
          </div>
          <button onClick={() => setJarForm(true)} className="main-btn">
            Create jar
          </button>
        </div>
        <Modal isOpen={jarForm} onRequestClose={() => setJarForm(false)}>
          <CreateJar />
          <button onClick={() => setJarForm(false)}>X</button>
        </Modal>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error...</div>
        ) : (
          data.map((val, id) => {
            return (
              <div key={id} className="grid-list">
                <Link to={`/shelf/${val._id}`} key={id} className="list-item">
                  <img src={cookie} alt="cookie" className="list-item-img" />
                  <p>{val.jarName}</p>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default Shelf;
