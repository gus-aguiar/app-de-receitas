import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

describe('testa tela de login ', () => {
  it('Testa se os elementos estão na tela', async () => {
    const { history } = renderWithRouter(<App />);

    const nameFilter = await screen.findByTestId('email-input');
    const buttonFilter = await screen.findByTestId('login-submit-btn');
    const passwordFilter = await screen.findByTestId('password-input');
    expect(await screen.findByTestId('password-input')).toBeInTheDocument();
    expect(await screen.findByTestId('login-submit-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('email-input')).toBeInTheDocument();
    userEvent.type(nameFilter, 'T');
    expect(nameFilter).toHaveValue('T');
    userEvent.type(passwordFilter, 'T');
    expect(passwordFilter).toHaveValue('T');
    expect(buttonFilter).toBeDisabled();
    userEvent.type(nameFilter, 'Ta@ta.com');
    userEvent.type(passwordFilter, '1234567');

    await waitFor(() => {
      userEvent.click(buttonFilter);
      expect(history.location.pathname).toBe('/meals');
    });
    // expect(await history.location.pathname).toBe('/meals');
  });
});
