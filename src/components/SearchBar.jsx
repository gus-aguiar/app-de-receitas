import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import context from '../context/myContext';
import '../styles/Header.css';

function SearchBar({ page }) {
  const { handleSearch } = useContext(context);
  return (
    <form
      className="containerForm"
    >
      <input
        type="text"
        data-testid="search-input"
        name="search"
        className="inputSearch"
        placeholder="Search"
      />
      <div className="radioContainer">
        <label>
          <input
            type="radio"
            name="radio"
            value="ingredient"
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label>
          <input
            type="radio"
            name="radio"
            value="name"
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label>
          <input
            type="radio"
            name="radio"
            value="first-letter"
            data-testid="first-letter-search-radio"
          />
          First Letter
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        className="buttonSearch"
        onClick={ (event) => {
          handleSearch(event, page);
        } }
      >
        SEARCH
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  page: PropTypes.string.isRequired,
};

export default SearchBar;
