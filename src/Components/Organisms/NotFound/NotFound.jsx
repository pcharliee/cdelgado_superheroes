import React from 'react';
import { useHistory } from 'react-router';
import Title from '../../Atoms/Title/Title';
import Image from '../../Atoms/Image/Image';
import sad from '../../../Misc/Media/sad-spiderman.jpeg';
import Button from '../../Atoms/Button/Button';
import './NotFound.scss';

function NotFound(props) {
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };
  
  return (
    <div className='not-found-container'>
      <Title text={props.text} />
      <Image img={sad} alt='Content not found' />
      <Button text='Go back' onClick={handleClick} />
    </div>
  )
};

export default NotFound;
