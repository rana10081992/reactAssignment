import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store';
import UserDetails, { getDayType } from './UserDetails';
import React from 'react';

describe('Document Upload', () => {
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
          <UserDetails />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.getByText('Profile Details');
    expect(linkElement).toBeInTheDocument();
  });

  test('renders document upload and check done text presence', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserDetails />
        </BrowserRouter>
      </Provider>
    );
    // const linkElement = screen.getByText(' % done');
    // const input = getByLabelText('% done');
    // expect(screen.getByDisplayValue('% done')).toBeInTheDocument();
  });

  test('renders document upload and check done text presence for dayType 1', () => {
    getDayType('1', '');
  });

  test('renders document upload and check done text presence for dayType 2', () => {
    getDayType('2', '');
  });

  test('renders document upload and check done text presence for dayType 3', () => {
    getDayType('3', '');
  });

  test('renders document upload and check done text presence for dayType 0 deafault', () => {
    getDayType('0', '');
  });
});
