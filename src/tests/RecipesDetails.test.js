import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import RecipesDetails from '../components/RecipeDetails';

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

describe('test ', () => {
  it('tem um imagem da receita', async () => {
    renderWithRouter(<RecipesDetails />);
    await waitFor(() => {
      const img = screen.getByTestId('recipe-photo');
      expect(img).toBeInTheDocument();
    });
  });
});
