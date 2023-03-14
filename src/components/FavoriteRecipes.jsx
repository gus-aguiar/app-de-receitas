import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import shareIcon from '../images/Share.svg';
import blackHeartIcon from '../images/blackHeartIcon.png';
import '../styles/favoriteRecipes.css';
import AllFavorite from '../images/AllFavorite.svg';
import foodsFavorite from '../images/foodsFavorite.svg';
import drinksFavorite from '../images/drinksFavorite.svg';
import doneIcon from '../images/doneIcon.svg';

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
      <Header title="FAVORITE" />
      <div className="categories-container-favorite">
        <button
          className="category-button-favorite"
          data-testid="filter-by-all-btn"
          onClick={ () => {
            handleFilter('all');
          } }
        >
          <img src={ AllFavorite } alt="All" />
        </button>
        <button
          className="category-button-favorite"
          data-testid="filter-by-meal-btn"
          onClick={ () => {
            handleFilter('meals');
          } }
        >
          <img src={ foodsFavorite } alt="foods" />
        </button>
        <button
          className="category-button-favorite"
          data-testid="filter-by-drink-btn"
          onClick={ () => {
            handleFilter('drink');
          } }
        >
          <img src={ drinksFavorite } alt="drinks" />
        </button>
      </div>
      {favoriteRecipes
      && favoriteRecipes.map((recipe, index) => (
        recipe.type === 'meal' ? (
          <div key={ recipe.id } className="cardFavorite">
            <div className="containerImgFavorite">
              <Link
                to={ `/meals/${recipe.id}` }
              >
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                />
              </Link>
            </div>
            <div className="containerNameFavorite">
              <Link to={ `/meals/${recipe.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>
                  {recipe.name}
                </p>
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.nationality} - ${recipe.category}`}
              </p>
              <div>
                <button
                  type="button"
                  className="btnFavorite"
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
                <button
                  type="button"
                  className="btnFavorite"
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
              </div>
            </div>
            {alert && (
              <div className="containerAlert">
                <div className="messageDone">
                  <img src={ doneIcon } alt="icon de done" />
                  <p>Link copied!</p>
                  <button
                    type="button"
                    onClick={ () => setAlert(false) }
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}
          </div>
        )
          : (
            <div key={ recipe.id } className="cardFavorite">
              <div className="containerImgFavorite">
                <Link to={ `/drinks/${recipe.id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                    width="50"
                    height="60"
                  />
                </Link>
              </div>
              <div className="containerNameFavorite">
                <Link to={ `/drinks/${recipe.id}` }>
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
                <div>
                  <button
                    type="button"
                    className="btnFavorite"
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
                  <button
                    type="button"
                    className="btnFavorite"
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
                </div>
              </div>
              {alert && (
                <div className="containerAlert">
                  <div className="messageDone">
                    <img src={ doneIcon } alt="icon de done" />
                    <p>Link copied!</p>
                    <button
                      type="button"
                      onClick={ () => setAlert(false) }
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              )}
            </div>)
      ))}
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
