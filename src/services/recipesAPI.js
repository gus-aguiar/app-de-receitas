export async function getMeals() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.meals;
}

export async function getDrinks() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.drinks;
}
export async function getMealsCategories() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data.meals;
}
export async function getDrinksCategories() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data.drinks;
}

export async function getDrinksIngredients({ search }) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`);
  const data = await response.json();
  return data;
}

export async function getDrinksName({ search }) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
  const data = await response.json();
  return data;
}

export async function getDrinksFirstLetter({ search }) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`);
  const data = await response.json();
  return data;
}

export async function getMealsIngredients({ search }) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
  const data = await response.json();
  return data;
}

export async function getMealsName({ search }) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
  const data = await response.json();
  return data;
}

export async function getMealsFirstLetter({ search }) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
  const data = await response.json();
  return data;
}
