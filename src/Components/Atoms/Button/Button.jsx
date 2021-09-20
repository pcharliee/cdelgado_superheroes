import React from 'react';
import './Button.scss';

function Button(props) {
  const { text, type } = props;

  return (
    <button className={`btn ${type}`}>
      {text}
    </button>
  )
}

export default Button
