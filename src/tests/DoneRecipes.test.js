import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  test('o componente renderiza as comidas', () => {
    renderWithRouter(<DoneRecipes />);
    const recipeImgMeal = screen.getAllByAltText('Beef and Mustard Pie');
    const recipeNameMeal = screen.getByTestId('0-horizontal-name');
    const recipeTopText = screen.getByTestId('0-horizontal-top-text');
    const recipeDate = screen.getByTestId('0-horizontal-done-date');
    const recipeTag = screen.getByTestId('0-pie-horizontal-tag');
    expect(recipeTopText).toHaveTextContent('Italian - beef');
    expect(recipeDate).toHaveTextContent('06/03/2023');
    expect(recipeTag).toHaveTextContent('pie');
    expect(recipeImgMeal.length).toBe(2);
    expect(recipeNameMeal).toBeInTheDocument();
  });

  test('o componente renderiza os drinks', () => {
    renderWithRouter(<DoneRecipes />);
    const recipeImgDrink = screen.getAllByAltText('A1');
    const recipeNameDrink = screen.getByTestId('1-horizontal-name');
    const recipeTopText = screen.getByTestId('1-horizontal-top-text');
    const recipeDate = screen.getByTestId('1-horizontal-done-date');
    expect(recipeTopText).toHaveTextContent('alcoholic');
    expect(recipeDate).toHaveTextContent('07/03/2023');
    expect(recipeImgDrink.length).toBe(2);
    expect(recipeNameDrink).toBeInTheDocument();
  });
  test('o componente renderiza os botões', () => {
    renderWithRouter(<DoneRecipes />);
    const filterByDrinkBtn = screen.getByTestId('filter-by-drink-btn');
    const filterByMealBtn = screen.getByTestId('filter-by-meal-btn');
    const filterAllBtn = screen.getByTestId('filter-by-all-btn');
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(filterByDrinkBtn).toBeInTheDocument();
    expect(filterByMealBtn).toBeInTheDocument();
    expect(filterAllBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(filterByDrinkBtn);
    const recipeImg = screen.getAllByAltText('A1');
    expect(recipeImg.length).toBe(2);
    userEvent.click(filterByMealBtn);
    userEvent.click(filterAllBtn);
    const recipeImgAll = screen.getAllByAltText('A1');
    expect(recipeImgAll.length).toBe(2);
  });
  test('o botão que copia para a Àrea de transferência das Meals', () => {
    const clipboardMock = jest.fn();
    Object.assign(navigator, { clipboard: { writeText: clipboardMock } });
    renderWithRouter(<DoneRecipes />);
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    const shareBtnTwo = screen.getByTestId('1-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();
    expect(shareBtnTwo).toBeInTheDocument();
    userEvent.click(shareBtn);
    expect(clipboardMock).toHaveBeenCalledWith('http://localhost:3000/meals/52874');
    const shareText = screen.getAllByText('Link copied!');
    expect(shareText.length).toBe(2);
  });
  test('o botão que copia para a Àrea de transferência das Meals', () => {
    const clipboardMock = jest.fn();
    Object.assign(navigator, { clipboard: { writeText: clipboardMock } });
    renderWithRouter(<DoneRecipes />);
    const shareBtnTwo = screen.getByTestId('1-horizontal-share-btn');
    expect(shareBtnTwo).toBeInTheDocument();
    userEvent.click(shareBtnTwo);
    expect(clipboardMock).toHaveBeenCalledWith('http://localhost:3000/drinks/178319');
  });
});
