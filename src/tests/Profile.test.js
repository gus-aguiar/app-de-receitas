import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import Profile from '../components/Profile';

describe('Teste a Page Profile', () => {
  const email = { email: 'trybe@trybe.com' };
  localStorage.setItem('user', JSON.stringify(email));

  test('verifica se é renderizado 3 buttons na tela', () => {
    renderWithRouter(<Profile />, { initialEntries: ['/profile'] });
    const btnDone = screen.getByTestId('profile-done-btn');
    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    const btnLogout = screen.getByTestId('profile-logout-btn');

    expect(btnDone).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();
    expect(btnLogout).toBeInTheDocument();
  });

  test('verifica se ao clicar no botão é redirecionado para pagina favoritos', async () => {
    const { history } = renderWithRouter(<Profile />);

    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    userEvent.click(btnFavorite);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });

  test('verifica se ao clicar no botão é redirecionado para pagina favoritos', () => {
    const { history } = renderWithRouter(<Profile />);

    const btnDone = screen.getByRole('button', { name: /Done Recipes/i });
    userEvent.click(btnDone);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('Mostre se o botão funciona corretamente e limpa o localStorage.', () => {
    window.localStorage.setItem('user', JSON.stringify({ email: 'test@example.com' }));

    const { getByTestId } = renderWithRouter(<Profile />);
    const logoutButton = getByTestId('profile-logout-btn');

    userEvent.click(logoutButton);

    expect(window.localStorage.getItem('user')).toBeNull();
    expect(window.location.pathname).toEqual('/');
  });
});
