import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store';
import Header from './Header';
import React from 'react';

describe('Header comp', () => {
  test('renders header comp', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.getByText('Home');
    expect(linkElement).toBeInTheDocument();
  });
});
