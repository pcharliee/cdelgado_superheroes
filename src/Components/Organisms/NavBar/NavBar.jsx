import React from 'react';
import CartWidget from '../../Atoms/CartWidget/CartWidget';
import HamburgerIcon from '../../Molecules/HamburgerIcon/HamburgerIcon';
import Logo from '../../Atoms/Logo/Logo.jsx';
import './NavBar.scss';

function NavBar () {
  const menuLinks = [
    'Super Coach',
    'Academia',
    'Tienda'
  ];

  return (
    <header className='navbar-container flex-row'>
      <HamburgerIcon links={menuLinks}/>
      <Logo />
      <CartWidget />
    </header>
  )
};

export default NavBar;