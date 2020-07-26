import React from "react";
import { Carousel } from "react-bootstrap";

const HomeCarousel = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src={require("../../images/offer1.jpg")}
            alt='First slide'
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src={require("../../images/offer2.jpg")}
            alt='Third slide'
          />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src={require("../../images/offer3.jpg")}
            alt='Third slide'
          />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default HomeCarousel;
