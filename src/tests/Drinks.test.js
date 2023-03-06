import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(fetch));

// afterEach(() => {
//   jest.restoreAllMocks();
// });

describe('Testes do componete Recipes', () => {
  it('testa se os botões estão na tela drinks', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    await waitFor(() => {
      const getList = screen.getAllByRole('button');
      expect(getList).toHaveLength(7);
    });
  });
  it('testa se os cards são renderizados na tela drinks, sem filtro', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    await waitFor(() => {
      const getList = screen.getAllByTestId(/-recipe-card/);
      expect(getList).toHaveLength(12);
    });
  });
  it('testa se os cards são renderizados na tela drinks, com filtro', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    await waitFor(() => {
      const getList = screen.getAllByTestId(/-recipe-card/);
      expect(getList).toHaveLength(12);
    });
    const filter = screen.getByTestId('All-category-filter');
    act(() => userEvent.click(filter));
    await waitFor(() => {
      const getList = screen.getAllByTestId(/-recipe-card/);
      expect(getList).toHaveLength(12);
    });
    await waitFor(() => {
      const gg = screen.getByText(/gg/i);
      expect(gg).toBeInTheDocument();
    });
    const ordinaryDrink = screen.getByRole('button', {
      name: /ordinary drink/i,
    });
    act(() => userEvent.click(ordinaryDrink));
    await waitFor(() => {
      const gone = screen.getByText(/410 gone/i);
      expect(gone).toBeInTheDocument();
    });
    act(() => userEvent.click(ordinaryDrink));
    await waitFor(() => {
      const gg = screen.getByText(/gg/i);
      expect(gg).toBeInTheDocument();
    });
    await waitFor(() => {
      const getList = screen.getAllByTestId(/-card-img/);
      expect(getList).toHaveLength(12);
    });
  });
  it('testa se os botões estão na tela meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => {
      const getList = screen.getAllByRole('button');
      expect(getList).toHaveLength(7);
    });
  });
});
