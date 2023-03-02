import PropTypes from 'prop-types';
import React from 'react';
import MyContext from './myContext';

function Provider({ children }) {
  return (
    <MyContext.Provider value="">
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.any,
}.isRquired;

export default Provider;
