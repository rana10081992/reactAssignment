import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store';
import Register, { handleExistingUser } from './Register';
import React from 'react';
describe('MovieApiService', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ rates: { CAD: 1.42 } })
    })
  );

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

  const testFile = new File(['hello'], 'hello.png', { type: 'image/png' });

  test('renders learn react link', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.getByText('Address');
    screen.debug(linkElement);
    expect(linkElement).toBeInTheDocument();
  });

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
});
