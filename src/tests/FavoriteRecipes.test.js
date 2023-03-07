import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

describe('test do component favoriteRecipes', () => {
  // beforeEach(() => {
  //   class LocalStorageMock {
  //     constructor() {
  //       this.store = {
  //
  //       };
  //     }

  //     clear() {
  //       this.store = {};
  //     }

  //     getItem(key) {
  //       return this.store[key] || null;
  //     }

  //     setItem(key, value) {
  //       this.store[key] = String(value);
  //     }

  //     removeItem(key) {
  //       delete this.store[key];
  //     }
  //   }

  //   global.localStorage = new LocalStorageMock();
  // });
  const favoriteRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];
  const initialEntries = ['/favorite-recipes'];
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  it('a imagem e renderizada ', () => {
    renderWithRouter(<App />, { initialEntries });
    const getImage = screen.getAllByTestId(/-horizontal-image/);
    expect(getImage).toHaveLength(4);
  });
  it('o titulo da receita e renderizado', () => {
    renderWithRouter(<App />, { initialEntries });
    const getText = screen.getByText('Spicy Arrabiata Penne');
    expect(getText).toBeInTheDocument();
  });
  it('ao clicar no filtro de meals deve ser renderizado so comida', () => {
    renderWithRouter(<App />, { initialEntries });
    const btnMeals = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(btnMeals);
    const getImage = screen.getAllByTestId(/-horizontal-image/);
    expect(getImage).toHaveLength(2);
  });
  it('ao clicar no filtro de drinks deve ser renderizado so comida', () => {
    renderWithRouter(<App />, { initialEntries });
    const btnDrinks = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(btnDrinks);
    const getImage = screen.getAllByTestId(/-horizontal-image/);
    expect(getImage).toHaveLength(2);
  });
  it('depois de aplicar o filtro ao clicar em all deve reseta os filtros', () => {
    renderWithRouter(<App />, { initialEntries });
    const btnDrinks = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(btnDrinks);
    const btnAll = screen.getByTestId('filter-by-all-btn');
    userEvent.click(btnAll);
    const getImage = screen.getAllByTestId(/-horizontal-image/);
    expect(getImage).toHaveLength(4);
  });
  it('ao clicar em desfavoritar deve remover a receita', () => {
    renderWithRouter(<App />, { initialEntries });
    const btnDesfavor = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(btnDesfavor);
    const getImage = screen.getAllByTestId(/-horizontal-image/);
    expect(getImage).toHaveLength(4);
  });
  it('apos clicar em compartilhar deve ser direcionado para a roda correta', () => {
    const clipboardMock = jest.fn();
    Object.assign(navigator, { clipboard: { writeText: clipboardMock } });
    renderWithRouter(<App />, { initialEntries });
    const getName = screen.getAllByTestId('0-horizontal-share-btn')[0];
    userEvent.click(getName);
    expect(clipboardMock).toHaveBeenCalledWith('http://localhost:3000/drinks/');
  });
});
