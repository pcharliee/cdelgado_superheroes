import React from 'react';
import { Link } from 'react-router-dom';
import './ListItem.scss';

function ListItem (props) {
  
  const onListItemClick = () => {
    props.handleClick();
  };

  return (
    <Link to={`/${props.url}`}>
      <li className='list-item' onClick={onListItemClick}>{props.text}</li>
    </Link>
  )
};

export default ListItem;