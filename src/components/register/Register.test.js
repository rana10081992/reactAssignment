import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Register, { handleExistingUser } from './Register';
import React from 'react';
import configureStore from 'redux-mock-store';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

jest.mock('../../feature/UserSlice', () => ({
  ...jest.requireActual('../../feature/UserSlice'),
  signUpCompletion: jest.fn().mockReturnValueOnce({type: '/uploadPhoto'})
}));

jest.mock('firebase/storage', () => ({
  ...jest.requireActual('firebase/storage'),
  uploadBytesResumable: jest.fn().mockReturnValue({ on: jest.fn()})
}));


const testFile = new File(['hello'], 'hello.png', { type: 'image/png' });

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

  it('stimulating handleExistingUser with no data', () => {
    handleExistingUser(
      null,
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

  test('stimulating handleDocumentChange input onchange handler for document upload', () => {
    const initialState = {
      user: {
        isSuccess: false,
        isError: true,
        initialSignUp: true,
        signUpErrorMsg: 'error',
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
          <Register />
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
          <Register />
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
        signUpErrorMsg: 'error',
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
    const fileInput = screen.getByText('Finish');
    act(() => {
      /* fire events that update state */
      fireEvent.click(fileInput);
    });
    expect(fileInput).toBeInTheDocument();
  });
});
