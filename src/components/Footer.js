import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footerContener">
      <a
        href="/drinks"
        className="iconFoote"
      >
        <img
          src={ drinkIcon }
          alt="drinks"
          data-testid="drinks-bottom-btn"
        />
      </a>
      <a
        href="/meals"
        className="iconFoote"
      >
        <img
          src={ mealIcon }
          alt="meals"
          data-testid="meals-bottom-btn"
        />
      </a>
    </footer>
  );
}

export default Footer;
