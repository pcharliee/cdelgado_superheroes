import React, { useState } from 'react';
import { getFirestore } from '../../../firebase/index.js';
import Pagination from '../Pagination/Pagination.jsx';
import HeroCard from '../../Molecules/HeroCard/HeroCard';
import Loading from '../../Atoms/Loading/Loading.jsx';
import Button from '../../Atoms/Button/Button';
import Title from '../../Atoms/Title/Title.jsx';
import './Academy.scss';

function Academy(props) {
  const [ heroSection, setHeroSection ] = useState(props.characters);
  const [ loading, setLoading ] = useState(false);
  const [ currentCategory, setCurrentCategory] = useState('');

  const buttons = [
    { type: 'marvel', text: 'Marvel Comics' },
    { type: 'dc', text: 'DC Comics' },
    { type: 'dark-horse', text: 'Dark Horse Comics' },
    { type: 'george-lucas', text: 'George Lucas' },
    { type: 'nbc', text: 'NBC - Heroes' },
  ];

  const changeHeroSection = (category) => {
    setLoading(prevState => !prevState);
    setCurrentCategory(category);
    const db = getFirestore();
    const heroesCollection = db.collection('heroes');
    heroesCollection
      .where("biography.publisher", "==", category)
      .limit(100)
      .get()
      .then(querySnapshot => {
        const characters = querySnapshot.docs.map(doc => {
          return { _id: doc.id, ...doc.data() };
      });
      setHeroSection(characters);
      setLoading(prevState => !prevState)
     });
  };

  const renderCards = () => {
    if (!heroSection.length) return;
    return (
      <Pagination
        dataLimit={5}
        pageLimit={5}
        RenderComponent={HeroCard}
        data={heroSection} />
    )
  };

  const renderButtonCategories = () => {
    return buttons.map((btn, index) => {
      return (
        <React.Fragment key={index}>
          <Button
            type={`img ${btn.type}`}
            onClick={() => changeHeroSection(btn.text)} />
        </React.Fragment>
      )
    });
  };

  return (
    <>
      { loading && <Loading /> }
      { !loading && 
        <div className='academy-cards-container'>
          <Title text='Categories'/>
          <div className='btn-categories-container'>
            { renderButtonCategories() }
          </div>
          { renderCards() }
        </div>
      }
    </>
  );
};

export default Academy;
