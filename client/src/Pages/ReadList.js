import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ReadList.css";
import Navbar from "../components/navbar";
import Pin from "../components/Pin";

function ReadList() {
  const [cookieData, setCookieData] = useState([]);
  const [jarData, setJarData] = useState([]);
  const [access, setAccess] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const jarDataAPI = `http://localhost:5000/shelf/${id}`;

  useEffect(() => {
    axios
      .get(jarDataAPI, { withCredentials: true })
      .then((response) => {
        setAccess(response.data.access);
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
      {access ? (
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
                    <div key={id} className="pin">
                      <Pin
                        cookieID={val._id}
                        image={val.cookieImage}
                        title={val.cookieTitle}
                        message={val.cookieContent}
                      />
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      ) : (
        <div className="mainreadlist">You shall not pass</div>
      )}
    </>
  );
}

export default ReadList;
