import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../styles/Carousel.css';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import context from '../context/myContext';

export default function Details() {
  const [recipe, setRecipe] = useState();
  const [recomendedRecipe, setRecomendedRecipe] = useState();
  const { pathname } = useLocation();
  const [token, id] = pathname.slice(1).split('/');
  const [isDisabled, setIsDisabled] = useState(false);
  const [inProgressRecipes, setInProgressRecipes] = useState(undefined);
  const history = useHistory();
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const { handleHeart, isFavorite, setIsFavorite } = useContext(context);

  const web = (token === 'meals') ? 'themealdb' : 'thecocktaildb';
  const invertedWeb = (token === 'meals') ? 'thecocktaildb' : 'themealdb';
  const magicNumber = 15;
  const max = 6;

  function copyUrl() {
    const url = `http://localhost:3000${history.location.pathname}`;
    navigator.clipboard.writeText(url);
    setIsUrlCopied(true);
  }

  const handleStart = ({ target }) => {
    if (target.innerText === 'Start Recipe') {
      history.push(`${history.location.pathname}/in-progress`);
    }
  };

  useEffect(() => {
    let favoriteRecipes;
    if (localStorage.getItem('favoriteRecipes')) {
      favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    }
    if (recipe) {
      favoriteRecipes.forEach((data) => {
        if (data.id === (recipe[0].idDrink || recipe[0].idMeal)) {
          setIsFavorite(true);
        }
      });
    }
  }, [recipe, setIsFavorite]);

  useEffect(() => {
    fetch(`https://www.${web}.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data[token]))
      .catch((error) => console.error(error));
  }, [id, token, web]);

  function getYouTubeEmbedUrl(url) {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      const idRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      if (recipe) {
        idRecipes.forEach((data) => {
          if (data.id === (recipe[0].idDrink || recipe[0].idMeal)) {
            setIsDisabled(true);
          }
        });
      }
    }
    if (localStorage.getItem('inProgressRecipes')) {
      const progress = localStorage.getItem('inProgressRecipes');
      setInProgressRecipes(progress);
    }
  }, [recipe]);

  useEffect(() => {
    fetch(`https://www.${invertedWeb}.com/api/json/v1/1/search.php?s=`)
      .then((response) => response.json())
      .then((data) => setRecomendedRecipe((data.meals
        || data.drinks).slice(0, max)));
  }, [id, token, invertedWeb]);

  return (
    <div>
      {recipe ? (
        <div>
          {recipe.map((item, index) => (
            <div key={ index }>
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
              <div>
                {item && [...Array(magicNumber)].map((_, number) => {
                  const ingredientName = item[`strIngredient${number + 1}`];
                  const measure = item[`strMeasure${number + 1}`];

                  if (!ingredientName || !measure) {
                    return null;
                  }

                  return (
                    <div key={ number }>
                      <p data-testid={ `${number}-ingredient-name-and-measure` }>
                        { `${ingredientName} - ${measure}` }
                      </p>
                    </div>
                  );
                })}
              </div>
              <ul data-testid="instructions">
                { item.strInstructions }
              </ul>
              { item.strYoutube && (
                <iframe
                  data-testid="video"
                  width="560"
                  height="315"
                  src={ getYouTubeEmbedUrl(item.strYoutube) }
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer;
                    autoplay;
                    clipboard-write;
                    encrypted-media;
                    gyroscope;
                    picture-in-picture;
                    web-share"
                  allowFullScreen
                />
              ) }
            </div>
          ))}
        </div>
      ) : (
        <div>Nenhuma receita encontrada</div>
      )}
      {recomendedRecipe ? (
        <div className="carousel-conteiner">
          {recomendedRecipe.map((item, index) => (
            <div
              data-testid={ `${index}-recommendation-card` }
              key={ index }
              className="carousel-card"
            >
              <img
                className="d-block w-100"
                src={ item.strMealThumb || item.strDrinkThumb }
                alt={ `${item.strMeal || item.strDrink}` }
                width="150px"
              />
              <p data-testid={ `${index}-recommendation-title` }>
                { item.strDrink }
                { item.strMeal }
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div>Nenhuma recomedação encontrada</div>
      )}
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
          onClick={ handleHeart }
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
          onClick={ handleHeart }
        >
          <img
            src={ whiteHeartIcon }
            alt="Favorito"
          />
        </button>
      )}

      <button
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        disabled={ isDisabled }
        onClick={ handleStart }
      >
        {inProgressRecipes ? 'Continue Recipe' : 'Start Recipe'}
      </button>
      {isUrlCopied && <p>Link copied!</p>}
    </div>
  );
}
