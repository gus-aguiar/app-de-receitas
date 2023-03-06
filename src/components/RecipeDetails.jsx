import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Details() {
  const [recipe, setRecipe] = useState();
  const { pathname } = useLocation();
  const [token, id] = pathname.slice(1).split('/');
  const web = (token === 'meals') ? 'themealdb' : 'thecocktaildb';
  const magicNumber = 15;

  useEffect(() => {
    fetch(`https://www.${web}.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data[token]))
      .catch((error) => console.error(error));
  }, [id, token, web]);
  console.log(recipe);

  function getYouTubeEmbedUrl(url) {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

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
        <div>Nenhum resultado encontrado</div>
      )}
    </div>
  );
}
