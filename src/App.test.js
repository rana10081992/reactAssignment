import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

const middlewares = []
const mockStore = configureStore(middlewares)

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('App', () => {
  let navigateMock;
    navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

  it('should navigate to /login when user is not logged in', () => {
  const initialState = {
    user: {
      isSuccess: true
    }
  }
  const store = mockStore(initialState)
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const logoutBtn = screen.getByText('Logout');
    fireEvent.click(logoutBtn);
    expect(navigateMock).toHaveBeenCalledWith('/home');
  });

  it('should navigate to /login when user is not logged in', () => {
    const initialState = {
      user: {
        isSuccess: false
      }
    }
    const store = mockStore(initialState)
      render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      );
      expect(navigateMock).toHaveBeenCalledWith('/login');
    });
});
