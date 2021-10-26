import React from 'react';

function Image(props) {
  return  <img className='img' src={props.img} alt={props.alt} /> 
};

export default Image;