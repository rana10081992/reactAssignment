import React from 'react';
import { render } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

describe('App', () => {
  let navigateMock, dispatchMock;
  beforeEach(() => {
    navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    // useSelectorMock = jest.fn();
    useSelector.mockReturnValue({ isSuccess: false });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // it('should render Login and Register links when user is not logged in', () => {
  //   render(<Provider store={store}>
  //     <BrowserRouter>
  //       <App />
  //     </BrowserRouter>
  //   </Provider>);
  //   expect(screen.getByText('Login')).toBeInTheDocument();
  //   expect(screen.getByText('Register')).toBeInTheDocument();
  // });

  // it('should render Logout button when user is logged in', () => {
  //   useSelector.mockReturnValue({ isSuccess: true });
  //   render(<Provider store={store}>
  //     <BrowserRouter>
  //       <App />
  //     </BrowserRouter>
  //   </Provider>);
  //   expect(screen.getByText('Logout')).toBeInTheDocument();
  // });

  // it('should navigate to /login when user is not logged in', () => {
  // useSelector.mockReturnValue({ isSuccess: true });
  //   render(
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <App />
  //       </BrowserRouter>
  //     </Provider>
  //   );
  //   expect(isSuccess).toEqual(true);
  // });

  it('should navigate to /login when user is not logged in', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(navigateMock).toHaveBeenCalledWith('/login');
  });

  // it('should clear state and navigate to /login when Logout button is clicked', () => {
  //   useSelector.mockReturnValue({ isSuccess: true });
  //   render(<Provider store={store}>
  //     <BrowserRouter>
  //       <App />
  //     </BrowserRouter>
  //   </Provider>);
  //   const logoutButton = screen.getByText('Logout');
  //   screen.debug(logoutButton);
  //   expect(logoutButton).toBeInTheDocument();
  //   logoutButton.click();
  //   expect(dispatchMock).toHaveBeenCalledWith(clearState());
  //   expect(navigateMock).toHaveBeenCalledWith('/login');
  // });
});
