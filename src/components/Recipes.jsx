import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/myContext';
import
{ getMeals,
  getDrinks,
  getMealsCategories,
  getDrinksCategories,
  getDrinksFiltered,
  getMealsFiltered,
} from '../services/recipesAPI';
import Header from './Header';
import RecipeCard from './RecipeCard';
import '../styles/recipes.css';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pathname, setPathname] = useState('');
  const [filter, setFilter] = useState([]);
  const [toggle, setToggle] = useState(true);
  const { listOfProducts } = useContext(context);
  const history = useHistory();

  useEffect(() => {
    if (listOfProducts) {
      setRecipes(listOfProducts);
    } else {
      const fetchData = async () => {
        const endpoint = history
          .location.pathname === '/meals' ? 'getMeals' : 'getDrinks';
        if (history.location.pathname === '/meals') {
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
    }
  }, [listOfProducts, history]);

  const handleFilter = async (category) => {
    const data = await (pathname === 'Meals'
      ? getMealsFiltered(category)
      : getDrinksFiltered(category));
    const maxNumber = 12;
    setFilter(data.slice(0, maxNumber));
    setToggle(false);
  };
  const cleanToggle = () => {
    setFilter([]);
    setToggle(true);
  };

  return (
    <>
      <Header title={ pathname } />
      <div className="categories-container">
        {categories.map((category, index) => (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            key={ index }
            onClick={ () => (toggle
              ? handleFilter(category.strCategory)
              : cleanToggle()) }
          >
            {category.strCategory}
          </button>
        ))}
      </div>
      <div>
        <button
          data-testid="All-category-filter"
          onClick={ () => setFilter([]) }
        >
          All

        </button>
      </div>
      <div className="recipes-container">
        {filter.length > 0
          ? (filter.map((recipe, index) => (
            <RecipeCard
              key={ recipe.idMeal || recipe.idDrink }
              recipe={ recipe }
              index={ index }
            />)))
          : (recipes.map((recipe, index) => (
            <RecipeCard
              key={ recipe.idMeal || recipe.idDrink }
              recipe={ recipe }
              index={ index }
            />
          )))}
      </div>
    </>
  );
}

export default Recipes;
