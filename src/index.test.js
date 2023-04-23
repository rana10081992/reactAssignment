import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import store from './store';
import DocumentUpload from './components/document-upload/DocumentUpload';
import React from 'react';
import fetchMock from 'jest-fetch-mock';

describe('Index JS', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ rates: { CAD: 1.42 } })
    })
  );

  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders index file', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="home" element={<Home />} />
              <Route path="documentUpload" element={<DocumentUpload />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    );
    // const linkElement = screen.getByText('Upload to Firebase');
    // expect(linkElement).toBeInTheDocument();
  });
});
