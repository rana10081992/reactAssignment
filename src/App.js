import './App.css';
import { Link, Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, clearState } from './feature/UserSlice';
import sopraLogo from './assets/sopraLogo.png';
import Header from './components/header/Header';

function App() {
  // for dsiapatch actions
  const dispatch = useDispatch();

  //for user navigation
  const navigate = useNavigate();

  //iSuccess selector to check wheter user has leegedIn
  const { isSuccess } = useSelector(userSelector);

  useEffect(() => {
    if (isSuccess) {
      navigate('/home');
    } else {
      localStorage.removeItem('docUrl');
      localStorage.removeItem('profileUrl');
      navigate('/login');
    }
  }, [isSuccess]);

  const logoutUser = () => {
    // clear photo data
    localStorage.removeItem('docUrl');
    localStorage.removeItem('profileUrl');
    dispatch(clearState());
  };

  return (
    <div className="App">
      {!isSuccess ? (
        <div className="text-center">
          <div className="my-3 flex justify-center items-center">
            <img src={sopraLogo} className="mx-auto"></img>
          </div>
          <Link to="/login">
            <button
              className="text-blue-500 background-transparent text-xl font-bold px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button">
              Signin
            </button>
          </Link>
          {' | '}
          <Link to="/register" className="link_text">
            <button
              className="text-blue-500 background-transparent text-xl font-bold px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button">
              New User
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <Header />
          <button onClick={logoutUser} className="btn btn-primary float-end mx-3 my-3 ">
            Logout
          </button>

          <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{' '}
              <a href="https://sopra.com/" className="hover:underline">
                Sopra
              </a>
              . All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </footer>
        </div>
      )}
      <br />
      <Outlet />
    </div>
  );
}

export default App;
