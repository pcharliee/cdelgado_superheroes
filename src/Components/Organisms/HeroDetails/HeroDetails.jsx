import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useCart } from '../../../Context/CartContext';
import { getFirestore } from '../../../firebase/index.js';
import Image from '../../Atoms/Image/Image';
import Title from '../../Atoms/Title/Title';
import Loading from '../../Atoms/Loading/Loading';
import Button from '../../Atoms/Button/Button';
import './HeroDetails.scss';

function HeroDetails() {
  const [ heroDetails, setHeroDetails ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ disabled, setDisabled ] = useState(false);
  const { cartItems, setCartItems } = useCart();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    setLoading(prevState => !prevState);
    const db = getFirestore();
    const heroesCollection = db.collection('heroes');
    let parsedId = parseInt(id)
    heroesCollection
      .where('id','==', parsedId)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) return history.push('/not-found');
        const character = querySnapshot.docs[0].data();
        setHeroDetails(character);
        setLoading(prevState => !prevState)
      })
  }, [id]);

  const handleAddClick = (id) => {
    let alreadyExists = false;
    cartItems.forEach(item => {
      if (item.id === id) {
        alert('Item already in the cart');
        alreadyExists = true;
      }
    });
    if (!alreadyExists) 
      setCartItems(prevState => [...prevState, heroDetails]);
  };

  const renderHeroAttributes = () => {
    if (!heroDetails) return;
    let icon;
    return Object.keys(heroDetails.powerstats).map((stat, index) => {
      switch (stat) {
        case 'speed':
          icon = '🏃'
          break;
        case 'strength':
          icon = '🏋️‍♀️'
          break;
        case 'durability':
          icon = '😰'
          break;
        case 'combat':
          icon = '🥊'
          break;
        case 'power':
          icon = '🔥'
          break;
        case 'intelligence':
          icon = '💡'
          break;
        default:
          break;
      }

      let statValue = heroDetails.powerstats[stat]
      return <li key={index}>{icon} <span>{stat}: {statValue}</span></li>
    })
  }

  const handleGoBackClick = () => {
    history.goBack();
  };

  return (
    <>
      { loading && <Loading /> }
      { !loading &&
        <section className='hero-details-container'>
          <div className="hero-details-img-bio-container">
            <Image img={heroDetails?.images.lg} alt={heroDetails?.name}/>
            <aside className='hero-details-bio-container'>
              <Title text={`${heroDetails?.name} [$${heroDetails?.price}]`} />
              <p>Nombre: <span>{heroDetails?.biography.fullName}</span></p>
              <p>Raza: <span>{heroDetails?.appearance.race}</span></p>
              <p>Altura: <span>{heroDetails?.appearance.height[1]}</span></p>
              <p>Publisher: <span>{heroDetails?.biography.publisher}</span></p>
            </aside>
          </div>
          <div className='hero-details-additional'>
            <div className='hero-details-additional-bio'>
              <ul className='hero-stats-container'>
              { renderHeroAttributes() }
              </ul>
              <h5>Conexiones:</h5><p>{heroDetails?.connections.groupAffiliation}</p>
              <h5>Base:</h5><p>{heroDetails?.work.base}</p>
              <h5>Ocupación:</h5><p>{heroDetails?.work.occupation}</p>
            </div>
            <div className='btn-container'>
              <Button
                text='Go back'
                type=''
                onClick={handleGoBackClick} />
              <Button
                text='Add to cart'
                type='add-to'
                disabled={disabled}
                onClick={ () => handleAddClick(heroDetails.id) } />
            </div>
          </div>
        </section>
      }
    </>
  )
};

export default HeroDetails;
