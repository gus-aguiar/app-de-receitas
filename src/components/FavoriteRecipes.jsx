import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState(undefined);
  const [oldFavoriteRecipes, setOldFavoriteRecipes] = useState([]);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavoriteRecipes(recipes);
      setOldFavoriteRecipes(recipes);
    }
  }, []);

  const handleShare = ({ target: { name, id } }) => {
    let url;
    if (name === 'meal') {
      url = `http://localhost:3000/meals/${id}`;
    } else url = `http://localhost:3000/drinks/${id}`;
    navigator.clipboard.writeText(url);
    setAlert(true);
  };

  const handleHeart = ({ target: { id } }) => {
    const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setFavoriteRecipes(newFavoriteRecipes);
    setOldFavoriteRecipes(newFavoriteRecipes);
  };

  const handleFilter = (type) => {
    if (type === 'meals') {
      const newFavoriteRecipes = favoriteRecipes
        .filter((recipes) => recipes.type === 'meal');
      setFavoriteRecipes(newFavoriteRecipes);
    }
    if (type === 'drink') {
      const newFavoriteRecipes = favoriteRecipes
        .filter((recipes) => recipes.type === 'drink');
      setFavoriteRecipes(newFavoriteRecipes);
    }
    if (type === 'all') {
      setFavoriteRecipes(oldFavoriteRecipes);
    }
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => {
          handleFilter('all');
        } }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => {
          handleFilter('meals');
        } }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => {
          handleFilter('drink');
        } }
      >
        Drinks
      </button>
      {favoriteRecipes
      && favoriteRecipes.map((recipe, index) => (
        recipe.type === 'meal' ? (
          <div key={ recipe.id }>
            <Link
              to={ `/meals/${recipe.id}` }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
                width="50"
                height="60"
              />
              <p data-testid={ `${index}-horizontal-name` }>
                {recipe.name}
              </p>
            </Link>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.nationality} - ${recipe.category}`}
            </p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              label={ recipe.name }
              onClick={ handleHeart }
            >
              <img
                src={ blackHeartIcon }
                alt={ recipe.name }
                id={ recipe.id }
              />
            </button>
            <button
              type="button"
              src={ shareIcon }
              label={ recipe.name }
              onClick={ handleShare }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt={ recipe.name }
                name={ recipe.type }
                id={ recipe.id }
              />
            </button>
            {alert && (<p>Link copied!</p>)}
          </div>
        )
          : (
            <div key={ recipe.id }>
              <Link
                to={ `/drinks/${recipe.id}` }
              >
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                  width="50"
                  height="60"
                />
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipe.name}
                </p>
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.alcoholicOrNot}
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
              <button
                type="button"
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                label={ recipe.name }
                onClick={ handleHeart }
              >
                <img
                  src={ blackHeartIcon }
                  alt={ recipe.name }
                  id={ recipe.id }
                />
              </button>
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                label={ recipe.name }
                onClick={ handleShare }
              >
                <img
                  src={ shareIcon }
                  alt={ recipe.name }
                  name={ recipe.type }
                  id={ recipe.id }
                />
              </button>
              {alert && (<p>Link copied!</p>)}
            </div>)
      ))}
    </div>
  );
}

export default FavoriteRecipes;
