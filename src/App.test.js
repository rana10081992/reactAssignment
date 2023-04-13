import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import App from './App';
import React from 'react';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
  <App />
      </BrowserRouter>
  </Provider>);
  const linkElement = screen.getByText("Learn React Assignment");
  screen.debug(linkElement);
  expect(linkElement).toBeInTheDocument();
});
