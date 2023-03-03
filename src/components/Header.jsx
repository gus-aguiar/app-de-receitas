import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import perfilIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const [disable, setDisable] = useState(true);
  const handleSearch = () => {
    setDisable(!disable);
  };

  const verifySearch = ['Profile', 'Done Recipes', 'Favorite Recipes'];
  return (
    <header>
      <Link
        to="/profile"
      >
        <img
          data-testid="profile-top-btn"
          src={ perfilIcon }
          alt="perfil icon"
        />
      </Link>
      {
        !verifySearch.includes(title) && (
          <button
            onClick={ handleSearch }
          >
            <img
              src={ searchIcon }
              alt="search icon"
              data-testid="search-top-btn"
            />
          </button>
        )
      }
      {
        !disable && (
          <SearchBar />
        )
      }
      <h1 data-testid="page-title">{title}</h1>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
