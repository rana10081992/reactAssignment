import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import DocumentUpload from './DocumentUpload';
import React from 'react';
import configureStore from 'redux-mock-store';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

jest.mock('../../feature/UserSlice', () => ({
  ...jest.requireActual('../../feature/UserSlice'),
  signUpCompletion: jest.fn().mockReturnValueOnce({ type: '/uploadPhoto' })
}));

jest.mock('firebase/storage', () => ({
  ...jest.requireActual('firebase/storage'),
  uploadBytesResumable: jest.fn().mockReturnValue({ on: jest.fn() })
}));

const testFile = new File(['hello'], 'hello.png', { type: 'image/png' });

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('DocumentComponentTest', () => {
  global.fetch = jest.fn();

  beforeEach(() => {
    fetch.mockClear();
  });

  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();

  jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
    useSelector: () => mockSelector
  }));

  test('stimulating handleDocumentChange input onchange handler for document upload', () => {
    const initialState = {
      user: {
        isSuccess: false,
        isError: true,
        initialSignUp: true,
        signUpErrorMsg: 'error'
      }
    };
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DocumentUpload />
        </BrowserRouter>
      </Provider>
    );
    const fileInput = screen.getByTestId('document_upload_input');
    const uploadBtn = screen.getByText('Upload Document');
    act(() => {
      /* fire events that update state */
      fireEvent.click(uploadBtn);
      fireEvent.change(fileInput, { target: { files: [testFile] } });
      fireEvent.click(uploadBtn);
    });
    expect(fileInput).toBeInTheDocument();
  });

  test('stimulating handlePropfilePhotoUpload button click handler for Finish button', () => {
    const initialState = {
      user: {
        isSuccess: false,
        isError: true,
        initialSignUp: true,
        signUpErrorMsg: 'error'
      }
    };
    const store = mockStore(initialState);
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <DocumentUpload />
        </BrowserRouter>
      </Provider>
    );
    const fileInput = screen.getByTestId('photo_upload_input');
    const uploadBtn = screen.getByText('Upload profile photo');
    act(() => {
      /* fire events that update state */
      fireEvent.click(uploadBtn);
      fireEvent.change(fileInput, { target: { files: [testFile] } });
      fireEvent.click(uploadBtn);
    });
    expect(fileInput).toBeInTheDocument();
  });

  test('stimulating handlePhotoSubmission button click handler for Finish button', () => {
    const initialState = {
      user: {
        isSuccess: false,
        isError: true,
        initialSignUp: true,
        signUpErrorMsg: 'error',
        userDetail: {}
      }
    };
    const store = mockStore(initialState);
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <DocumentUpload />
        </BrowserRouter>
      </Provider>
    );
    const fileInput = screen.getByText('Finish');
    act(() => {
      /* fire events that update state */
      fireEvent.click(fileInput);
    });
    expect(fileInput).toBeInTheDocument();
  });

  test('stimulating handlePhotoSubmission button click handler for Finish button', () => {
    const initialState = {
      user: {
        isSuccess: false,
        isError: true,
        initialSignUp: true,
        signUpErrorMsg: 'error'
      }
    };
    const store = mockStore(initialState);
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <DocumentUpload />
        </BrowserRouter>
      </Provider>
    );
    const fileInput = screen.getByText('Finish');
    act(() => {
      /* fire events that update state */
      fireEvent.click(fileInput);
    });
    expect(fileInput).toBeInTheDocument();
  });
});
