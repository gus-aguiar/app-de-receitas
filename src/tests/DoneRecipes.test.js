import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import DoneRecipes from '../components/DoneRecipes';

describe('test do componente DoneRecipes', () => {
  beforeEach(() => {
    const recipes = [
      {
        id: '52874',
        type: 'meal',
        nationality: 'Italian',
        category: 'beef',
        alcoholicOrNot: 'non-alcoholic',
        name: 'Beef and Mustard Pie',
        image: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
        doneDate: '06/03/2023',
        tags: ['pie'],
      },
      {
        id: '178319',
        type: 'drink',
        alcoholicOrNot: 'alcoholic',
        name: 'A1',
        image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
        doneDate: '07/03/2023',
      },
    ];

    localStorage.setItem('doneRecipes', JSON.stringify(recipes));
  });

  afterEach(() => {
    localStorage.removeItem('doneRecipes');
  });
  it('o component renderiza as imagens das receitas feitas', () => {
    renderWithRouter(<DoneRecipes />);
    const title = screen.getByRole('heading', { level: 1, name: 'Done Recipes' });
    expect(title).toBeInTheDocument();
  });
  test('renders recipes that are meals', () => {
    renderWithRouter(<DoneRecipes />);
    const recipeImg = screen.getByAltText('Beef and Mustard Pie');
    const recipeName = screen.getByTestId('0-horizontal-name');
    const recipeTopText = screen.getByTestId('0-horizontal-top-text');
    const recipeDate = screen.getByTestId('0-horizontal-done-date');
    const recipeShareBtn = screen.getByTestId('0-horizontal-share-btn');
    const recipeTag = screen.getByTestId('0-pie-horizontal-tag');
    expect(recipeTopText).toHaveTextContent('Italian - beef');
    expect(recipeDate).toHaveTextContent('06/03/2023');
    expect(recipeTag).toHaveTextContent('pie');
    expect(recipeImg).toBeInTheDocument();
    expect(recipeName).toBeInTheDocument();
    expect(recipeShareBtn).toBeInTheDocument();
  });

  test('renders recipes that are drinks', () => {
    renderWithRouter(<DoneRecipes />);
    const recipeImg = screen.getByAltText('A1');
    const recipeName = screen.getByTestId('1-horizontal-name');
    const recipeTopText = screen.getByTestId('1-horizontal-top-text');
    const recipeDate = screen.getByTestId('1-horizontal-done-date');
    const recipeShareBtn = screen.getByTestId('1-horizontal-share-btn');
    expect(recipeTopText).toHaveTextContent('alcoholic');
    expect(recipeDate).toHaveTextContent('07/03/2023');
    expect(recipeImg).toBeInTheDocument();
    expect(recipeName).toBeInTheDocument();
    expect(recipeShareBtn).toBeInTheDocument();
  });
});
