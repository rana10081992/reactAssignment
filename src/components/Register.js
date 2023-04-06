import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Register = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitRegistration = (event) => {
    event.preventDefault();
    console.log('rana.... ', documentId, password);
    performSubmit().then((res) => {
      console.log('rana 3333333 api res is.... ', res);
      if (res) {
        alert('registration done successfully with id..' + res.documentId);
        navigate('/home');
      }
    });
  };

  // const onSubmit = (data) => {
  //   dispatch(signupUser(data));
  // };

  const performSubmit = async () => {
    const res = await fetch('http://localhost:3000/user', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('rana API res is... ', res);
    const result = await res.json();
    console.log('rana..... result is....', result);
    return result;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'firstName') {
      setFirstName(value);
    }
    if (id === 'lastName') {
      setLastName(value);
    }
    if (id === 'documentId') {
      setDocumentId(value);
    }
    if (id === 'password') {
      setPassword(value);
    }
    if (id === 'confirmPassword') {
      setConfirmPassword(value);
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
          {/* <button type="submit" className="btn">
          Register
        </button> */}
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
    // <div>
    //   <h3>Register</h3>
    //   <div className="flex flex-coloumn align-item-center"></div>
    //   <label htmlFor="">Name</label>
    //   <input
    //     type="text"
    //     placeholder="Name"
    //     value={name}
    //     onChange={(e) => setName(e.target.value)}></input>
    //   <label htmlFor="">Dcoument Id</label>
    //   <input
    //     type="text"
    //     placeholder="Document Id"
    //     value={documentId}
    //     onChange={(e) => setDocumentId(e.target.value)}></input>
    //   <label htmlFor="">Password</label>
    //   <input
    //     type="password"
    //     placeholder="Password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}></input>
    //   <button className="mt-3" onClick={registerHandle}>
    //     Register
    //   </button>
    // </div>
  );
};
export default Register;
