import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footerContener">
      <div>
        <a href="/drinks">
          <img
            src={ drinkIcon }
            alt="drinks"
            data-testid="drinks-bottom-btn"
          />
        </a>
        <a href="/meals">
          <img
            src={ mealIcon }
            alt="meals"
            data-testid="meals-bottom-btn"
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
