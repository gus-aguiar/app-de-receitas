import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import context from '../context/myContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/RecipeInProgress.css';

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

  const handleCheck = (event) => {
    const { target } = event;
    const { checked } = target;
    // const listOfIngredient = window.document.getElementById('container-of-ingredient');
    // const limit = listOfIngredient.childElementCount;
    if (checked) {
      const newIsChecked = [...isChecked, target.id];
      console.log(newIsChecked.length);
      // if (limit === newIsChecked.length) {
      //   setDisabled(false);
      // }
      setIsChecked(newIsChecked);
    } else {
      const newIsChecked = isChecked.filter((data) => data !== target.id);
      console.log(newIsChecked.length);
      // if (limit > newIsChecked.length) {
      //   setDisabled(true);
      // }
      setIsChecked([...newIsChecked]);
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
      if (oldInProgress[token].id === id) {
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

  console.log(disabled);
  return (
    <div>
      {recipe && (recipe.map((item, index) => (
        <div key={ index }>
          <div>
            <img
              data-testid="recipe-photo"
              src={ item.strMealThumb || item.strDrinkThumb }
              alt={ `${item.strMeal || item.strDrink}` }
              width="50"
              height="60"
            />
            <ul data-testid="recipe-title">
              { item.strMeal || item.strDrink }
            </ul>
            <ul data-testid="recipe-category">
              <p>{ item.strCategory }</p>
              { item.strDrink ? <p>{ item.strAlcoholic }</p> : null }
            </ul>
            <ul data-testid="instructions">
              { item.strInstructions }
            </ul>
          </div>
          <div id="container-of-ingredient">
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
                  >
                    <input
                      checked={ isChecked.includes(`${number}`) || false }
                      id={ number }
                      onChange={ handleCheck }
                      type="checkbox"
                    />
                    <p
                      data-testid={ `${number}-ingredient-name-and-measure` }
                    >
                      { `${ingredientName} - ${measure}` }
                    </p>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )))}

      <button
        type="button"
        data-testid="share-btn"
        src={ shareIcon }
        onClick={ copyUrl }
        label="share"
      >
        <img
          src={ shareIcon }
          alt="Share"
        />

      </button>
      {isFavorite ? (
        <button
          type="button"
          data-testid="favorite-btn"
          src={ blackHeartIcon }
          label="Favorite"
          onClick={ () => handleHeart(id, false) }
        >
          <img
            src={ blackHeartIcon }
            alt="Favorito"
          />
        </button>
      ) : (
        <button
          type="button"
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
          label="Favorite"
          onClick={ () => handleHeart(id, true) }
        >
          <img
            src={ whiteHeartIcon }
            alt="Favorito"
          />
        </button>
      )}
      <button
        data-testid="finish-recipe-btn"
        disabled={ disabled }
      >
        Finalizar Receita
      </button>
      {isUrlCopied && <p>Link copied!</p>}
    </div>
  );
}

export default RecipeInProgress;
