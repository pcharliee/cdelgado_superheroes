import React, { useState, useRef } from 'react';
import { Link, Route, useParams } from 'react-router-dom';
import HeroCard from '../../Molecules/HeroCard/HeroCard';
import HeroSuggestions from '../../Molecules/HeroSuggestions/HeroSuggestions';
import './HeroCards.scss';

function HeroCards(props) {
  const { characters } = props;

  const [ character, setCharacter ] = useState([]);
  const [ selectedCards, setSelectedCards ] = useState([]);
  const textInput = useRef();
  const {id} = useParams(); 

  const searchHeroByKeyword = (keyword) => {
    let character = characters.filter(character => {
      let name = character.name.toLowerCase();
      return name.includes(keyword);
    });
    return Promise.resolve(setCharacter(character));
  };

  const handleSearch = (e) => {
    if (e.target.value === '') return setCharacter([]);
    const keyword = e.target.value.toLowerCase();
    searchHeroByKeyword(keyword)
  };

  const showSelection = (id) => {
    return Promise.resolve({})
      .then((payload) => {
        characters.forEach(c => {
          if (c.id !== id) return;
          let duplicatedCard = selectedCards.includes(c)
          duplicatedCard
            ? payload = selectedCards
            : payload = [...selectedCards, c];
          return payload;
        })
        return payload;
      })
      .then((payload) => {
        setSelectedCards(payload);
        textInput.current.value = null;
        setCharacter([]);
      });
  };

  const renderCard = () => {
    if (!selectedCards.length) return;
    return selectedCards?.map(card => {
      return (
        <Link to={`super-coach/${card.id}`} key={card.id}>
        <HeroCard
          character={card} />
        </Link>
      ) 
    });
  };

  return (
    <section className='hero-cards-container'>
      <input type='text' placeholder='Search Superhero' ref={textInput} onChange={handleSearch} />
      <HeroSuggestions showSelection={showSelection} searchSuggestions={character} />
      {renderCard()}
    </section>
  );
};

export default HeroCards;