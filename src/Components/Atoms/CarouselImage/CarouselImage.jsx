import React from 'react';
import './CarouselImage.scss';

function CarouselImage(props) {
  console.log('hola',window.scrollX)
  return (
    <img
      id={`${props.id}`}
      className="carousel-image"
      src={props.img}
      alt={props.alt} />
  )
};

export default CarouselImage;
