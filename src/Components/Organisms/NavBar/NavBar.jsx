import React, { useState } from 'react';
import { useCart } from '../../../Context/CartContext';
import { useUser } from '../../../Context/UserContext';
import { useHistory } from 'react-router';
import CartWidget from '../../Molecules/CartWidget/CartWidget';
import Button from '../../Atoms/Button/Button';
import Image from '../../Atoms/Image/Image';
import HamburgerIcon from '../../Molecules/HamburgerIcon/HamburgerIcon';
import ListItem from '../../Atoms/ListItem/ListItem';
import Logo from '../../Atoms/Logo/Logo.jsx';
import useWindowSize from '../../Hooks/useWindowSize';
import './NavBar.scss';

function NavBar () {
  const { cartItems } = useCart();
  const { currentUser, loginUser, setCurrentUser } = useUser();
  const windowSize = useWindowSize();
  const history = useHistory();
  
  const loggedInMenuLinks = [
    { url: 'super-coach', text: 'Super Coach' },
    { url: 'academy', text: 'Academy' },
    { url: 'my-orders', text: 'My Orders' },
  ];

  const notLoggedInMenuLinks = [
    { url: 'super-coach', text: 'Super Coach' },
    { url: 'academy', text: 'Academy' },
  ];

  const renderLoginOrCurrentUser = () => {
    if (!!currentUser) return (
      <div
        className='login-container'
        onClick={() => {
          let logout = window.confirm('Do you want to log out');
          if (logout) {
            setCurrentUser(null);
            history.push('/');
            return localStorage.clear();
          }
        }}>
        <Image img={currentUser.photoURL} alt={`User ${currentUser.displayName}`} />
      </div>
    )
    return (
      <Button text='Log in' type='login' onClick={loginUser} />
    )
  };

  const renderHamburgerOrListMenu = () => {
    let currentLinks = currentUser ? loggedInMenuLinks : notLoggedInMenuLinks
    if (windowSize.width < 860) return (
      <HamburgerIcon links={currentLinks} />
    )
    return (
      <ul className='list-item-container'>
        {currentLinks.map((link, index) => {
          return (
            <ListItem
             key={index}
             text={link.text}
             handleClick={() => {}}
             url={link.url} />
            )
          }
        )}
      </ul>
    )
  }

  return (
    <header className='navbar-container flex-row'>
      { renderHamburgerOrListMenu() }
      <Logo />
      { renderLoginOrCurrentUser() }
      { !!cartItems.length && <CartWidget /> }
    </header>
  )
};

export default NavBar;