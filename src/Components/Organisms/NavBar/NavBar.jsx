import React from 'react';
import CartWidget from '../../Atoms/CartWidget/CartWidget';
import HamburgerIcon from '../../Molecules/List/HamburgerIcon/HamburgerIcon';
import Logo from '../../Atoms/Logo/Logo.jsx';
import './NavBar.scss';

function NavBar () {

  const menuLinks = [
    'Super Coach',
    'Academia',
    'Tienda'
  ];

  return (
    <div className='navbar-container flex-row'>
      <HamburgerIcon links={menuLinks}/>
      <Logo />
      <CartWidget />
    </div>
  )
};

export default NavBar;