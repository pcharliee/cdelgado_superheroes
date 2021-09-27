import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../../Context/CartContext';
import Image from '../../Atoms/Image/Image';
import Title from '../../Atoms/Title/Title';
import Loading from '../../Atoms/Loading/Loading';
import Button from '../../Atoms/Button/Button';
import './HeroDetails.scss';

function HeroDetails() {
  const [ heroDetails, setHeroDetails ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const { cartItems, setCartItems } = useCart();

  const { id } = useParams();

  useEffect(() => {
    setLoading(prevState => !prevState);
    fetch(`https://akabab.github.io/superhero-api/api/id/${id}.json`)
      .then(response => response.json())
      .then(data => setHeroDetails(data))
      .finally(() => { setLoading(prevState => !prevState) })
  }, [id]);

  const handleAddClick = () => {
    setCartItems(prevState => [...prevState, heroDetails] )
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
            text='Agregar al carrito'
            type='add-to'
            onClick={handleAddClick} />
          </div>
        </section>
      }
    </>
  )
};

export default HeroDetails;
