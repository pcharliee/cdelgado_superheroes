import React from 'react';
import Title from '../../Atoms/Title/Title';
import Image from '../../Atoms/Image/Image';
import sad from '../../../Misc/Media/sad-spiderman.jpeg';
import './NotFound.scss';

function NotFound(props) {
  const { text } = props;
  
  return (
    <div className='not-found-container'>
      <Title text={text} />
      <Image img={sad} alt='Content not found' />
    </div>
  )
};

export default NotFound;
