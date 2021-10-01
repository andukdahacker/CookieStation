import React, { useState, useEffect } from "react";
import "../styles/Cookie.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function Cookie() {
  const [cookieData, setCookieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const cookieDataAPI = `http://localhost:5000/cookies/${id}`;

  useEffect(() => {
    axios
      .get(cookieDataAPI)
      .then((response) => {
        setCookieData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [cookieDataAPI]);

  return (
    <div className="maincookie">
      {isLoading ? (
        <div>Loading</div>
      ) : error ? (
        <div>Error...</div>
      ) : (
        <div>
          <h1>{cookieData.cookieTitle}</h1>
          <span>{cookieData.cookieContent}</span>
        </div>
      )}
    </div>
  );
}

export default Cookie;
