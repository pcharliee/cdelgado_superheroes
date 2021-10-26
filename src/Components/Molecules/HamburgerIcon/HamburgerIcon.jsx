import React, { useState, useEffect } from 'react';
import ListItem from '../../Atoms/ListItem/ListItem';
import './HamburgerIcon.scss';

function HamburgerIcon (props) {
  const [showMenu, setShowMenu] = useState(false);

  const closeModal = React.useCallback((event) => {
    const containers = [
      document.getElementsByClassName("list-item-container")[0],
      document.getElementsByClassName("hamburger-icon-container")[0],
      document.getElementsByClassName("hamburger-icon")[0],
    ]
    if (!containers.includes(event.target)) setShowMenu(false);
  }, []);

  useEffect(() => {
    document.addEventListener("click", closeModal, false);
    return () => {
        document.removeEventListener("click", closeModal, false);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(prevState => !prevState);
  };

  const handleClick = () => {
    toggleMenu();
  };

  const renderList = () => {
    if (showMenu) {
      return (
        <ul className='list-item-container'>
          {props.links.map((link, index) => {
            return (
              <ListItem
               key={index}
               text={link.text}
               handleClick={handleClick}
               url={link.url} />
              )
            }
          )}
        </ul>
      )
    };
  };

  return (
    <>
      <div className='hamburger-icon-container' onClick={toggleMenu}>
        <div className={!showMenu ? "hamburger-icon" : "hamburger-icon opened"}>
        </div>
      </div>
      { renderList() }
    </>
  )
};

export default HamburgerIcon;