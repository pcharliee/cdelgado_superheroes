import React, { useState, useRef } from 'react';
import { useCart } from '../../../Context/CartContext';
import { useHistory } from 'react-router';
import { getFirestore } from '../../../firebase/index.js';
import Title from '../../Atoms/Title/Title';
import CartItem from '../../Molecules/CartItem/CartItem';
import Button from '../../Atoms/Button/Button';
import Loading from '../../Atoms/Loading/Loading';
import './Cart.scss';

function Cart() {
  const { cartItems, setCartItems, price, setPrice } = useCart();
  const [ newOrder, setNewOrder ] = useState({});
  const history = useHistory();
  let nameRef = useRef(null);
  let mailRef = useRef(null);

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
          handleRemoveItem={handleRemoveItem} />
      )
    });
  };

  const renderEmptyCart = () => {
    if (cartItems.length) return;
    return <h3>No items in the cart =( <br/> Go back to add items</h3>
  };

  const closeCart = () => {
    history.push('/super-coach');
  };
  const checkoutCart = (e) => {
    e.preventDefault();
    return Promise.resolve({})
      .then(() => {
        let name = nameRef.current.value.toString();
        let email = mailRef.current.value.toString();
        let currentOrder = { 
          buyer: { 
            name: name,
            email: email,
          },
          items: cartItems,
          totalPrice: price,
          date: new Date().toLocaleDateString()
        }
        setNewOrder(currentOrder);
        checkoutCartSuccess(currentOrder);
      })
    };

    const checkoutCartSuccess = (newOrder) => {
      const db = getFirestore();
      const ordersCollection = db.collection("orders");
      ordersCollection
        .add(newOrder)
        .then((docRef) => {
          return docRef
        })
        .then(docRef => {
          let items = cartItems.map(item => {
            return item.name;
          });
          let orderId = docRef.id;
          window.alert(`${newOrder.buyer.name} Thank you for shopping. You've bought "${items.join(', ')}" for USD$ ${price}. You will receive further information on your email ${newOrder.buyer.email} your Order ID is: ${orderId}...`)
        })
        .then(() => {
          setCartItems([]);
        });
      };

  return (
    <div className='cart-items-container'>
      <Title text="Tu carrito"/>
      { renderEmptyCart() }
      { renderCartItems() }
      <p>Total: {price}</p>
      <Button text='Close Cart' onClick={closeCart}/>
      { !!cartItems.length && 
        <>
          <form action="" onSubmit={(e) => {checkoutCart(e)}}>
            <label htmlFor="name">Nombre</label>
            <input type="text" name='name' ref={nameRef}/>
            <label htmlFor="mail">Mail</label>
            <input type="text" name='mail' ref={mailRef} />
            <Button text='Proceed to checkout' type='add-to' onClick={checkoutCart}/>
          </form>
        </>
      }
    </div>
  );
};

export default Cart;
