import React from "react";
import { Link } from "react-router-dom";
import "../styles/Pin.css";

function Pin(props) {

  return (
    <>
      <div className={`pin ${props.size}`}>
        <Link to={`/cookies/${props.cookieID}`}>
          <div className="pin-wrapper">
            <img className="cookie-image" src={props.image} alt="cookie-image" />
            <h3 className="pin-content">{props.title}</h3>
            <p className="pin-content">{props.message}</p>
          </div>
        </Link>
      </div>
    </>
  );
}
export default Pin;
