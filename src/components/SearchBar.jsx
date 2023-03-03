import React, { useContext } from 'react';
import context from '../context/myContext';

function SearchBar() {
  const { handleSearch } = useContext(context);
  return (
    <form onSubmit={ handleSearch }>
      <input
        type="text"
        data-testid="search-input"
        name="search"
      />
      <input
        type="radio"
        name="radio"
        value="ingredient"
        data-testid="ingredient-search-radio"
      />
      <input
        type="radio"
        name="radio"
        value="name"
        data-testid="name-search-radio"
      />
      <input
        type="radio"
        name="radio"
        value="first-letter"
        data-testid="first-letter-search-radio"
      />
      <button
        type="submit"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        buscar
      </button>
    </form>
  );
}

export default SearchBar;
