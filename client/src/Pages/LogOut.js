import React from "react";
import "../styles/LogOut.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function LogOut() {
  const logOutAPI = "http://localhost:5000/auth/logout";
  const history = useHistory();
  const logUserOut = () => {
    axios
      .get(logOutAPI, { withCredentials: true })
      .then(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="one-col-sec">
        <h1>Are you sure you want to log out?</h1>
        <span>
        <button className="main-btn" onClick={() => history.go(-1)}>No</button>
        <button className="main-btn" onClick={() => logUserOut()}>Yes</button>
        </span>
        
      </div>
    </>
  );
}

export default LogOut;
