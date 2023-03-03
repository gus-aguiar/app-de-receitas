import React, { useState, useEffect } from 'react';
import
{ getMeals,
  getDrinks,
  getMealsCategories,
  getDrinksCategories,
} from '../services/recipesAPI';
import Header from './Header';
import RecipeCard from './RecipeCard';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = window.location.pathname === '/meals' ? 'getMeals' : 'getDrinks';
      if (window.location.pathname === '/meals') {
        setPathname('Meals');
      } else {
        setPathname('Drinks');
      }
      const data = await (endpoint === 'getMeals' ? getMeals() : getDrinks());
      const maxNumber = 12;
      setRecipes(data.slice(0, maxNumber));
      const categoriesData = await (endpoint === 'getMeals'
        ? getMealsCategories()
        : getDrinksCategories());
      const maxCategories = 5;
      setCategories(categoriesData.slice(0, maxCategories));
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="recipes-container">
        <Header title={ pathname } />
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={ recipe.idMeal || recipe.idDrink }
            recipe={ recipe }
            index={ index }
          />
        ))}
      </div>
      <div className="categories-container">
        {categories.map((category, index) => (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            key={ index }
          >
            {category.strCategory}
          </button>
        ))}
      </div>
    </>

  );
}

export default Recipes;
