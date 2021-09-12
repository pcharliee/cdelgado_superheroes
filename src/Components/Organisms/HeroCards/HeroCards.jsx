import React, { useState } from 'react';
import HeroCard from '../../Molecules/HeroCard/HeroCard';
import Loading from '../../Atoms/Loading/Loading';
import Counter from '../../Atoms/Counter/Counter';
import './HeroCards.scss'

function HeroCards(props) {
  const { characters } = props;

  const [loading, setLoading] = useState(false);
  const [showCards, setShowCards] = useState(false);

  const renderHeroCards = () => {
    return characters.map((character, index) => {
        return <HeroCard
                key={index}
                img={character.images.md}
                name={character.name} />
    });
  };

  const handleShowCards = () => {
    setLoading(prevState => !prevState);
    return Promise.resolve(() => {
    })
    .then(() => {
      return setTimeout(() => {
        setLoading(prevState => !prevState);
        setShowCards(prevState => !prevState);
      }, 1000);
    });
  };



  return (
    <section className='hero-cards-container'>
      <button onClick={handleShowCards}>
        {!showCards ? 'SHOW CARDS' : 'HIDE CARDS'}
      </button>
      {!showCards && <Counter />}
      {loading && <Loading />}
      {showCards && renderHeroCards()}
    </section>
  );
};

export default HeroCards;
