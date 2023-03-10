import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

beforeEach(() => {
  global.fetch = jest.fn(fetch);
  global.alert = jest.fn();
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
  jest.restoreAllMocks();
});
test('Verifica se os elementos são renderizados na tela', () => {
  renderWithRouter(<App />, { initialEntries: ['/52977/in-progress'] });

  waitFor(() => {
    const clipboardMock = jest.fn();
    Object.assign(navigator, { clipboard: { writeText: clipboardMock } });
    const title = screen.getByTestId('recipe-title');
    expect(title).toBeInTheDocument();
    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
    const ingredientOne = screen.getByTestId('0-ingredient-name-and-measure');
    expect(ingredientOne).toBeInTheDocument();
    const checkBoxOne = screen.getByRole('checkbox', {
      name: /lentils - 1 cup/i,
    });
    expect(checkBoxOne).toBeInTheDocument();
    userEvent.click(checkBoxOne);
    expect(checkBoxOne).toBeChecked();
    const ingredientTwo = screen.getByTestId('1-ingredient-name-and-measure');
    expect(ingredientTwo).toBeInTheDocument();
    const shareBtn = screen.getByRole('button', {
      name: /share/i,
    });
    expect(shareBtn).toBeInTheDocument();
    const linkCopied = screen.getByText(/link copied!/i);
    expect(linkCopied).toBeInTheDocument();
    userEvent.click(shareBtn);
    expect(clipboardMock).toHaveBeenCalledWith('http://localhost:3000/meals/52977');
    const favoriteBtn = screen.getByRole('button', {
      name: /favorito/i,
    });
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toHaveLength(1);
    const finishBtn = screen.getByRole('button', {
      name: /finalizar receita/i,
    });
    expect(finishBtn).toBeInTheDocument();
  });
});
