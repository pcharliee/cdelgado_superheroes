import React from 'react';
import './Button.scss';

function Button(props) {
  const {
    text,
    type = '',
    onClick 
  } = props;

  return (
    <button className={`btn ${type}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
