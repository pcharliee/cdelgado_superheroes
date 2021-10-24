import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router';
import { useCart } from '../../../Context/CartContext';
import { useUser } from '../../../Context/UserContext';
import { getFirestore } from '../../../firebase/index.js';
import Title from '../../Atoms/Title/Title';
import CartItem from '../../Molecules/CartItem/CartItem';
import Button from '../../Atoms/Button/Button';
import './Cart.scss';

function Cart() {
  const { cartItems, setCartItems, price } = useCart();
  const [ newOrder, setNewOrder ] = useState({});
  const [ checkoutText, setCheckoutText ] = useState('Proceed to checkout');
  const { currentUser } = useUser();
  const history = useHistory();
  let currentUserName = !!currentUser ? currentUser.displayName.split(' ')[0] : 'Stranger';
  let nameRef = useRef(null);
  let mailRef = useRef(null);

  const handleRemoveItem = (id) => {
    let filteredItems = cartItems.filter(item => {
      return item.id !== id
    });
    setCartItems(filteredItems);
  };

  const renderCartItems = () => {
    console.log('cr', currentUser)
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
        let name = !currentUser ? nameRef.current.value.toString() : ''
        let email = !currentUser ? mailRef.current.value.toString(): ''
        let currentOrder = { 
          buyer: { 
            name: currentUser?.displayName || name,
            email: currentUser?.email || email,
          },
          items: cartItems,
          totalPrice: price,
          date: new Date().toLocaleDateString()
        }
        setNewOrder(currentOrder);
        setCheckoutText('Checking out...');
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
        history.push('/')
        window.location.reload();
      });
    };

  const userCheckoutForm = () => {
    return (
      <>
        <p className='prepopulated-form-info'>Buyer: {currentUser.displayName}</p>
        <p className='prepopulated-form-info'>Email: {currentUser.email}</p>
      </>
    ); 
  };

  const renderCheckoutForm = () => {
    return (
    !!currentUser 
    ? userCheckoutForm() 
    : (
      <>
        <label htmlFor="name">Nombre</label>
        <input type="text" name='name' ref={nameRef}/>
        <label htmlFor="mail">Mail</label>
        <input type="text" name='mail' ref={mailRef} />
      </>
      )
    );
  };

  return (
    <div className='cart-items-container'>
      <Button text='Close' onClick={closeCart}/>
      <Title text={`${currentUserName}'s shopping cart`}/>
      { renderEmptyCart() }
      { renderCartItems() }
      { !!cartItems.length && 
        <>
          <form
            className='cart-form-container'
            action=""
            onSubmit={(e) => {checkoutCart(e)}}>
          { renderCheckoutForm() }
          <Button text={checkoutText} type='add-to' />
          <p className='cart-total'>Total: USD${price}</p>
          </form>
        </>
      }
    </div>
  );
};

export default Cart;
