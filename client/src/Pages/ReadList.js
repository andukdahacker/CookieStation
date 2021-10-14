import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/ReadList.css";

function ReadList() {
  const [cookieData, setCookieData] = useState([]);
  const [jarData, setJarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const jarDataAPI = `http://localhost:5000/shelf/${id}`;

  const history = useHistory();

  useEffect(() => {
    axios
      .get(jarDataAPI)
      .then((response) => {
        setJarData(response.data);
        setCookieData(response.data.cookies);
        console.log(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [jarDataAPI]);

  return (
    <div className="mainreadlist">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error</div>
      ) : (
        <div>
          <h2>{jarData.jarName}</h2>
          {cookieData
            .filter((cookie) => cookie.read === true)
            .map((val, id) => {
              return (
                <div key={id}>
                  <h3>{val.cookieTitle}</h3>
                  <img src={val.cookieImage} alt="img" />
                  <span>{val.cookieContent}</span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default ReadList;
