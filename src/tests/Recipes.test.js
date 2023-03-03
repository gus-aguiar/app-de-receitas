import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(fetch));

describe('Testes do componete Recipes', () => {
  it('testa se os botões estão na tela', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    await waitFor(() => {
      const getList = screen.getAllByRole('button');
      expect(getList).toHaveLength(7);
    });
  });
  it('', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    await waitFor(() => {
      const getList = screen.getAllByTestId(/-recipe-card/);
      expect(getList).toHaveLength(12);
    });
  });
});
