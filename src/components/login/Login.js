import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser, userSelector, clearState } from '../../feature/UserSlice';

// Login component
const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;
  // variables to read fetch, success and error from redux store
  const { isSuccess, isError } = useSelector(userSelector);

  // const location = useLocation();
  // to dispatch the action
  const dispatch = useDispatch();
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
      // display toast with error message
      toast.error('incorrect user details entered');
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

  // handle the onSubmit sceanrio
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (username && password) {
      // creating payload for login
      const loginPayload = {
        userName: username,
        password: password
      };
      // dispatch login action on method call
      dispatch(loginUser(loginPayload));
    }
  };

  return (
    <div className="w-96 mb-w-full container">
      <form name="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            className={'form-control' + (submitted && !username ? ' is-invalid' : '')}
          />
          {submitted && !username && <div className="invalid-feedback">Username is required</div>}
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
        <div className="form-group flex mt-3 justify-center items-center">
          <button className="btn btn-primary">
            {isSuccess && <span className="spinner-border spinner-border-sm mr-1"></span>}
            Submit
          </button>
        </div>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
