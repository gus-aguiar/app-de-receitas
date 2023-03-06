import React, { useEffect, useState } from 'react';
import Header from './Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const [isFilter, setIsFilter] = useState([]);
  // const recipes = [
  //   {
  //     id: '52874',
  //     type: 'meal',
  //     nationality: 'Italian',
  //     category: 'beef',
  //     alcoholicOrNot: 'non-alcoholic',
  //     name: 'Beef and Mustard Pie',
  //     image: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
  //     doneDate: '06/03/2023',
  //     tags: ['pie'],
  //   },
  // ];

  // localStorage.setItem('doneRecipes', JSON.stringify(recipes));

  function copyUrl(event) {
    if (event.target.name === 'meal') {
      const url = `http://localhost:3000/meals/${event.target.id}`;
      console.log(url);
      navigator.clipboard.writeText(url);
      alert('Link copied!');
      setIsUrlCopied(true);
    }
    if (event.target.name === 'drink') {
      const url = `http://localhost:3000/drinks/${event.target.id}`;
      console.log(url);
      navigator.clipboard.writeText(url);
      alert('Link copied!');
      setIsUrlCopied(true);
    }
  }
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  function filterByAll() {
    const all = doneRecipes;
    setIsFilter(all);
  }
  function filterByMeal() {
    const meal = doneRecipes.filter((recipe) => recipe.type === 'meal');
    setIsFilter(meal);
  }
  function filterByDrink() {
    const drink = doneRecipes.filter((recipe) => recipe.type === 'drink');
    setIsFilter(drink);
  }
  useEffect(() => {
    const all = doneRecipes;
    setIsFilter(all);
  }, []);

  return (
    <div>
      <Header title="Done Recipes" />
      <button data-testid="filter-by-all-btn" onClick={ filterByAll }>All</button>
      <button data-testid="filter-by-meal-btn" onClick={ filterByMeal }>Meals</button>
      <button data-testid="filter-by-drink-btn" onClick={ filterByDrink }>Drinks</button>
      {isFilter.map((recipe, index) => (
        recipe.type === 'meal' ? (
          <div key={ recipe.id }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.nationality} - ${recipe.category}`}
            </p>

            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>

            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ copyUrl }
              label="share"
              id={ recipe.id }
              name={ recipe.type }
            >
              <img
                src={ shareIcon }
                alt={ recipe.name }
                id={ recipe.id }
                name={ recipe.type }
              />

            </button>
            {isUrlCopied && <p>Link copied!</p>}
            {recipe.tags.map((tag, i) => (
              <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ i }>{tag}</p>
            ))}
          </div>
        )
          : (
            <div key={ recipe.id }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
              <p
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </p>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.alcoholicOrNot}
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                onClick={ copyUrl }
                label="share"

              >
                <img
                  src={ shareIcon }
                  alt={ recipe.name }
                  id={ recipe.id }
                  name={ recipe.type }
                />

              </button>
              {isUrlCopied && <p>Link copied!</p>}

            </div>)

      ))}

    </div>
  );
}

export default DoneRecipes;
