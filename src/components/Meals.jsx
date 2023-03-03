import React, { useContext } from 'react';
import context from '../context/myContext';
import Header from './Header';
import CardRevenues from './CardRevenues';

function Meals() {
  const { listOfProducts } = useContext(context);
  const limit = 12;
  return (
    <div>
      <Header title="Meals" />
      { listOfProducts.meals
        && listOfProducts
          .meals.map(({ strMealThumb, strMeal }, index) => index < limit && (
            <CardRevenues
              key={ index }
              src={ strMealThumb }
              name={ strMeal }
              index={ index }
            />
          ))}
    </div>
  );
}

export default Meals;
