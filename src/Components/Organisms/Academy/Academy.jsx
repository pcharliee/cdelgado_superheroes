import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import HeroCard from '../../Molecules/HeroCard/HeroCard';
import Button from '../../Atoms/Button/Button';

function Academy(props) {
  const [heroSection, setHeroSection] = useState(props.characters)

  const changeHeroSection = (category) => {
    const newSection = props.characters.filter(item => {
      return item.biography.publisher == category
    })
    setHeroSection(newSection)
  };

  const renderCard = () => {
    let i = 0
    return heroSection?.map(card => {
      while (i < 10) {
          i++;
       return (
        <Link to={`super-coach/${card.id}`} key={card.id}>
            <HeroCard character={card} />
          </Link>
       ) 
      }
    });
  };

  return (
    <div>
      <Button text="Marvel Comics" onClick={() => changeHeroSection('Marvel Comics')}/>
      <Button text="DC Comics" onClick={() => changeHeroSection('DC Comics')}/>
      { renderCard() }
    </div>
  )
}

export default Academy
