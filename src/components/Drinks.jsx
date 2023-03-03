import React, { useContext } from 'react';
import context from '../context/myContext';
import Header from './Header';
import CardRevenues from './CardRevenues';

function Drinks() {
  const { listOfProducts } = useContext(context);
  const limit = 12;
  return (
    <div>
      <Header title="Drinks" />
      { listOfProducts.drinks
        && listOfProducts
          .drinks.map(({ strDrinkThumb, strDrink }, index) => index < limit && (
            <CardRevenues
              key={ index }
              src={ strDrinkThumb }
              name={ strDrink }
              index={ index }
            />
          ))}
    </div>
  );
}

export default Drinks;
