import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../Context/CartContext';
import HeroCard from '../../Molecules/HeroCard/HeroCard';
import HeroSuggestions from '../../Molecules/HeroSuggestions/HeroSuggestions';
import NotFound from '../../Organisms/NotFound/NotFound.jsx';
import './HeroCards.scss';

function HeroCards(props) {
  const { characters } = props;
  const { cartItems } = useCart();
  const [ character, setCharacter ] = useState([]);
  const [ selectedCards, setSelectedCards ] = useState(cartItems || []);
  const textInput = useRef();

  const searchHeroByKeyword = (keyword) => {
    let character = characters.filter(character => {
      let name = character.name.toLowerCase();
      return name.includes(keyword);
    });
    setCharacter(character);
  };

  const handleSearch = (e) => {
    if (e.target.value === '') return setCharacter([]);
    const keyword = e.target.value.toLowerCase();
    searchHeroByKeyword(keyword);
  };

  const showSelection = (id) => {
    let uniqueCards;
    characters.forEach(c => {
      if (c.id !== id) return;
      let duplicatedCard = selectedCards.includes(c)
      duplicatedCard
        ? uniqueCards = selectedCards
        : uniqueCards = [...selectedCards, c];
      return uniqueCards;
    });
    textInput.current.value = null;
    setCharacter([]);
    setSelectedCards(uniqueCards);
  };

  const renderNotFound = () => {
    if (!selectedCards.length) {
      return  <NotFound text='No hay cartas para mostrar' />
    };
  };

  const renderCard = () => {
    return selectedCards?.map(card => {
      return (
        <Link to={`super-coach/${card.id}`} key={card.id}>
          <HeroCard character={card} />
        </Link>
      ) 
    });
  };

  return (
    <section className='hero-cards-container'>
      <div className='hero-cards-search-bar'>
        <label htmlFor="HeroSearch">Encuentra tu Héroe</label>
        <input
          name='HeroSearch'
          type='text'
          placeholder='Search Superhero'
          ref={textInput}
          autoComplete='off'
          onChange={handleSearch} />
      </div>
      <HeroSuggestions showSelection={showSelection} searchSuggestions={character} />
      { renderNotFound() }
      { renderCard() }
    </section>
  );
};

export default HeroCards;