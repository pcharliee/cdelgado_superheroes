import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './HeroDetails.scss';

function HeroDetails() {
  const [heroDetails, setHeroDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://akabab.github.io/superhero-api/api/id/${parseInt(id)}.json`)
      .then(response => response.json())
      .then(data => {
        console.log('data', data)
        setHeroDetails(data)
      })
  }, [])

  return (
    <div className='hero-details-container'>
      <h2>{heroDetails?.name} MORE DETAILS COMING SOON</h2>
    </div>
  );
};

export default HeroDetails;
