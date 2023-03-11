import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  return (
    <div className="containerOfFooter">
      <footer data-testid="footer" className="footerContener">
        <a
          href="/drinks"
          className="iconFoote"
        >
          <img
            src={ drinkIcon }
            alt="drinks"
            data-testid="drinks-bottom-btn"
            className="icon"
          />
        </a>
        <a
          href="/meals"
          className="iconFoote"
        >
          <span className="icon">
            <img
              src={ mealIcon }
              alt="meals"
              data-testid="meals-bottom-btn"
              className="icon"
            />
          </span>
        </a>
      </footer>
    </div>
  );
}

export default Footer;
