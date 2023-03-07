import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

describe('test do componente SearchBar', () => {
  const buttonSearch = 'search-top-btn';
  const submitButton = 'exec-search-btn';
  const radioName = 'name-search-radio';
  const inputSearch = 'search-input';
  it('o component possui um input radio name', () => {
    renderWithRouter(<App />);
    const getIcon = screen.getByTestId(buttonSearch);
    userEvent.click(getIcon);
    const inputRadio = screen.getAllByRole('radio');
    expect(inputRadio).toHaveLength(3);
  });

  it('tem o button submit na tela', () => {
    renderWithRouter(<App />);
    const getIcon = screen.getByTestId(buttonSearch);
    userEvent.click(getIcon);
    const getButton = screen.getByTestId(submitButton);
    expect(getButton).toBeInTheDocument();
  });

  it('ao encontra um item você é direcionado para /meals/id-da-receita', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const getIcon = screen.getByTestId(buttonSearch);
    userEvent.click(getIcon);
    const getRadio = screen.getByTestId(radioName);
    userEvent.click(getRadio);
    const getInput = screen.getByTestId(inputSearch);
    userEvent.type(getInput, 'Aquamarine');
    await waitFor(() => {
      const getButton = screen.getByText('buscar');
      userEvent.click(getButton);
      expect(history.location.pathname).toEqual('/drinks/178319');
    });
  });
});
