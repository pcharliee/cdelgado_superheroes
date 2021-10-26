import React from 'react';
import { useUser } from '../../../Context/UserContext';
import Title from '../../Atoms/Title/Title';
import Button from '../../Atoms/Button/Button';
import Carousel from '../../Molecules/Carousel/Carousel';
import useWindowSize from '../../Hooks/useWindowSize';
import './MainPage.scss';

function MainPage() {
  const { currentUser, loginUser } = useUser();
  const windowSize = useWindowSize();

  const renderLoginOrCurrentUser = () => {
    if (!!currentUser) {
      return <p className='logged-user'>Logged in as {currentUser.displayName}</p>
    }
    return (
      <Button text='Log in' type='login' onClick={loginUser} />
    )
  };
  return (
    <div className='main-page-container'>
      { windowSize.width < 780 && <Carousel/> }
      <div className='main-page-information-container'>
        <Title text="Welcome to the Super-store 🙋" />
        <div className="main-page-cta">
          <p>We recommend you to navigate this page in mobile version</p>
          <p>Search for your favorite hero in our Super-Coach section</p>
          <p>Hero expert? Visit the academy and see how many you can identify from the different universes</p>
          <p>Make sure to log in for a faster better shopping experience. You can also visit the 'My Orders' section (only available to logged in users)</p>
          <p>This a React based project made by Carlos Delgado. Additionally, I used SASS and SweetAlert2</p>
        </div>
      </div>
      { renderLoginOrCurrentUser() }
    </div>
  );
};

export default MainPage
