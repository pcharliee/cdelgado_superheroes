import React from 'react';
import Image from '../../Atoms/Image/Image';
import Title from '../../Atoms/Title/Title';
import Button from '../../Atoms/Button/Button';
import './HeroCard.scss';

function HeroCard(props) {
  const { character } = props;
  const {
    id,
    images,
    appearance,
    name,
    powerstats,
  } = character;

  const handleGetHeroDetails = () => {
    // getHeroDetails(character.id);
  };

  /********** WORK IN PROGRESS ***********/ 

  // const powerStatsParser = () => {
  //   let limit = 20
  //   let powerStats = []
  //   Object.keys(powerstats).map(key => {
  //     let calculo = Math.round(powerstats[key] / limit);
  //     powerStats.push(calculo);
  //   });
  //   console.log('ooo', powerStats)
  //   return powerStats;
  // }

  // const renderStatsSkills = () => {
  //   let skills = powerStatsParser()
  //   console.log('slo;s', skills)

  //   return skills.map(sk => {
  //   for (let index = 0; index <= sk; index++) {
  //         return <span className='hero-stat'>*</span>
  //     }
  //   });
    
  //   // for(const skill in skills) {
  //   //   let index = 0;
  //   //   while(index<skill) {
  //   //     index++
  //   //     return <span className='hero-stat'></span>
  //   //   }
  //   // }
  // } 
  /********** WORK IN PROGRESS ***********/ 

  return (
    <>
    {/* {powerStatsParser()}
      <div className='hero-stats-container'>
        {renderStatsSkills()}
      </div> */}
      <section>
        <div className="hero-card">
          <div className="hero-card-inner">
            <div className="hero-card-front">
             <Image img={images.md} alt={name} />
              <div className='hero-card-title'>
                <Title text={name} />
              </div>
            </div>
            <div className="hero-card-back">
              <div className="hero-card-back-body">
                <div>
                  <p>Nombre: <span>{name}</span></p>
                  <p>Género: <span>{appearance.gender}</span></p>
                  <p>Altura: <span>{appearance.height[1]}</span></p>
                  <p>Color de ojos: <span>{appearance.eyeColor}</span></p>
                </div>
                <div>
                  <Button text='Ver más detalles'/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroCard;