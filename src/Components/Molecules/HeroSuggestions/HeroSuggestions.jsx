import React from 'react';
import { useCart } from '../../../Context/CartContext';
import HeroSuggestionItem from '../HeroSuggestionItem/HeroSuggestionItem';
import './HeroSuggestions.scss';

function HeroSuggestions(props) {
  const { searchSuggestions, showSelection = {} } = props;
  const { cartItems } = useCart();
  
  const handleClick = (id) => {
    let newCard = cartItems.every(item => item.id !== id)
    if (!newCard) return;
    showSelection(id);
  };

  const renderHeroSuggestions = () => {
    return searchSuggestions?.map(character => {
      let alreadyAdded = cartItems.some(item => item.id === character.id)
      return (
        <div key={character.id} onClick={() => handleClick(character.id) }>
          <HeroSuggestionItem
            id={character.id}
            alreadyAdded={alreadyAdded}
            img={character.images.sm}
            alt={character.name}
            text={character.name}
            publisher={character.biography.publisher} />
        </div>
      );
    });
  };

  return (
    <section className='hero-suggestions-container'>
      { renderHeroSuggestions() }
    </section>
  );
};

export default HeroSuggestions;