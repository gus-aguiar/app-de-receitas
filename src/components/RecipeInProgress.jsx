import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import context from '../context/myContext';
import shareIcon from '../images/Share.svg';
import blackHeartIcon from '../images/blackHeartIcon.png';
import whiteHeartIcon from '../images/whiteHeartItem.png';
import { categoryIcons } from '../utils/categoryDate';
import '../styles/RecipeInProgress.css';
import doneIcon from '../images/doneIcon.svg';

function RecipeInProgress() {
  const { pathname } = useLocation();
  const [token, id] = pathname.slice(1).split('/');
  const [isChecked, setIsChecked] = useState([]);
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const web = (token === 'meals') ? 'themealdb' : 'thecocktaildb';
  const magicNumber = 15;
  const {
    recipe,
    setRecipe,
    handleHeart,
    isFavorite,
    setIsFavorite,
    setFavoriteRecipes,
  } = useContext(context);

  const verifyProgress = (oldInProgress) => {
    if (oldInProgress[token]) {
      return oldInProgress[token].id === id;
    }
  };

  const handleCheck = (event) => {
    const { target } = event;
    const { checked } = target;
    if (checked) {
      const newIsChecked = [...isChecked, target.id];
      setIsChecked(newIsChecked);
    } else {
      const newIsChecked = isChecked.filter((data) => data !== target.id);
      setIsChecked([...newIsChecked]);
    }
  };

  const handleStartRecipe = () => ({
    id: recipe[0].idDrink || recipe[0].idMeal,
    type: token === 'meals' ? 'meal' : 'drink',
    nationality: recipe[0].strArea || '',
    category: recipe[0].strCategory,
    alcoholicOrNot: recipe[0].strAlcoholic || '',
    name: recipe[0].strDrink || recipe[0].strMeal,
    image: recipe[0].strDrinkThumb || recipe[0].strMealThumb,
    doneDate: new Date(),
    tags: recipe[0].strTags ? recipe[0].strTags.split(',') : [],
  });

  const handleDoneRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      const newDoneRecipes = [...doneRecipes, handleStartRecipe()];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    } else {
      const newDoneRecipes = [handleStartRecipe()];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    }
  };

  function copyUrl() {
    const url = `http://localhost:3000/${token}/${id}`;
    navigator.clipboard.writeText(url);
    setIsUrlCopied(true);
  }

  useEffect(() => {
    if (window.document.getElementById('container-of-ingredient')) {
      const listOfIngredient = window.document.getElementById('container-of-ingredient');
      const limit = listOfIngredient.childElementCount;
      if (limit === isChecked.length) {
        setDisabled(false);
      } else setDisabled(true);
    }
  }, [isChecked, recipe]);
  useEffect(() => {
    let favoriteRecipes;
    if (localStorage.getItem('favoriteRecipes')) {
      favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    }
    if (favoriteRecipes && recipe) {
      favoriteRecipes.forEach((data) => {
        if (data.id === (recipe[0].idDrink || recipe[0].idMeal)) {
          setIsFavorite(true);
        }
      });
    }
  }, [recipe, setIsFavorite]);
  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavoriteRecipes(recipes);
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes')) {
      const oldInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (verifyProgress(oldInProgress)) {
        setIsChecked(oldInProgress[token].isChecked);
      }
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes')) {
      const oldInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (recipe) {
        const object = {
          ...oldInProgress,
          [token]: {
            id: recipe[0].idDrink || recipe[0].idMeal,
            isChecked,
          } };
        localStorage.setItem('inProgressRecipes', JSON.stringify(object));
      }
    } else if (recipe) {
      const object = {
        [token]: {
          id: recipe[0].idDrink || recipe[0].idMeal,
          isChecked,
        } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(object));
    }
  }, [isChecked]);
  useEffect(() => {
    fetch(`https://www.${web}.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data[token]))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      {recipe && (recipe.map((item, index) => (
        <div key={ index }>
          <div
            className="drinksContainer"
            style={ ({
              backgroundImage: `url(${item.strMealThumb || item.strDrinkThumb})`,
            }) }
          >
            <div className="headerOfIcons">
              <ul className="title" data-testid="recipe-title">
                { item.strMeal || item.strDrink }
              </ul>
              <ul data-testid="recipe-category">
                <img
                  className="iconCategory"
                  src={ categoryIcons[item.strCategory] }
                  alt={ item.strCategory }
                />
                <p className="itemCategory">{ item.strCategory }</p>
              </ul>
            </div>
          </div>
          <h1 className="ingredientTitle">INGREDIENTS</h1>
          <ul className="ingredientsListProgress" id="container-of-ingredient">
            {item && [...Array(magicNumber)].map((_, number) => {
              const ingredientName = item[`strIngredient${number + 1}`];
              const measure = item[`strMeasure${number + 1}`];
              if (!ingredientName || !measure) {
                return null;
              }
              return (
                <div key={ number }>
                  <label
                    className={ isChecked.includes(`${number}`) ? 'riscado' : '' }
                    data-testid={ `${number}-ingredient-step` }
                    style={ { display: 'flex' } }
                  >
                    <input
                      checked={ isChecked.includes(`${number}`) || false }
                      id={ number }
                      onChange={ handleCheck }
                      type="checkbox"
                      style={ { margin: '10px' } }
                    />
                    <p data-testid={ `${number}-ingredient-name-and-measure` }>
                      { ` ${ingredientName} - ${measure}` }
                    </p>
                  </label>
                </div>
              );
            })}
          </ul>
          <h1 className="ingredientTitle">INSTRUCTIONS</h1>
          <ul data-testid="instructions" className="instructionsListProgress">
            { item.strInstructions }
          </ul>
        </div>
      )))}
      <button
        type="button"
        data-testid="share-btn"
        src={ shareIcon }
        onClick={ copyUrl }
        label="share"
        className="shareBtn"
      >
        <img src={ shareIcon } alt="Share" />
      </button>
      {isFavorite ? (
        <button
          type="button"
          data-testid="favorite-btn"
          src={ blackHeartIcon }
          label="Favorite"
          className="favoriteBtn"
          onClick={ () => handleHeart(id, false) }
        >
          <img src={ blackHeartIcon } alt="Favorito" />
        </button>
      ) : (
        <button
          type="button"
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
          label="Favorite"
          className="favoriteBtn"
          onClick={ () => handleHeart(id, true) }
        >
          <img src={ whiteHeartIcon } alt="Favorito" />
        </button>
      )}
      <div style={ { textAlign: 'center' } }>
        <Link to="/done-recipes">
          <button
            data-testid="finish-recipe-btn"
            disabled={ disabled }
            onClick={ () => handleDoneRecipe() }
            className="start-recipe-btn"
          >
            Finalizar Receita
          </button>
        </Link>
      </div>
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
  );
}

export default RecipeInProgress;
