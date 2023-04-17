import React, { useState, useEffect } from 'react';
import { signupUser } from '../../feature/UserSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, userSelector, clearState } from '../../feature/UserSlice';
import validator from 'validator';

const Register = () => {
  const [inputs, setInputs] = useState({
    name: '',
    address: '',
    phoneNo: '',
    password: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const { username, address, phoneNo, password } = inputs;

  const location = useLocation();

  // to dispatch the action
  const dispatch = useDispatch();

  // variable to handle the navigation
  const navigate = useNavigate();

  // variables to read fetch, success and error from redux store
  const { isSuccess, isError } = useSelector(userSelector);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const validatePhoneNumber = (number) => {
    const isValidPhoneNumber = validator.isMobilePhone(number);
    return isValidPhoneNumber;
  };

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

  // handle the onSubmit sceanrio
  const onRegistrationSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (username && address && phoneNo && password) {
      console.log('rana username and password entered is.... ', username, password, from);
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: '/' } };
      // dispatch login action on method call
      dispatch(loginUser(username, password, from));
    }
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

  return (
    <div className="w-50 container">
      <form name="form" onSubmit={onRegistrationSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={username}
            onChange={handleChange}
            className={'form-control' + (submitted && !username ? ' is-invalid' : '')}
          />
          {submitted && !username && <div className="invalid-feedback">User Name is required</div>}
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleChange}
            className={'form-control' + (submitted && !address ? ' is-invalid' : '')}
          />
          {submitted && !address && <div className="invalid-feedback">Address is required</div>}
        </div>
        <div className="form-group">
          <label>Phone NO:</label>
          <input
            type="number"
            maxLength="10"
            name="phoneNo"
            value={phoneNo}
            onChange={handleChange}
            className={'form-control' + (submitted && !phoneNo ? ' is-invalid' : '')}
          />
          {submitted && !phoneNo && <div className="invalid-feedback">Phone No is required</div>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className={'form-control' + (submitted && !password ? ' is-invalid' : '')}
          />
          {submitted && !password && <div className="invalid-feedback">Password is required</div>}
        </div>
        <div className="form-group container">
          <button className="btn btn-primary">
            {isSuccess && <span className="spinner-border spinner-border-sm mr-1"></span>}
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default Register;
