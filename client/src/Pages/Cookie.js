import React, { useState, useEffect } from "react";
import "../styles/Cookie.css";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

function Cookie() {
  const [cookieData, setCookieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const getCookieDataAPI = `http://localhost:5000/cookies/${id}`;
  const deleteCookieDataAPI = `http://localhost:5000/shelf/cookies/delete/${id}`;
  const history = useHistory();

  useEffect(() => {
    axios
      .get(getCookieDataAPI)
      .then((response) => {
        setCookieData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [getCookieDataAPI]);

  const deleteCookie = () => {
    axios.delete(deleteCookieDataAPI);
    history.push("/shelf");
  };

  return (
    <div className="maincookie">
      {isLoading ? (
        <div>Loading</div>
      ) : error ? (
        <div>Error...</div>
      ) : (
        <div>
          <div className={``}>
            {/* {cookieData.filter((cookie) => {cookieData.read == "false"}).map((cookie) => {})} */}
            <h1>{cookieData.cookieTitle}</h1>
            <span>{cookieData.cookieContent}</span>
          </div>
          <div className={``}>
            <img src={cookieData.cookieImage} alt="img" />
          </div>
          <button onClick={() => deleteCookie(id)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default Cookie;
