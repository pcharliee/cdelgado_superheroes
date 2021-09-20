import React from 'react';
import './Carousel.scss';
import bane from '../../../Misc/Media/bane.jpg';
import superman from '../../../Misc/Media/superman.jpeg'
import heroAcademy from '../../../Misc/Media/hero-academy.jpeg'
import CarouselImage from '../../Atoms/CarouselImage/CarouselImage';

function Carousel() {
  const IMAGES = [
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

  return (
    <section className='carousel-container'>
      <div className='carousel-img-container'>
        {IMAGES.map((image, index) => {
          return (
              <CarouselImage 
                id={image.id} 
                key={index} 
                img={image.img} 
                alt={image.alt} />
            )
          }
        )}
      </div>
      {/* <div className='carousel-buttons-container'>
      {IMAGES.map((image, index) => {
          return (
              <a className='carousel-buttons'href={`#${image.id}`} key={index}></a>
            )
          }
        )}
      </div> */}
    </section>
  )
};

export default Carousel;