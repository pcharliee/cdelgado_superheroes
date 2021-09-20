import React from 'react';

function Image(props) {
  const { img, alt } = props;
  return (
    <img className='img' src={img} alt={alt} />
  )
};

export default Image;
