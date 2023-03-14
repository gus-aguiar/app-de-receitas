import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import perfilIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';
import cloche from '../images/cloche.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import profileGold from '../images/profileGold.svg';
import favoriteIcon from '../images/favoriteIcon.svg';
import doneIcon from '../images/doneIcon.svg';

function Header({ title }) {
  const [disable, setDisable] = useState(true);
  const handleSearch = () => {
    setDisable(!disable);
  };

  const verifySearch = ['Profile', 'Done Recipes', 'Favorite Recipes'];
  const generationIcon = {
    FAVORITE: favoriteIcon,
    PROFILE: profileGold,
    MEALS: mealIcon,
    DRINKS: drinkIcon,
    'DONE RECIPES': doneIcon,
  };
  return (
    <header className="headerComponent">
      <div className="containerIcons">
        <img src={ cloche } alt="cloche" className="cloche" />
        <div className="divzinha">
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
      </div>
      <img src={ generationIcon[title] } alt={ title } className="iconMeals" />
      <h1 data-testid="page-title" className="headerTitle">{title}</h1>
      {
        !disable && (
          <SearchBar page={ title } />
        )
      }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
