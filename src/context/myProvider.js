/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from './myContext';
import { toggleAPI } from '../utils/getAPI';

function Provider({ children }) {
  const [listOfProducts, setListOfProducts] = useState(undefined);
  const history = useHistory();

  const handleResponse = (response, page) => {
    if (response === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (page === 'Drinks') {
      history.push(`/drinks/${response[0].idDrink}`);
    } else if (page === 'Meals') {
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
      handleResponse(response, page);
      setListOfProducts(response);
    }
  };

  const value = useMemo(() => ({
    handleSearch,
    listOfProducts,
  }), [listOfProducts, handleSearch]);
  return (
    <MyContext.Provider value={ value }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.any,
}.isRquired;

export default Provider;
