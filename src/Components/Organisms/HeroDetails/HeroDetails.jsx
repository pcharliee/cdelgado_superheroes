import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useCart } from '../../../Context/CartContext';
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
    fetch(`https://akabab.github.io/superhero-api/api/id/${id}.json`)
      .then(response => response.json())
      .then(data => {
        let hero = Object.assign(data, { quantity: 1, price: data.powerstats.strength })
        setHeroDetails(hero)
      })
      .finally(() => { setLoading(prevState => !prevState) })
  }, [id]);

  const handleAddClick = (id) => {
    let alreadyExists = false;
    cartItems.forEach(item => {
      if (item.id == id) {
        alert('Item already in the cart');
        alreadyExists = true;
      }
    });
    if (!alreadyExists) 
      setCartItems(prevState => [...prevState, heroDetails]);
  };

  const handleGoBackClick = () => {
    history.push('/super-coach');
  };

  return (
    <>
      { loading && <Loading /> }
      { !loading &&
        <section className='hero-details-container'>
          <div className="hero-details-img-bio-container">
            <Image img={heroDetails?.images.lg} alt={heroDetails?.name}/>
            <aside className='hero-details-bio-container'>
              <Title text={heroDetails?.name} />
              <p>Nombre: <span>{heroDetails?.biography.fullName}</span></p>
              <p>Raza: <span>{heroDetails?.appearance.race}</span></p>
              <p>Altura: <span>{heroDetails?.appearance.height[1]}</span></p>
              <p>Publisher: <span>{heroDetails?.biography.publisher}</span></p>
            </aside>
          </div>
          <div className='hero-details-additional'>
            <div className='hero-details-additional-bio'>
              <h5>Conexiones:</h5><p>{heroDetails?.connections.groupAffiliation}</p>
              <h5>Base:</h5><p>{heroDetails?.work.base}</p>
              <h5>Ocupación:</h5><p>{heroDetails?.work.occupation}</p>
            </div>
           <Button
            text='Volver'
            type=''
            onClick={handleGoBackClick} />
          <Button
            text='Agregar al carrito'
            type='add-to'
            disabled={disabled}
            onClick={ () => handleAddClick(heroDetails.id) } />
          </div>
        </section>
      }
    </>
  )
};

export default HeroDetails;
