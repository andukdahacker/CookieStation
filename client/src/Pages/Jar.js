import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import CreateCookie from "../components/CreateCookie";
import "../styles/Jar.css";
import cookie from "../image/cookie.png";
import Navbar from "../components/navbar";
function Jar() {
  const [cookieForm, setCookieForm] = useState(false);
  const [jarData, setJarData] = useState([]);
  const [cookieData, setCookieData] = useState([]);
  const [access, setAccess] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const jarDataAPI = `http://localhost:5000/shelf/${id}`;
  const cookieDataAPI = `http://localhost:5000/shelf/cookies/update/${id}`;
  useEffect(() => {
    axios
      .get(jarDataAPI, { withCredentials: true })
      .then((response) => {
        setAccess(response.data.access);
        setJarData(response.data.jar);
        setCookieData(response.data.jar.cookies);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, [jarDataAPI]);

  const updateCookieToRead = (id) => {
    axios
      .put(
        cookieDataAPI,
        {
          id: id,
          read: true,
        },
        { withCredentials: true }
      )
      .catch((err) => {
        setError(true);
      });
  };

  const deleteJar = () => {
    setIsLoading(true);
    axios
      .delete(jarDataAPI, { withCredentials: true })
      .then((res) => {
        setIsLoading(false);
        history.push("/shelf");
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="mainjar">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error...</div>
        ) : (
          <div className="main">
            <h1>{jarData.jarName}</h1>
            {cookieData
              .filter((cookie) => cookie.read === false)
              .map((val, id) => {
                return (
                  <div key={id} className="jar">
                    {access ? (
                      <Link
                        to={`/cookies/${val._id}`}
                        onClick={() => updateCookieToRead(val._id)}
                      >
                        <img src={cookie} alt="cookie" />
                      </Link>
                    ) : (
                      <div>
                        <img src={cookie} alt="cookie" />
                      </div>
                    )}

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
        {access ? (
          <Link to={`/readcookies/${id}`}>Read List</Link>
        ) : (
          <div></div>
        )}
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
        {access ? (
          <button onClick={() => deleteJar()}>Delete</button>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default Jar;
