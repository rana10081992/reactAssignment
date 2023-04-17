import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../feature/UserSlice';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, userSelector, clearState } from '../../feature/UserSlice';

const Register = () => {
  // to dispatch the action
  const dispatch = useDispatch();

  const [documentId, setDocumentId] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  // variables to read fetch, success and error from redux store
  const { isFetching, isSuccess, isError } = useSelector(userSelector);

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

  const getAllUsers = async () => {
    const res = await fetch('http://localhost:3000/getAllUsers', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('rana API res is... ', res);
    const result = await res.json();
    console.log('rana..... result is....', result);
    return result;
  };

  const submitRegistration = (event) => {
    event.preventDefault();
    console.log('rana ,ethod calling.... ', event);
    let userDetails = {
      loggedIn: true,
      token: 'aabbccdd-1122-3344XXXXXX',
      status: 200,
      documentId: 2000,
      title: 'TEST TEST TEST TEST',
      name: 'test React 2000',
      phoneNo: '987654200',
      author: 'typicodeSSSSS',
      msg: 'successful loggedInSSSSS'
    };
    // dispatch signup/registration action on method call
    dispatch(signupUser(userDetails));
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'firstName') {
      // setFirstName(value);
    }
    if (id === 'lastName') {
      // setLastName(value);
    }
    if (id === 'documentId') {
      setDocumentId(value);
    }
    if (id === 'password') {
      setPassword(value);
    }
    if (id === 'confirmPassword') {
      // setConfirmPassword(value);
    }
  };

  return (
    <div className="form">
      <form onSubmit={submitRegistration}>
        <div className="form-body">
          <div className="username">
            <label className="form__label" htmlFor="firstName">
              First Name{' '}
            </label>
            <input
              onChange={(e) => handleInputChange(e)}
              className="form__input"
              type="text"
              id="firstName"
              placeholder="First Name"
            />
          </div>
          <div className="lastname">
            <label className="form__label" htmlFor="lastName">
              Last Name{' '}
            </label>
            <input
              onChange={(e) => handleInputChange(e)}
              type="text"
              name=""
              id="lastName"
              className="form__input"
              placeholder="LastName"
            />
          </div>
          <div className="documentId">
            <label className="form__label" htmlFor="documentId">
              documentId{' '}
            </label>
            <input
              onChange={(e) => handleInputChange(e)}
              type="text"
              id="documentId"
              className="form__input"
              placeholder="documentId"
            />
          </div>
          <div className="password">
            <label className="form__label" htmlFor="password">
              Password{' '}
            </label>
            <input
              onChange={(e) => handleInputChange(e)}
              className="form__input"
              type="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <div className="confirm-password">
            <label className="form__label" htmlFor="confirmPassword">
              Confirm Password{' '}
            </label>
            <input
              onChange={(e) => handleInputChange(e)}
              className="form__input"
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  );
};
export default Register;
