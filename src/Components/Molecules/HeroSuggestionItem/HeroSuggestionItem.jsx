import React from 'react';
import Image from '../../Atoms/Image/Image';
import Title from '../../Atoms/Title/Title';
import './HeroSuggestionItem.scss'

function HeroSuggestionItem(props) {
  const { img, alt, text, publisher } = props;

  return (
    <div className='hero-suggestion'>
      <Image img={img} alt={alt} />
      <div className='hero-suggestion-details'>
        <Title text={text} />
        <p>{publisher}</p>
      </div>
    </div>
  );
};

export default HeroSuggestionItem;
