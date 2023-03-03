import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import context from '../context/myContext';

function SearchBar({ page }) {
  const { handleSearch } = useContext(context);
  return (
    <form>
      <input
        type="text"
        data-testid="search-input"
        name="search"
      />

      <label>
        Ingredient
        <input
          type="radio"
          name="radio"
          value="ingredient"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label>
        Nome
        <input
          type="radio"
          name="radio"
          value="name"
          data-testid="name-search-radio"
        />
      </label>
      <label>
        First Letter
        <input
          type="radio"
          name="radio"
          value="first-letter"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ (event) => {
          handleSearch(event, page);
        } }
      >
        buscar
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  page: PropTypes.string.isRequired,
};

export default SearchBar;
