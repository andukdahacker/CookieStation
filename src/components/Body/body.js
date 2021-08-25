import React from "react";
import "./body.css";
import bottlewcookie from "./image/bottlewcookie (1).png";
import bottlewnap from "/Users/anduk/Desktop/react/cookiejar/src/components/Body/image/bottlewnap.png";
import cookie from "/Users/anduk/Desktop/react/cookiejar/src/components/Body/image/cookie.png";
import jartrio from "/Users/anduk/Desktop/react/cookiejar/src/components/Body/image/jar trio.png";

function Body() {
  return (
    <>
      <div className="body">
        {/*================ Start of Body1 =================== */}
        <div className="body1">
          <div className="body1left">
            <img src={jartrio} alt="jar" />
          </div>
          <div className="body1right">
            <h1>Welcome to the Cookie Station</h1>
            <span>
              The Cookie Jar is a method for you to send inspiring message to
              your friend, loved ones or even just yourself. First create a jar
              and name it. Then, you can start putting in “cookies” - the
              message you want the receiver to read.
            </span>
            <button>Get Started</button>
          </div>
        </div>

        {/*================ End of Body1 =================== */}

        {/*================ Start of Body2 =================== */}
        <div className="body2">
          <div className="body2left">
            <h1>How to use this</h1>
            <button>Send somebody else to motivate them</button>
            <button>Create one for yourself whenever you feel down</button>
            <button>Create a mutual jar and celebrate together</button>
          </div>
          <div className="body2right">
            <img src={cookie} alt="cookie" />
          </div>
        </div>
        {/*================ End of Body2 =================== */}

        {/*================ Start of Body3 =================== */}
        <div className="body3">
          <h1>Create a cookie jar with 3 steps</h1>
          <div className="body3under">
            <div className="step">
              <span>Create a jar and give it a name</span>
            </div>
            <div className="step">
              <span>Write a cookie</span>
            </div>
            <div className="step">
              <span>
                Give the jar to your friends so they can give you cookies
              </span>
            </div>
          </div>
        </div>
        {/*================ End of Body3 =================== */}

        {/*================ Start of Body4 =================== */}
        <div className="body4">
          <div className="body4left">
            <img src={bottlewnap} alt="jar" />
          </div>
          <div className="body4right">
            <h1>Why Cookie Station?</h1>
            <span>
              This is based on the “Cookie Jar Method” - a way of
              self-motivation by using recalling positive memories and
              experiences.We look forward to creating a relaxing environment for
              people who feel stressed during their turbulance times.
            </span>
            <button>Learn More</button>
          </div>
        </div>
        {/*================ End of Body4 =================== */}
        {/*================ Start of Body5 =================== */}
        <div className="body5">
          <img src={jartrio} alt="jar" />
          <h2>Are you ready for the cookie jar?</h2>
          <button>Create yours</button>
        </div>
      </div>
      {/*================ End of Body5 =================== */}
    </>
  );
}

export default Body;
