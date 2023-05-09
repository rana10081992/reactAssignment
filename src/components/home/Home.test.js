import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store';
import Home from './Home';
import React from 'react';

describe('Home Screen', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ rates: { CAD: 1.42 } })
    })
  );

  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders document upload link', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.getByText('The Open Innovation Report 2023: how corporate-startup collaboration is the key to thriving amid economic turbulence');
    expect(linkElement).toBeInTheDocument();
  });
});
