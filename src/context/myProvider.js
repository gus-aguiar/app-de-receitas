import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import MyContext from './myContext';
import { toggleAPI } from '../utils/getAPI';

function Provider({ children }) {
  const [ListOfProducts, setListOfProducts] = useState({});

  const handleSearch = async (event) => {
    event.preventDefault();
    const { target: { form: { radio, search } } } = event;
    if (radio.value === 'first-letter' && search.value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else setListOfProducts(await toggleAPI(radio.value, search.value));
  };

  const value = useMemo(() => ({
    handleSearch,
    ListOfProducts,
  }), [ListOfProducts]);
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
