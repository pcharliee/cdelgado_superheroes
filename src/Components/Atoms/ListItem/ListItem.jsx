import React from 'react';
import { Link } from 'react-router-dom';
import './ListItem.scss'

function ListItem (props) {
  const { url, text, handleClick } = props;
  
  const onListItemClick = () => {
    handleClick();
  };

  return (
    <Link to={`/${url}`}>
      <li className='list-item' onClick={onListItemClick}>{text}</li>
    </Link>
  )
};

export default ListItem;