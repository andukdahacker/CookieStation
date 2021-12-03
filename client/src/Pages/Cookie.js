import React, { useState, useEffect } from "react";
import "../styles/Cookie.css";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";

function Cookie() {
  const [cookieData, setCookieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [access, setAccess] = useState();
  const [error, setError] = useState(false);
  const { id } = useParams();
  const getCookieDataAPI = `http://localhost:5000/shelf/cookies/${id}`;
  const deleteCookieDataAPI = `http://localhost:5000/shelf/cookies/delete/${id}`;
  const history = useHistory();

  useEffect(() => {
    axios
      .get(getCookieDataAPI, { withCredentials: true })
      .then((response) => {
        setAccess(response.data.access);
        setCookieData(response.data.cookie);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [getCookieDataAPI]);

  const deleteCookie = () => {
    setIsLoading(true);
    axios
      .delete(deleteCookieDataAPI, { withCredentials: true })
      .then((res) => {
        setIsLoading(false);
        history.push(`/shelf/${res.data.jar}`);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      {access ? (
        <div className="maincookie">
          {isLoading ? (
            <div>Loading</div>
          ) : error ? (
            <div>Error...</div>
          ) : (
            <div>
              <div>
                <h1>{cookieData.cookieTitle}</h1>
                <span>{cookieData.cookieContent}</span>
              </div>
              <div>
                <img src={cookieData.cookieImage} alt="img" />
              </div>
              <button onClick={() => deleteCookie(id)}>
                {isLoading ? <div>Loading</div> : <div>Delete</div>}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="maincookie">You cannot access this cookie</div>
      )}
    </>
  );
}

export default Cookie;
