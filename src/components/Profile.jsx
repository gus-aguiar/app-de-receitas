import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

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
      <Header title="Profile" />
      <div>
        <h2 data-testid="profile-email">{email}</h2>
        <button
          data-testid="profile-done-btn"
          onClick={ handleClickDone }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          onClick={ handleClickFavorite }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          onClick={ handleClickLogout }
        >
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
