import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore } from '../../../firebase/index.js';
import HeroCard from '../../Molecules/HeroCard/HeroCard';
import Button from '../../Atoms/Button/Button';
import './Academy.scss';

function Academy(props) {
  const [ heroSection, setHeroSection ] = useState(props.characters)
  const changeHeroSection = (category) => {
    const db = getFirestore();
    const heroesCollection = db.collection('heroes');
    const tempCharacters = heroesCollection.where("biography.publisher", "==", category).limit(3);
    tempCharacters.get().then(querySnapshot => {
    const characters = querySnapshot.docs.map(doc => {
      return { _id: doc.id, ...doc.data() }
    });
    setHeroSection(characters);
    });
  };

  const renderCard = () => {
    return heroSection?.map(card => {
       return (
        <Link to={`super-coach/${card.id}`} key={card.id}>
          <HeroCard character={card} />
        </Link>
       ) 
    });
  };

  return (
    <div className='academy-cards-container'>
      <Button text="Marvel Comics" onClick={() => changeHeroSection('Marvel Comics')}/>
      <Button text="DC Comics" onClick={() => changeHeroSection('DC Comics')}/>
      { renderCard() }
    </div>
  );
};

export default Academy;
