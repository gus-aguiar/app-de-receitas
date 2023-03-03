import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

describe('test do componente SearchBar', () => {
  const buttonSearch = 'search-top-btn';
  it('o comonent possui um input radion name', () => {
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
    const getButton = screen.getByTestId('exec-search-btn');
    expect(getButton).toBeInTheDocument();
  });
});
