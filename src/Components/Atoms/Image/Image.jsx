import React from 'react';

function Image(props) {
  const { img, name } = props;
  return (
    <img 
      className='img'
      src={img}
      alt={name} />
  )
};

export default Image;
