import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store';
import DocumentUpload from './DocumentUpload';
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
    // const linkElement = screen.getByText(' % done');
    // const input = getByLabelText('% done');
    // expect(screen.getByDisplayValue('% done')).toBeInTheDocument();
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

  // test('stimulating handleDocumentUpload button click for user doc file upload', () => {
  //   const mockFun = jest.fn();
  //   const component = render(
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <DocumentUpload />
  //       </BrowserRouter>
  //     </Provider>
  //   );
  //   // act(() => {
  //     /* fire events that update state */
  //     const button = document.getElementById('document_button');
  //     fireEvent.click(button);
  //     const alertText = screen.getByText('Please upload an image first!')
  //     console.log('rana..... ', alertText);
  //     expect(alertText).toBe(true);
  //   // });
  // });
});
