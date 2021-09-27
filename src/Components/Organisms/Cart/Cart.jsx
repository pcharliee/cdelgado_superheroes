import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useCart } from '../../../Context/CartContext';
import './Cart.scss';

function Cart() {
  const history = useHistory();
  const { cartItems } = useCart();

  const closeModal = useCallback((event) => {
    const modalWindow = document.getElementsByClassName("cart-items-container");
    if (event.target != modalWindow[0]) { history.push('/super-coach') };
  }, []);

  useEffect(() => {
    // document.addEventListener("keydown", closeModal, false);
    document.addEventListener("click", closeModal, false);
    return () => {
      // document.removeEventListener("keydown", closeModal, false);
      document.removeEventListener("click", closeModal, false);
    };
  }, []);

  const renderCartCheckout = () => {
    return (
      <div className='cart-items-container'>
        <h3>You have ({cartItems.length}) items in your cart</h3>
      </div>
    );
  };

  return (
    <>
      { renderCartCheckout() }
    </>
  );
};

export default Cart;
