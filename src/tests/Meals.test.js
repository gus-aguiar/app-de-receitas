import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

describe('Testes do componete Recipes', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
    global.alert = jest.fn();
  });

  // afterEach(() => {
  //   jest.restoreAllMocks();
  // });

  it('testa se os botões estão na tela meals', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    await waitFor(() => {
      const getList = screen.getAllByRole('button');
      expect(getList).toHaveLength(7);
    });
  });
  it('testa se os cards são renderizados na tela meals, sem filtro', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    await waitFor(() => {
      const getList = screen.getAllByTestId(/-recipe-card/);
      expect(getList).toHaveLength(12);
    });
  });
  it('testa se os cards são renderizados na tela meals, com filtro', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
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
    // await waitFor(() => {
    //   const gg = screen.getByText(/Corba/i);
    //   expect(gg).toBeInTheDocument();
    // });
    const ordinaryDrink = screen.getByRole('button', {
      name: /Beef/i,
    });
    act(() => userEvent.click(ordinaryDrink));
    await waitFor(() => {
      const gone = screen.getByText(/Beef and mustard pie/i);
      expect(gone).toBeInTheDocument();
    });
    await waitFor(() => {
      const getList = screen.getAllByTestId(/-card-img/);
      expect(getList).toHaveLength(12);
    });
  });
});
