import React, { useEffect, useCallback, useState } from 'react';
import { useCart } from '../../../Context/CartContext';
import { useHistory } from 'react-router';
import Title from '../../Atoms/Title/Title';
import CartItem from '../../Molecules/CartItem/CartItem';
import './Cart.scss';
import Button from '../../Atoms/Button/Button';

function Cart() {
  const { cartItems, setCartItems } = useCart();
  const [ price, setPrice ] = useState(() => {
    if(!cartItems.length) return 0;
    var currentPrice = 0;
    cartItems?.map(item => {
      return currentPrice += item.price;
    });
    return currentPrice;
  })
  const history = useHistory();

  const closeModal = useCallback((event) => {
    const modalWindow = document.getElementsByClassName("cart-items-container");
    // if (event.target != modalWindow[0]) history.push('/super-coach');
  }, []);

  useEffect(() => {
    var currentPrice = 0;
    cartItems?.map(item => {
      return currentPrice += item.price;
    });
    setPrice(currentPrice);
    // document.addEventListener("keydown", closeModal, false);
    // document.addEventListener("click", closeModal, false);
    // return () => {
    //    document.removeEventListener("keydown", closeModal, false);
    //   document.removeEventListener("click", closeModal, false);
    // };
  }, [cartItems]);

  const handleRemoveItem = (id) => {
    let filteredItems = cartItems.filter(item => {
      return item.id !== id
    });
    setCartItems(filteredItems);
  };

  const renderCartCheckout = () => {
    return cartItems?.map(item => {
      return (
        <CartItem
          key={item.id}
          item={item}
          handleRemoveItem={handleRemoveItem}
          setPrice={setPrice} />
      )
    });
  };

  const closeCart = () => {
    history.push('/super-coach')
  }

  return (
    <div className='cart-items-container'>
      <Title text="Tu carrito"/>
      { renderCartCheckout() }
      <p>Total: {price}</p>
      <Button text='Close Cart' onClick={closeCart}/>
    </div>
  );
};

export default Cart;
