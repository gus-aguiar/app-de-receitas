import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

describe('testes do component Header', () => {
  const search = 'search-input';
  it('ao clicar no icon de perfil a pagina direciona para a pagina perfil', async () => {
    const { history } = renderWithRouter(<App />);
    await waitFor(() => {
      const buttonProfile = screen.getByTestId('profile-top-btn');
      userEvent.click(buttonProfile);
      expect(history.location.pathname).toBe('/profile');
    });
  });

  it('quando o diretório for / o Header deve conter um titulo com Login', () => {
    renderWithRouter(<App />);
    const getText = screen.getByText('login');
    expect(getText).toBeInTheDocument();
  });

  it('o input de busca não pode esta na tela', () => {
    renderWithRouter(<App />);
    const getSearch = screen.queryByTestId(search);
    expect(getSearch).not.toBeInTheDocument();
  });

  it('ao clicar no icon de busca o input deve aparecer ', () => {
    renderWithRouter(<App />);
    const getIcon = screen.getByTestId('search-top-btn');
    userEvent.click(getIcon);
    const getSearch = screen.getByTestId(search);
    expect(getSearch).toBeInTheDocument();
  });

  it('ao clicar duas vezes no icon de busca ele deve desaparecer', () => {
    renderWithRouter(<App />);
    const getIcon = screen.getByTestId('search-top-btn');
    userEvent.click(getIcon);
    userEvent.click(getIcon);
    const getSearch = screen.queryByTestId(search);
    expect(getSearch).not.toBeInTheDocument();
  });

  it('ao clicar no icon de perfil o titulo deve mudar para Profile', () => {
    renderWithRouter(<App />);
    const buttonProfile = screen.getByTestId('profile-top-btn');
    userEvent.click(buttonProfile);
    const getText = screen.getByText('Profile');
    expect(getText).toBeInTheDocument();
  });

  it('na pagina meals deve aparecer Meals no titulo', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const getText = screen.getByText('Meals');
    expect(getText).toBeInTheDocument();
  });

  it('na pagina Favorite Recipes deve aparecer Favorite Recipes no titulo', () => {
    renderWithRouter(<App />, { initialEntries: ['/favorite-recipes'] });
    const getText = screen.getByText('Favorite Recipes');
    expect(getText).toBeInTheDocument();
  });

  it('na pagina Done Recipes deve aparecer Done Recipes no titulo', () => {
    renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });
    const getText = screen.getByText('Done Recipes');
    expect(getText).toBeInTheDocument();
  });

  it('na pagina Drinks deve aparecer Drinks no titulo', () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const getText = screen.getByText('Drinks');
    expect(getText).toBeInTheDocument();
  });
});
