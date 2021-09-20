import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.scss'

function Logo () {
  return (
    <Link to='/' className='logo-container'>
      <p>Super <span>Academia</span></p>
    </Link>
  )
};

export default Logo;