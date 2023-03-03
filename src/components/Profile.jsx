import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Profile() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(JSON.parse(localStorage.getItem('user')).email);
  }, []);

  const history = useHistory();
  const handleClickDone = () => {
    history.push('/done-recipes');
  };

  const handleClickFavorite = () => {
    history.push('/favorite-recipes');
  };

  return (
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
      <button data-testid="profile-logout-btn">Logout</button>
    </div>
  );
}

export default Profile;
