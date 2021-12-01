import React from "react";
import { Link } from "react-router-dom";
import "../styles/Pin.css";

function Pin(props) {
  return (
    <>
      <div className="mainpin">
        <Link to={`/cookie/${props.cookieID}`}>
          <img src={props.image} alt="" />
          <h3>{props.title}</h3>
          <span>{props.message}</span>
        </Link>
      </div>
    </>
  );
}

export default Pin;
