import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
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
  const history = useHistory();
  const jarDataAPI = `http://localhost:5000/shelf/${id}`;
  const cookieDataAPI = `http://localhost:5000/shelf/cookies/update/${id}`;
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

  const updateCookieToRead = (id) => {
    axios
      .put(cookieDataAPI, {
        id: id,
        read: true,
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteJar = () => {
    axios.delete(jarDataAPI);
    history.push("/shelf");
  };

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
                <Link
                  to={`/cookies/${val._id}`}
                  onClick={() => updateCookieToRead(val._id)}
                >
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
      <button
        onClick={() => {
          deleteJar();
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Jar;
