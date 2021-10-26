import React from 'react';
import Image from '../../Atoms/Image/Image';
import Title from '../../Atoms/Title/Title';
import './HeroCard.scss';

function HeroCard(props) {
  const { data } = props;
  const { images, name, price } = data;

  return (
    <>
      <section>
        <div className="hero-card">
          <div className="hero-card-front">
            <Image img={images.md} alt={name} />
            <div className='hero-card-title'>
              <Title text={`${name} [$${price}]`} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroCard;