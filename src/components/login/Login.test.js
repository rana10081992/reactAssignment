import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store';
import Login from './Login';
import React from 'react';

describe('Login screen', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ rates: { CAD: 1.42 } })
    })
  );

  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders learn react link', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.getByText('Phone No');
    screen.debug(linkElement);
    expect(linkElement).toBeInTheDocument();
  });
});
