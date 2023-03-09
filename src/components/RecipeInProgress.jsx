import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import context from '../context/myContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/RecipeInProgress.css';

function RecipeInProgress() {
  const { recipe, setRecipe } = useContext(context);
  const { pathname } = useLocation();
  const [token, id] = pathname.slice(1).split('/');
  const [isChecked, setIsChecked] = useState([]);
  const web = (token === 'meals') ? 'themealdb' : 'thecocktaildb';
  const magicNumber = 15;

  const handleCheck = (event) => {
    const { target } = event;
    setIsChecked([...isChecked, target.id]);
  };

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
      console.log(oldInProgress);
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
    console.log(pathname);
    fetch(`https://www.${web}.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data[token]))
      .catch((error) => console.error(error));
  }, []);

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
          <div>
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
                      checked={ isChecked.includes(`${number}`) }
                      id={ number }
                      onClick={ handleCheck }
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
        // onClick={ copyUrl }
        label="share"
      >
        <img
          src={ shareIcon }
          alt="Share"
        />

      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        src={ blackHeartIcon }
        label="Favorite"
        // onClick={ handleHeart }
      >
        <img
          src={ blackHeartIcon }
          alt="Favorito"
        />
      </button>
      <button
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default RecipeInProgress;
