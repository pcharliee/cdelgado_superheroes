import React from 'react';
import CartWidget from '../../Molecules/CartWidget/CartWidget';
import HamburgerIcon from '../../Molecules/HamburgerIcon/HamburgerIcon';
import Logo from '../../Atoms/Logo/Logo.jsx';
import './NavBar.scss';

function NavBar () {
  const menuLinks = [
    { url: 'super-coach' ,text: 'Super Coach' },
    { url: 'academia' ,text: 'Academia' },
    { url: 'tienda' ,text: 'Tienda' },
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