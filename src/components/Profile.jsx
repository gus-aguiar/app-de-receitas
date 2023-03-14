import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import profileDone from '../images/profileDone.svg';
import profileFavorite from '../images/profileFavorite.svg';
import profileLogout from '../images/profileLogout.svg';
import '../styles/profile.css';

function Profile() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const getEmail = JSON.parse(localStorage.getItem('user')).email;
      setEmail(getEmail);
    }
  }, []);

  const history = useHistory();
  const handleClickDone = () => {
    history.push('/done-recipes');
  };

  const handleClickFavorite = () => {
    history.push('/favorite-recipes');
  };

  const handleClickLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header title="PROFILE" />
      <div className="containerProfile">
        <h2 data-testid="profile-email">{email}</h2>
        <button
          data-testid="profile-done-btn"
          onClick={ handleClickDone }
        >
          <img src={ profileDone } alt="done" />
        </button>
        <button
          data-testid="profile-favorite-btn"
          onClick={ handleClickFavorite }
        >
          <img src={ profileFavorite } alt="favorite" />
        </button>
        <button
          data-testid="profile-logout-btn"
          onClick={ handleClickLogout }
        >
          <img src={ profileLogout } alt="Logout" />
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
