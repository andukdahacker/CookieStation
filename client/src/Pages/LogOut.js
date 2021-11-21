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
      <div className="mainlogout">
        <div>Are you sure you want to log out?</div>
        <button onClick={() => logUserOut()}>Yes</button>
        <button onClick={() => history.go(-1)}>No</button>
      </div>
    </>
  );
}

export default LogOut;
