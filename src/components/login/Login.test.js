import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import React from 'react';
import configureStore from 'redux-mock-store';

const middlewares = [];
const mockStore = configureStore(middlewares);

jest.mock('../../feature/UserSlice', () => ({
  ...jest.requireActual('../../feature/UserSlice'),
  loginUser: jest.fn().mockReturnValueOnce({ type: '/login' })
}));

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
    const initialState = {
      user: {
        isSuccess: true,
        isError: false
      }
    };
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.getByText('Phone No');
    expect(linkElement).toBeInTheDocument();
  });

  test('renders learn react link 2', () => {
    const initialState = {
      user: {
        isSuccess: false,
        isError: true
      }
    };
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.getByText('Phone No');
    expect(linkElement).toBeInTheDocument();
  });

  test('handle form', () => {
    const initialState = {
      user: {
        isSuccess: true,
        isError: false
      }
    };
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const userName = screen.getByTestId('username-input');
    const password = screen.getByTestId('password-input');
    fireEvent.change(userName, {
      target: {
        value: 'test',
        name: 'username'
      }
    });

    fireEvent.change(password, {
      target: {
        value: 'test',
        name: 'password'
      }
    });
    const submitbtn = screen.getByText('Submit');
    fireEvent.click(submitbtn, {
      preventDefault: jest.fn()
    });
    expect(userName).toBeInTheDocument();
  });

  test('handle form', () => {
    const initialState = {
      user: {
        isSuccess: true,
        isError: false
      }
    };
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const userName = screen.getByTestId('username-input');
    const password = screen.getByTestId('password-input');
    fireEvent.change(userName, {
      target: {
        value: '',
        name: 'username'
      }
    });

    fireEvent.change(password, {
      target: {
        value: '',
        name: 'password'
      }
    });
    const submitbtn = screen.getByText('Submit');
    fireEvent.click(submitbtn, {
      preventDefault: jest.fn()
    });
    expect(userName).toBeInTheDocument();
  });
});
