import React, { useState, useEffect } from "react";
import "../styles/Shelf.css";
import Modal from "react-modal";
import CreateJar from "../components/CreateJar";
import CreateCookie from "../components/CreateCookie";
import axios from "axios";
import bottlewcookie from "../image/bottlewcookie (1).png";

Modal.setAppElement("#root");

function Shelf() {
  const [jarForm, setJarForm] = useState(false);
  const [cookieForm, setCookieForm] = useState(false);
  const [jarList, setJarlist] = useState([]);
  const URL = "http://localhost:5000/shelf";
  useEffect(() => {
    axios.get(URL).then((response) => {
      setJarlist(response.data);
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
        <button
          onClick={() => {
            setCookieForm(true);
          }}
        >
          Create cookie
        </button>
        <Modal
          isOpen={cookieForm}
          onRequestClose={() => {
            setCookieForm(false);
          }}
        >
          <CreateCookie />
          <button
            onClick={() => {
              setCookieForm(false);
            }}
          >
            X
          </button>
        </Modal>
        {jarList.map((val, key) => {
          return <div key={key}>{val.jarName}</div>;
        })}
      </div>
    </>
  );
}

export default Shelf;
