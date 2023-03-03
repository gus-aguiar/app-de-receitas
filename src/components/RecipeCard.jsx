// Arquivo: src/components/RecipeCard.js

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe, index }) {
  const { strMeal, strDrink, strMealThumb, strDrinkThumb, idMeal, idDrink } = recipe;
  const recipeType = strMeal ? 'meals' : 'drinks';
  const name = strMeal || strDrink;
  const thumb = strMealThumb || strDrinkThumb;
  const linkToRecipe = `/${recipeType}/${idMeal || idDrink}`;

  return (
    <Link
      to={ linkToRecipe }
      data-testid={ `${index}-recipe-card` }
    >
      <div
        className="recipe-card"
      >
        <img
          src={ thumb }
          alt={ `Imagem de ${name}` }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{name}</p>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.any,
  recipe: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
}.isrequired;

export default RecipeCard;
