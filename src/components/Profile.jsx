import React, { useState, useEffect } from 'react';

function Profile() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(JSON.parse(localStorage.getItem('user')).email);
  }, []);

  return (
    <div>
      <h2 data-testid="profile-email">{email}</h2>
      <button data-testid="profile-done-btn">Done Recipes</button>
      <button data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button data-testid="profile-logout-btn">Logout</button>
    </div>
  );
}

export default Profile;
