import React, { useState, useEffect } from "react";
import "../styles/Shelf.css";
import Modal from "react-modal";
import CreateJar from "../components/CreateJar";
import axios from "axios";
import { Link } from "react-router-dom";
import bottlewcookie from "../image/bottlewcookie (1).png";

Modal.setAppElement("#root");

function Shelf() {
  const [jarForm, setJarForm] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const URL = "http://localhost:5000/shelf";
  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);
  return (
    <>
      <div className="mainshelf">
        <button onClick={() => setJarForm(true)}>Create jar</button>
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
              <Link to={`/shelf/${val._id}`} key={id}>
                {val.jarName}
              </Link>
            );
          })
        )}
      </div>
    </>
  );
}

export default Shelf;
