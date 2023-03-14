import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import shareIcon from '../images/Share.svg';
import AllFavorite from '../images/AllFavorite.svg';
import foodsFavorite from '../images/foodsFavorite.svg';
import drinksFavorite from '../images/drinksFavorite.svg';
import '../styles/doneRecipes.css';
import doneIcon from '../images/doneIcon.svg';

function DoneRecipes() {
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const [isFilter, setIsFilter] = useState([]);

  function copyUrl(event) {
    if (event.target.name === 'meal') {
      const url = `http://localhost:3000/meals/${event.target.id}`;
      navigator.clipboard.writeText(url);
      setIsUrlCopied(true);
    } else {
      const url = `http://localhost:3000/drinks/${event.target.id}`;
      navigator.clipboard.writeText(url);
      setIsUrlCopied(true);
    }
  }

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  function filterByAll() {
    const all = doneRecipes;
    setIsFilter(all);
  }
  function filterByMeal() {
    const meal = doneRecipes.filter((recipe) => recipe.type === 'meal');
    setIsFilter(meal);
  }
  function filterByDrink() {
    const drink = doneRecipes.filter((recipe) => recipe.type === 'drink');
    setIsFilter(drink);
  }

  useEffect(() => {
    if (!doneRecipes) {
      setIsFilter([]);
    }
    const all = doneRecipes;
    setIsFilter(all);
  }, []);

  return (
    <div>
      <Header title="DONE RECIPES" />
      <div className="categories-container-favorite">
        <button
          className="category-button-favorite"
          data-testid="filter-by-all-btn"
          onClick={ filterByAll }
        >
          <img src={ AllFavorite } alt="All" />
        </button>
        <button
          className="category-button-favorite"
          data-testid="filter-by-meal-btn"
          onClick={ filterByMeal }
        >
          <img src={ foodsFavorite } alt="foods" />
        </button>
        <button
          className="category-button-favorite"
          data-testid="filter-by-drink-btn"
          onClick={ filterByDrink }
        >
          <img src={ drinksFavorite } alt="drinks" />
        </button>
      </div>
      {isFilter
      && isFilter.map((recipe, index) => (
        recipe.type === 'meal' ? (
          <div key={ recipe.id } className="cardFavorite">
            <div className="containerImgFavorite">
              <Link to={ `/meals/${recipe.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                />
              </Link>
            </div>
            <div className="containerNameDone">
              <Link to={ `/meals/${recipe.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.nationality} - ${recipe.category}`}
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            </div>
            <button
              type="button"
              className="btnFavorite"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ copyUrl }
              label="share"
              id={ recipe.id }
              name={ recipe.type }
            >
              <img
                src={ shareIcon }
                alt={ recipe.name }
                id={ recipe.id }
                name={ recipe.type }
              />
            </button>
            {isUrlCopied && (
              <div className="containerAlert">
                <div className="messageDone">
                  <img src={ doneIcon } alt="icon de done" />
                  <p>Link copied!</p>
                  <button
                    type="button"
                    onClick={ () => setIsUrlCopied(false) }
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
                  />
                </Link>
              </div>
              <div className="containerNameDone">
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
                <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
              </div>
              <button
                type="button"
                className="btnFavorite"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                onClick={ copyUrl }
                label="share"
              >
                <img
                  src={ shareIcon }
                  alt={ recipe.name }
                  id={ recipe.id }
                  name={ recipe.type }
                />
              </button>
              {isUrlCopied && (
                <div className="containerAlert">
                  <div className="messageDone">
                    <img src={ doneIcon } alt="icon de done" />
                    <p>Link copied!</p>
                    <button
                      type="button"
                      onClick={ () => setIsUrlCopied(false) }
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              )}
            </div>)

      ))}

    </div>
  );
}

export default DoneRecipes;
