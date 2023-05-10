import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Register, { handleExistingUser } from './Register';
import React from 'react';
import configureStore from 'redux-mock-store';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('MovieApiService', () => {
  global.fetch = jest.fn();

  beforeEach(() => {
    fetch.mockClear();
  });

  const formdata = {
    address: '1234 www',
    docUrl: null,
    documentId: 'Pan Card',
    name: 'Test',
    phoneNo: 9998881122,
    photoUrl: null,
    userId: 1011
  };

  const testFile = new File(['hello'], 'hello.png', { type: 'image/png' });

  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();

  jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
    useSelector: () => mockSelector
  }));

  test('stimulating handleExistingUser with mock for existing user', () => {
    const formdata = {
      address: '1234 www',
      docUrl: null,
      documentId: 'Pan card',
      name: 'Rana Pratap Singh',
      phoneNo: 9998881122,
      photoUrl: null,
      userId: 1011
    };
    handleExistingUser(
      formdata,
      [
        {
          address: '1234 www',
          docUrl: null,
          documentId: 'Pan Card',
          name: 'Rana Pratap Singh',
          phoneNo: 9998881122,
          photoUrl: null,
          userId: 1011
        }
      ],
      {}
    );
  });

  it('stimulating handleExistingUser with mock for different user', () => {
    handleExistingUser(
      formdata,
      [
        {
          address: '1234 www',
          docUrl: null,
          documentId: 'Pan Card',
          name: 'Test 55',
          phoneNo: 9998881133,
          photoUrl: null,
          userId: 1012
        }
      ],
      mockDispatch
    );
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('stimulating handleExistingUser with mock for different user with Adhar Card as option', () => {
    const adharFormdata = {
      address: '1234 www',
      docUrl: null,
      documentId: 'Adhar Card',
      name: 'Test 55',
      phoneNo: 9998881134,
      photoUrl: null,
      userId: 1012
    };
    handleExistingUser(
      adharFormdata,
      [
        {
          address: '1234 www',
          docUrl: null,
          documentId: 'Adhar Card',
          name: 'Test 55',
          phoneNo: 9998881133,
          photoUrl: null,
          userId: 1012
        }
      ],
      mockDispatch
    );
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('stimulating handleExistingUser with mock for different user with Adhar Card as option', () => {
    const panCardFormdata = {
      address: '1234 www',
      docUrl: null,
      documentId: 'Voter Card',
      name: 'Test 55',
      phoneNo: 9998881135,
      photoUrl: null,
      userId: 1012
    };
    handleExistingUser(
      panCardFormdata,
      [
        {
          address: '1234 www',
          docUrl: null,
          documentId: 'Voter Card',
          name: 'Test 55',
          phoneNo: 9998881133,
          photoUrl: null,
          userId: 1012
        }
      ],
      mockDispatch
    );
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('stimulating handleExistingUser with mock for different user with default as option', () => {
    const panCardFormdata = {
      address: '1234 www',
      docUrl: null,
      documentId: 'None',
      name: 'Test 55',
      phoneNo: 9998881135,
      photoUrl: null,
      userId: 1012
    };
    handleExistingUser(
      panCardFormdata,
      [
        {
          address: '1234 www',
          docUrl: null,
          documentId: 'Voter Card',
          name: 'Test 55',
          phoneNo: 9998881133,
          photoUrl: null,
          userId: 1012
        }
      ],
      mockDispatch
    );
    expect(mockDispatch).toHaveBeenCalled();
  });

  test('renders learn react link', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              phoneNo: '12345'
            }
          ])
      })
    );
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
          <Register />
        </BrowserRouter>
      </Provider>
    );
    const nextBtn = screen.getByText('Next');
    fireEvent.click(nextBtn, { phoneNo: '12345' });
    expect(nextBtn).toBeInTheDocument();
  });

  test('renders learn react link', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve()
      })
    );
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
          <Register />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.getByText('Upload profile photo');
    expect(linkElement).toBeInTheDocument();
  });

  test('stimulating handleDocumentChange  input onchange handler for document upload', () => {
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
          <Register />
        </BrowserRouter>
      </Provider>
    );
    act(() => {
      /* fire events that update state */
      const fileInput = document.getElementById('document_upload_input');
      userEvent.upload(fileInput, testFile);
    });
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
          <Register />
        </BrowserRouter>
      </Provider>
    );
    act(() => {
      /* fire events that update state */
      const button = document.getElementById('document_upload_submit');
      fireEvent.click(button);
    });
  });
});
