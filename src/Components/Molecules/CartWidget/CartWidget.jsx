import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../Context/CartContext';
import Button from '../../Atoms/Button/Button';
import HeroSuggestions from '../HeroSuggestions/HeroSuggestions';
import './CartWidget.scss';

function CartWidget () {
  const { cartItems } = useCart();
  const [ showCurrentCart, setShowCurrentCart ] = useState(false);

  const renderCurrentCart = () => {
    if (!showCurrentCart || !cartItems.length ) return;
    return (
      <div className='cart-widget-items-container'>
        <HeroSuggestions 
          showSelection={() => {}}
          searchSuggestions={cartItems} />
        <Link to='/cart'>
          <Button text='Go to cart' type='checkout'/>
        </Link>
      </div>
    )
  };

  return (
    <>
    { renderCurrentCart() }
      <div 
        className='cart-widget'
        onClick={() => {
          setShowCurrentCart(prevState => !prevState)
        }}>
        <p>{ cartItems.length }</p>
      </div>
    </>
  )
};

export default CartWidget;