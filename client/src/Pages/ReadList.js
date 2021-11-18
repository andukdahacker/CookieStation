import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ReadList.css";
import Navbar from "../components/navbar";
function ReadList() {
  const [cookieData, setCookieData] = useState([]);
  const [jarData, setJarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const jarDataAPI = `http://localhost:5000/shelf/${id}`;

  useEffect(() => {
    axios
      .get(jarDataAPI, { withCredentials: true })
      .then((response) => {
        setJarData(response.data.jar);
        setCookieData(response.data.jar.cookies);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [jarDataAPI]);

  return (
    <>
      <Navbar />
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
    </>
  );
}

export default ReadList;
