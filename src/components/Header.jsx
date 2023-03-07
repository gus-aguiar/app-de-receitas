import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import perfilIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';

function Header({ title }) {
  const [disable, setDisable] = useState(true);
  const handleSearch = () => {
    setDisable(!disable);
  };

  const verifySearch = ['Profile', 'Done Recipes', 'Favorite Recipes'];
  return (
    <header className="headerComponent">
      <div className={ disable ? 'containerIcons' : 'containerIconAndSearch' }>
        {
          !verifySearch.includes(title) && (
            <button
              onClick={ handleSearch }
              className="iconButtonSearch"
            >
              <img
                src={ searchIcon }
                alt="search icon"
                data-testid="search-top-btn"
              />
            </button>
          )
        }
        <Link
          to="/profile"
        >
          <img
            className="iconImgProfile"
            data-testid="profile-top-btn"
            src={ perfilIcon }
            alt="perfil icon"
          />
        </Link>
      </div>
      {
        !disable && (
          <SearchBar page={ title } />
        )
      }
      <h1 data-testid="page-title" className="headerTitle">{title}</h1>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
