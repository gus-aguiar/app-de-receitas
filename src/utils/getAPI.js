import {
  getDrinksIngredients,
  getDrinksFirstLetter,
  getDrinksName,
  getMealsIngredients,
  getMealsFirstLetter,
  getMealsName,
} from '../services/recipesAPI';

export async function toggleAPI(type, search, page) {
  // um toggle para selecionar o endpoint.
  if (page === 'Drinks') {
    if (type === 'ingredient') {
      return getDrinksIngredients(search);
    }
    if (type === 'name') {
      return getDrinksName(search);
    }
    if (type === 'first-letter') {
      return getDrinksFirstLetter(search);
    }
  }
  if (page === 'Meals') {
    if (type === 'ingredient') {
      return getMealsIngredients(search);
    }
    if (type === 'name') {
      return getMealsName(search);
    }
    if (type === 'first-letter') {
      return getMealsFirstLetter(search);
    }
  }
}
