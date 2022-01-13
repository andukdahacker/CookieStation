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
      <div>
        <h1 className="jar-welcome">Open a Cookie in {jarData.jarName}</h1>
        <div className="quick-nav">
        <Link to="/shelf" className="main-btn">
              Back
            </Link>
        {access ? (
          <Link to={`/readcookies/${id}`}>Read List</Link>
        ) : (
          <div></div>
        )}
        {access ? (
          <button className="sub-btn" onClick={() => deleteJar()}>Delete this Jar</button>
        ) : (
          <div></div>
        )}
        <button
            className="main-btn"
            onClick={() => {
            setCookieForm(true);
          }}
        >
          Create cookie
        </button>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error...</div>
        ) : (
          <div className="grid-list">
            {cookieData
              .filter((cookie) => cookie.read === false)
              .map((val, id) => {
                return (
                  <div key={id} className="list-item">
                    {access ? (
                      <Link
                        to={`/cookies/${val._id}`}
                        onClick={() => updateCookieToRead(val._id)}
                      >
                        <img className="list-item-img"src={cookie} alt="cookie" />
                      </Link>
                    ) : (
                      <div>
                        <img className="list-item-img" src={cookie} alt="cookie" />
                      </div>
                    )}

                    <p>{val.cookieTitle}</p>
                  </div>
                );
              })}
          </div>
        )}
        
        <Modal className="modal-form"
          isOpen={cookieForm}
          onRequestClose={() => {
            setCookieForm(false);
          }}
        >
          <div className="close-modal">
          <button 
          className="main-btn"
            onClick={() => {
              setCookieForm(false);
            }}
          >
            X
          </button>
          </div>
          <CreateCookie />
          
        </Modal>
        
      </div>
    </>
  );
}

export default Jar;
