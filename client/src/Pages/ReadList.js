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
        <div >
          {isLoading ? (
            <div className="one-col-sec">Loading...</div>
          ) : error ? (
            <div className="one-col-sec" >Error</div>
          ) : (
            <div className="pin-container">
              {cookieData
                // .filter((cookie) => cookie.read === true)
                .map((val, id) => {
                  return (
                      <Pin
                        key={id} 
                        cookieID={val._id}
                        image={val.cookieImage}
                        title={val.cookieTitle}
                        message={val.cookieContent}
                      />
                  );
                })}
            </div>
          )}
        </div>
      ) : (
        <div className="one-col-sec">You shall not pass</div>
      )}
    </>
  );
}

export default ReadList;
