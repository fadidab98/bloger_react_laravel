import React, { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Newdata.css'
export default function Newdata(props) {
  console.log(props.data);
  const NextArrow = ({ onClick }) => (
    <span className="next-slide" onClick={onClick}>
      <i className="fas fa-angle-right"></i>
    </span>
  );
  const PreviousArrow = ({ onClick }) => (
    <span className="prev-slide" onClick={onClick}>
      <i className="fas fa-angle-left"></i>
    </span>
  );
  const settings = {
    dots: false,

    autoplay: true,

    speed: 1000,
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
      }, {
        breakpoint: 600,
      }, {
        breakpoint: 400,
      }]
  };

  return (
    <section id="slider_width" className="mt-2 p-0" >
    <Slider {...settings} className="d-block p-0 m-0">
      {props.data.map((da) => {
        return (
          <Link key={da.id} to={`/${da.categoryName}/${da.id}`}  className="text-center m-0 p-0  ">
            <div className="slider-link cairo p-0 m-0">
            <img
              className="m-0 p-0 w-100" 
              src={`/uploads/share/Posts/${da.images}`}
              alt="No Image"
            />
            <h5 className="m-0">{da.name}</h5>
            <span >{da.categoryName}</span>
            </div>
          </Link>
        );
      })}
    </Slider>
    </section>
  );
}
