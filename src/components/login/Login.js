import React, { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, userSelector, clearState } from '../../feature/UserSlice';

// Login component
const Login = () => {
  // to dispatch the action
  const dispatch = useDispatch();

  // to handle the form submit
  const { handleSubmit } = useForm();

  // variables to read fetch, success and error from redux store
  const { isFetching, isSuccess, isError } = useSelector(userSelector);

  // handle the onSubmit sceanrio
  const onSubmit = (data) => {
    // dispatch login action on method call
    dispatch(loginUser(data));
  };

  // variable to handle the navigation
  const navigate = useNavigate();

  // default method once component render is commpleted
  useEffect(() => {
    return () => {
      // dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    // handle error part
    if (isError) {
      // on error state dispatch and clear the data state
      dispatch(clearState());
    }
    // handle success part
    if (isSuccess) {
      // on True route to Home
      navigate('/home');
    }
  }, [isError, isSuccess]);

  return (
    <Fragment>
      <div className="form">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="text-center py-3 ">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} method="get">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 py-1 mt-2">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button type="submit" className="loginButton btn btn-primary mt-4">
                {isFetching ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
