import React from 'react';
import Image from '../../Atoms/Image/Image';
import Title from '../../Atoms/Title/Title';
import './HeroCard.scss';

function HeroCard(props) {
  const { img, name } = props;
  return (
    <div className='hero-card'>
      <Image
        img={img}
        name={name} />
      <div className='hero-card-title'>
        <Title name={name} />
      </div>
    </div>
  )
};

export default HeroCard;