import React from 'react';
import './Button.scss';

function Button(props) {
  const {
    text,
    type = '',
    onClick,
    disabled = false,
  } = props;

  return (
    <button className={`btn ${type}`} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
