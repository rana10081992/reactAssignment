import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store';
import DocumentUpload from './DocumentUpload';
import React from 'react';
import configureStore from 'redux-mock-store';

describe('Document Upload', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ rates: { CAD: 1.42 } })
    })
  );

  beforeEach(() => {
    fetch.mockClear();
  });
  const testFile = new File(['hello'], 'hello.png', { type: 'image/png' });

  test('renders document upload link', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DocumentUpload />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.getByText('Upload Document');
    expect(linkElement).toBeInTheDocument();
  });

  test('renders document upload and check done text presence', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DocumentUpload />
        </BrowserRouter>
      </Provider>
    );
  });

  test('stimulating handleDocumentChange  input onchange handler for document upload', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DocumentUpload />
        </BrowserRouter>
      </Provider>
    );
    act(() => {
      /* fire events that update state */
      const fileInput = document.getElementById('document_upload_input');
      userEvent.upload(fileInput, testFile);
    });
  });

  test('stimulating handleDocumentChange  input onchange handler for document upload', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DocumentUpload />
        </BrowserRouter>
      </Provider>
    );
    act(() => {
      /* fire events that update state */
      const fileInput = document.getElementById('profile_upload_input');
      userEvent.upload(fileInput, testFile);
    });
  });

  test('stimulating handlePhotoSubmission button click handler for Finish button', () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <DocumentUpload />
        </BrowserRouter>
      </Provider>
    );
    act(() => {
      /* fire events that update state */
      const button = document.getElementById('document_upload_submit');
      fireEvent.click(button);
    });
  });

  test('stimulating photo documenmt upload method', () => {
    const useStateMock = jest.fn();
    const useStateSpy = (init) => [init, useStateMock];
    jest.spyOn(React, 'useState').mockImplementation(useStateSpy);
    const fileMock = {};
    // Mocking the initial state of 'file' to be an empty string
    useStateMock.mockReturnValue([fileMock, jest.fn()]);
    const initialState = {
      user: {
        isSuccess: false,
        isError: true,
        initialSignUp: true,
        signUpErrorMsg: 'error'
      }
    };
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    const store = mockStore(initialState);
    window.alert = jest.fn();
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <DocumentUpload />
        </BrowserRouter>
      </Provider>
    );
    act(() => {
      /* fire events that update state */
      const button = document.getElementById('document_button');
      fireEvent.click(button);
    });
  });

  test('stimulating photo upload method', () => {
    const useStateMock = jest.fn();
    const useStateSpy = (init) => [init, useStateMock];
    jest.spyOn(React, 'useState').mockImplementation(useStateSpy);
    const fileMock = {};
    // Mocking the initial state of 'file' to be an empty string
    useStateMock.mockReturnValue([fileMock, jest.fn()]);
    const initialState = {
      user: {
        isSuccess: false,
        isError: true,
        initialSignUp: true,
        signUpErrorMsg: 'error'
      }
    };
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    const store = mockStore(initialState);
    window.alert = jest.fn();
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <DocumentUpload />
        </BrowserRouter>
      </Provider>
    );
    act(() => {
      /* fire events that update state */
      const button = document.getElementById('profile_button');
      fireEvent.click(button);
    });
  });
});
