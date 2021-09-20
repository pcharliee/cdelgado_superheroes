import React from 'react';
import Image from '../../Atoms/Image/Image';
import Title from '../../Atoms/Title/Title';
import './HeroCard.scss';

function HeroCard(props) {
  const { character } = props;
  const {
    id,
    images,
    appearance,
    name,
    powerstats,
  } = character

  const handleGetHeroDetails = () => {
    // getHeroDetails(character.id);
  };

  /********** WORK IN PROGRESS ***********/ 
  /* const powerStatsParser = () => {
    let limit = 20
    let powerStats = []
    Object.keys(powerstats).map(key => {
      let calculo = Math.round(powerstats[key] / limit)
      // let calculo = powerstats[key] / limit
      powerStats.push(calculo)
    });
    console.log('ooo', powerStats)
    return powerStats;
  }

  const renderStatsSkills = () => {
    let skills = powerStatsParser()
    for(const skill in skills) {
      let index = 0;
      while(index<skill) {
        index++
        return <span className='hero-stat'></span>
      }
    }
  } */
  /********** WORK IN PROGRESS ***********/ 


  return (
    <>
    {/* {powerStatsParser()}
      <div className='hero-stats-container'>
        {renderStatsSkills()}
      </div> */}
      <div className='hero-card' id={id} onClick={handleGetHeroDetails}>
        <Image
          img={images.md}
          alt={name} />
        <div className='hero-card-title'>
          <Title text={name} />
        </div>
      </div>
      <div className='hero-card back'>
        <div>
          <p>Nombre: <span>{name}</span></p>
          <p>Género: <span>{appearance.gender}</span></p>
          <p>Altura: <span>{appearance.height[1]}</span></p>
          <p>Color de ojos: <span>{appearance.eyeColor}</span></p>
        </div>
      </div>
    </>
  );
};

export default HeroCard;