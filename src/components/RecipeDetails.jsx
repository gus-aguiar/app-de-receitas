import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../styles/recipeDetails.css';
import shareIcon from '../images/Share.svg';
import blackHeartIcon from '../images/blackHeartIcon.png';
import whiteHeartIcon from '../images/whiteHeartItem.png';
import context from '../context/myContext';
import { categoryIcons } from '../utils/categoryDate';
import doneIcon from '../images/doneIcon.svg';

export default function Details() {
  const [recomendedRecipe, setRecomendedRecipe] = useState();
  const { pathname } = useLocation();
  const [token, id] = pathname.slice(1).split('/');
  const [isDisabled, setIsDisabled] = useState(false);
  const [inProgressRecipes, setInProgressRecipes] = useState({});
  const history = useHistory();
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const {
    handleHeart,
    isFavorite,
    setIsFavorite,
    recipe,
    setRecipe,
  } = useContext(context);
  const web = (token === 'meals') ? 'themealdb' : 'thecocktaildb';
  const invertedWeb = (token === 'meals') ? 'thecocktaildb' : 'themealdb';
  const magicNumber = 15;
  const max = 6;
  function copyUrl() {
    const url = `http://localhost:3000${history.location.pathname}`;
    navigator.clipboard.writeText(url);
    setIsUrlCopied(true);
  }
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
    fetch(`https://www.${web}.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data[token]))
      .catch((error) => console.error(error));
  }, [id, token, web, setRecipe]);

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
      console.log(isDisabled);
    }
    if (localStorage.getItem('inProgressRecipes')) {
      const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setInProgressRecipes(progress);
    }
  }, [recipe, isDisabled]);
  useEffect(() => {
    fetch(`https://www.${invertedWeb}.com/api/json/v1/1/search.php?s=`)
      .then((response) => response.json())
      .then((data) => setRecomendedRecipe((data.meals
        || data.drinks).slice(0, max)));
  }, [id, token, invertedWeb]);
  const verifyStart = () => {
    if (inProgressRecipes[token]) {
      return inProgressRecipes[token].id === id;
    }
  };
  return (
    <div>
      {recipe ? (
        <div>
          {recipe.map((item, index) => (
            <div
              key={ index }
            >
              <div
                className="drinksContainer"
                style={ ({
                  backgroundImage: `url(${item.strMealThumb || item.strDrinkThumb})`,
                }) }
              >
                <div className="headerOfIcons">
                  <ul data-testid="recipe-title" className="title">
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
              <div>
                <h1 className="ingredientTitle">INGREDIENTS</h1>
                <ul className="ingredientsList">
                  {item && [...Array(magicNumber)].map((_, number) => {
                    const ingredientName = item[`strIngredient${number + 1}`];
                    const measure = item[`strMeasure${number + 1}`];
                    if (!ingredientName || !measure) {
                      return null;
                    }
                    return (
                      <li
                        data-testid={ `${number}-ingredient-name-and-measure` }
                        key={ number }
                      >
                        { `${ingredientName} - ${measure}` }
                      </li>
                    );
                  })}
                </ul>
              </div>
              <h1 className="ingredientTitle">INSTRUCTIONS</h1>
              <ul data-testid="instructions" className="instructionsList">
                { item.strInstructions }
              </ul>
              <div className="containerYouTube">
                { item.strYoutube && (
                  <iframe
                    data-testid="video"
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
                className="carrouselImag"
                src={ item.strMealThumb || item.strDrinkThumb }
                alt={ `${item.strMeal || item.strDrink}` }
              />
              <p data-testid={ `${index}-recommendation-title` } className="carName">
                { item.strDrink }
                { item.strMeal }
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div>Nenhuma recomedação encontrada</div>
      )}
      <div className="buttons">
        <button
          type="button"
          data-testid="share-btn"
          src={ shareIcon }
          onClick={ copyUrl }
          label="share"
          className="shareBtn"
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
            className="favoriteBtn"
          >
            <img src={ blackHeartIcon } alt="Favorito" />
          </button>
        ) : (
          <button
            type="button"
            data-testid="favorite-btn"
            src={ whiteHeartIcon }
            label="Favorite"
            onClick={ () => handleHeart(id, true) }
            className="favoriteBtn"
          >
            <img src={ whiteHeartIcon } alt="Favorito" />
          </button>
        )}
      </div>
      <div style={ { textAlign: 'center' } }>
        {verifyStart()
          ? (
            <button
              data-testid="start-recipe-btn"
              className="start-recipe-btn"
              onClick={ () => history.push(`${history.location.pathname}/in-progress`) }
            >
              Continue Recipe
            </button>
          )
          : (
            <button
              data-testid="start-recipe-btn"
              className="start-recipe-btn"
              onClick={ () => history.push(`${history.location.pathname}/in-progress`) }
              // disabled={ isDisabled }
            >
              Start Recipe
            </button>
          )}
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
