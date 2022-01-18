import React from "react";
import { Link } from "react-router-dom";
import "../styles/Pin.css";

function Pin(props) {

  return (
    <>
      <div className={`pin ${props.size}`}>
        <Link to={`/cookies/${props.cookieID}`}>
          <img src={props.image} alt="" />
          <h3 className="pin-title">{props.title}</h3>
          <span>{props.message}</span>
        </Link>
      </div>
    </>
  );
}
export default Pin;
