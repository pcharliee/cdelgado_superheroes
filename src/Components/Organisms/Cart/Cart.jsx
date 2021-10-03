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
      console.log('item', item)
      return currentPrice += (item.price * item.quantity);
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

  const renderCartItems = () => {
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

  const renderEmptyCart = () => {
    if (cartItems.length) return;
    return (
      <h3>No items in the cart =( <br/> Go back to add items</h3>
    )
  };

  const closeCart = () => {
    history.push('/super-coach')
  };

  const checkoutCart = () => {
    let checkout = window.confirm(`Are you done shopping? Total price is USD$ ${price}`);
    if (checkout) 
      setCartItems([])
  };

  return (
    <div className='cart-items-container'>
      <Title text="Tu carrito"/>
      { renderEmptyCart() }
      { renderCartItems() }
      <p>Total: {price}</p>
      <Button text='Close Cart' onClick={closeCart}/>
      { !!cartItems.length && <Button text='Proceed to checkout' type='add-to' onClick={checkoutCart}/>}
    </div>
  );
};

export default Cart;
