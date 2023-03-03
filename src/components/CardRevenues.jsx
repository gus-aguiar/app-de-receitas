import React from 'react';

function revenues({ src, name, index }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ src }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <p
        data-testid={ `${index}-card-name` }
      >
        {name}

      </p>
    </div>
  );
}

export default revenues;
