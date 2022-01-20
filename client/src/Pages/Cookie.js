import React, { useState, useEffect } from "react";
import "../styles/Cookie.css";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";
import {Swiper, SwiperSlide} from 'swiper/react/swiper-react.js';
import {Navigation, Pagination, EffectCoverflow} from 'swiper';
import { Link } from "react-router-dom";
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/modules/effect-coverflow/effect-coverflow.min.css';

function Cookie() {
  const [cookieData, setCookieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [access, setAccess] = useState();
  const [error, setError] = useState(false);
  const { id } = useParams();
  const getCookieDataAPI = `http://localhost:5000/shelf/cookies/${id}`;
  const deleteCookieDataAPI = `http://localhost:5000/shelf/cookies/delete/${id}`;
  const history = useHistory();

  useEffect(() => {
    axios
      .get(getCookieDataAPI, { withCredentials: true })
      .then((response) => {
        setAccess(response.data.access);
        setCookieData(response.data.cookie);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [getCookieDataAPI]);

  const deleteCookie = () => {
    setIsLoading(true);
    axios
      .delete(deleteCookieDataAPI, { withCredentials: true })
      .then((res) => {
        setIsLoading(false);
        history.push(`/shelf/${res.data.jar}`);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      {isLoading ? (
          <div>Loading</div>
        ) : access ? (
         <div>
           <div className="quick-nav">
        <Link className="link-btn" to="#" onClick={() => history.goBack()}>{'<'} Back</Link>
        <button className="sub-btn" onClick={() => deleteCookie()}>
          {isLoading ? "Deleting..." : "Delete"}
        </button>
        </div>
        <section>
      <Swiper
        className={"swiper-container"}
        modules={[Navigation,Pagination,EffectCoverflow]}
        effect='coverflow'
        grabCursor={true}
        centeredSlides={true}
        slidesPerView='auto'
        pagination={{clickable:true}}
        navigation
        coverflowEffect={{
          "rotate":0,
          "stretch":0,
          "depth":100,
          "modifier":2,
          "slideShadows":true
        }}
      >
        <div >
        <SwiperSlide className="swiper-slide">        
          <div className="slide-content">
          <h2>{cookieData.cookieTitle}</h2>
          <p>{cookieData.cookieContent}</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide" id="image-slide">
          <div className="slide-content-img">
            <img src={cookieData.cookieImage} alt="img" />
          </div>
        </SwiperSlide>
        </div>
      </Swiper>
      </section>
      </div>
      ) : (
        <div>You are not allowed to read this Cookie</div>
      )}
      {/* <div className="grid-list">
        {isLoading ? (
          <div>Loading</div>
        ) : access ? (
          <div>
            <h1>{cookieData.cookieTitle}</h1>
            <span>{cookieData.cookieContent}</span>
            <div>
              <img src={cookieData.cookieImage} alt="img" />
              <button onClick={() => deleteCookie()}>
                {isLoading ? <div>Loading</div> : <div>Delete</div>}
              </button>
            </div>
          </div>
        ) : (
          <div>You shall not pass</div>
        )}
      </div> */}
    </>
  );
}

export default Cookie;
