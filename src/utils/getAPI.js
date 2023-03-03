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
      const data = await getDrinksIngredients(search);
      return data;
    }
    if (type === 'name') {
      const data = await getDrinksName(search);
      return data;
    }
    if (type === 'first-letter') {
      const data = await getDrinksFirstLetter(search);
      return data;
    }
  }
  if (page === 'Meals') {
    if (type === 'ingredient') {
      const data = await getMealsIngredients(search);
      return data;
    }
    if (type === 'name') {
      const data = await getMealsName(search);
      return data;
    }
    if (type === 'first-letter') {
      const data = await getMealsFirstLetter(search);
      return data;
    }
  }
}
