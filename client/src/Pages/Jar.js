import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import CreateCookie from "../components/CreateCookie";
import "../styles/Jar.css";
import cookie from "../image/cookie.png";

function Jar() {
  const [cookieForm, setCookieForm] = useState(false);
  const [jarData, setJarData] = useState([]);
  const [cookieData, setCookieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const jarDataAPI = `http://localhost:5000/shelf/${id}`;

  useEffect(() => {
    axios
      .get(jarDataAPI)
      .then((response) => {
        setJarData(response.data);
        setCookieData(response.data.cookies);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, [jarDataAPI]);

  return (
    <div className="mainjar">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error...</div>
      ) : (
        <div>
          <h1>{jarData.jarName}</h1>
          {cookieData.map((val, id) => {
            return (
              <div key={id}>
                <Link to={`/cookies/${val._id}`}>
                  <img src={cookie} alt="cookie" />
                </Link>
                <span>{val.cookieTitle}</span>
              </div>
            );
          })}
        </div>
      )}
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
    </div>
  );
}

export default Jar;
