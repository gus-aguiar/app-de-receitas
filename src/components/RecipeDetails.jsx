import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../styles/Carousel.css';

export default function Details() {
  const [recipe, setRecipe] = useState();
  const [recomendedRecipe, setRecomendedRecipe] = useState();
  const { pathname } = useLocation();
  const [token, id] = pathname.slice(1).split('/');
  const web = (token === 'meals') ? 'themealdb' : 'thecocktaildb';
  const invertedWeb = (token === 'meals') ? 'thecocktaildb' : 'themealdb';
  const magicNumber = 15;
  const max = 6;
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
    fetch(`https://www.${invertedWeb}.com/api/json/v1/1/search.php?s=`)
      .then((response) => response.json())
      .then((data) => setRecomendedRecipe((data.meals
        || data.drinks).slice(0, max)));
  }, [id, token, invertedWeb]);
  console.log(recomendedRecipe);

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
          <AliceCarousel
            responsive={ { 0: { items: 2 } } }
            touchTracking={ false }
            items={
              recomendedRecipe.map((item, index) => (
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
              ))
            }
          />
        </div>
      ) : (
        <div>Nenhuma recomedação encontrada</div>
      )}
      <button
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
      >
        Start Recipe
      </button>
    </div>
  );
}
