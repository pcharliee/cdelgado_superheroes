import React, { useEffect } from 'react';
import bane from '../../../Misc/Media/bane.jpg';
import superman from '../../../Misc/Media/superman.jpeg';
import heroAcademy from '../../../Misc/Media/hero-academy.jpeg';
import './Carousel.scss';

function Carousel() {
  const images = [
    { id: 1,
      img: bane, 
      alt: 'Cartoon Bane clenching his fists' },
    { id: 2,
      img: superman, 
      alt: 'Cartoon of flying Superman' },
    { id: 3,
      img: heroAcademy,
      alt: 'Cartoon Marvel Heroes' }
  ];

  useEffect(() => {
    let carouselImages = document.querySelectorAll('.carousel-image');
    setInterval(() => {
      let randomNumber = Math.floor(Math.random()*3);
      let randomImage = carouselImages[randomNumber];
      randomImage.classList.contains('active')
      ? randomImage.classList.remove('active')
      : randomImage.classList.add('active');
    }, 2000);
  }, [])

  return (
    <section className='carousel-container'>
      <div className='carousel-img-container'>
        {images.map((image, index) => {
          return (
            <img
              key={image.id}
              id={image.id}
              className='carousel-image active'
              src={image.img}
              alt={image.alt} />
            )
          }
        )}
      </div>
    </section>
  )
};

export default Carousel;