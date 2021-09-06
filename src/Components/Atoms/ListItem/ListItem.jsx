import React from 'react';
import './ListItem.scss'

function ListItem (props) {
  return (
    <li className='list-item'>{props.text}</li>
  )
};

export default ListItem;