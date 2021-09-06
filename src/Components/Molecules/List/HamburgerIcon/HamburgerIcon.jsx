import React, { useState } from 'react';
import ListItem from '../../../Atoms/ListItem/ListItem';
import './HamburgerIcon.scss'

function HamburgerIcon (props) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(prevState => !prevState);
  };

  const renderList = () => {
    if (showMenu) {
      return <ul className='list-item-container'>
        {props.links.map((link, index) => {
          return <ListItem key={index} text={link}/>
          }
        )}
      </ul>
    }
  }

  return (
    <>
      <div className='hamburger-icon-container' onClick={toggleMenu}>
        <div className={!showMenu ? "hamburger-icon" : "hamburger-icon opened"}>
        </div>
      </div>
      {renderList()}
    </>
  )
};

export default HamburgerIcon;