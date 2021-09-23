import React, { useContext } from 'react';
import { CartContext } from '../../../Context/CartContext';
import './CartWidget.scss';

function CartWidget () {
  const cartItems = useContext(CartContext)

  return (
    <div className='cart-widget'><p>{cartItems.length}</p></div>
  )
};

export default CartWidget;