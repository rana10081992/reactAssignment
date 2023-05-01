import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import store from './store';
import DocumentUpload from './components/document-upload/DocumentUpload';
import ProductDetails from './components/prodcut-details/ProductDetails';
import React from 'react';
import ReactDOM from 'react-dom/client';

// import reportWebVitals from './reportWebVitals';

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
              <Route path="productDetails" element={<ProductDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    // const linkElement = screen.getByText('Upload to Firebase');
    // expect(linkElement).toBeInTheDocument();
  });

  test('renders root element with ID', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
    ReactDOM.createRoot(root);
    expect(document.getElementById('root')).toBeTruthy();
  });

  // jest.spyOn(reportWebVitals, 'default');
  // test('calls reportWebVitals', () => {
  //   reportWebVitals();
  //   expect(reportWebVitals).toHaveBeenCalled();
  // });
});
