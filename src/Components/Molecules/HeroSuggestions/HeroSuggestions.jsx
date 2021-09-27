import React from 'react';
import HeroSuggestionItem from '../HeroSuggestionItem/HeroSuggestionItem';
import './HeroSuggestions.scss';

function HeroSuggestions(props) {
  const { searchSuggestions, showSelection = {} } = props;
  
  const handleClick = (id) => {
    showSelection(id);
  };

  const renderHeroSuggestions = () => {
    return searchSuggestions?.map(character => {
      return (
        <div key={character.id} onClick={() => { handleClick(character.id) }}>
          <HeroSuggestionItem
            id={character.id}
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
