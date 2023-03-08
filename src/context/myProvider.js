/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from './myContext';
import { toggleAPI } from '../utils/getAPI';

function Provider({ children }) {
  const [listOfProducts, setListOfProducts] = useState(undefined);
  const history = useHistory();
  const [isFavorite, setIsFavorite] = useState(false);

  const createObject = () => {
    const {
      strMeal,
      strDrink,
      strMealThumb,
      strDrinkThumb,
      idMeal,
      idDrink,
      strArea,
      strCategory,
      strAlcoholic,
    } = recipe[0];
    const type = strMeal ? 'meal' : 'drink';
    const name = strMeal || strDrink;
    const image = strMealThumb || strDrinkThumb;
    const idRecipe = idMeal || idDrink;
    return {
      id: idRecipe,
      type,
      nationality: strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
      name,
      image,
    };
  };

  const handleHeart = () => {
    setIsFavorite(!isFavorite);
    let favoriteRecipes;
    if (localStorage.getItem('favoriteRecipes')) {
      favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    }

    if (favoriteRecipes) {
      const newListFavorite = [
        ...favoriteRecipes,
        createObject(),
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newListFavorite));
    } else {
      const newListFavorite = [
        createObject(),
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newListFavorite));
    }
  };

  const handleResponse = (response, page) => {
    if (response === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (page === 'Drinks' && response.length === 1) {
      history.push(`/drinks/${response[0].idDrink}`);
    } else if (page === 'Meals' && response.length === 1) {
      history.push(`/meals/${response[0].idMeal}`);
    }
  };

  const handleSearch = async (event, page) => {
    const { target: { form: { radio, search } } } = event;
    // faz a validação se deve mostra um alerta ou fazer um requisição a API
    if (radio.value === 'first-letter' && search.value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const response = await toggleAPI(radio.value, search.value, page);
      if (response === null || response.length === 1) {
        handleResponse(response, page);
      } else {
        const maxNumber = 12;
        setListOfProducts(response.slice(0, maxNumber));
      }
    }
  };

  const value = useMemo(() => ({
    handleSearch,
    listOfProducts,
    handleHeart,
    isFavorite,
    setIsFavorite,
  }), [listOfProducts, handleSearch, handleHeart, isFavorite, setIsFavorite]);
  return (
    <MyContext.Provider value={ value }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default Provider;
