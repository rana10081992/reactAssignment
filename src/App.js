import './App.css';
import { Link, Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, clearState } from './feature/UserSlice';
import sopraLogo from './assets/sopraLogo.png'

function App() {
  // for dsiapatch actions
  const dispatch = useDispatch();

  //for user navigation
  const navigate = useNavigate();

  //display Login button default as false
  const [displayLogin, setLogin] = useState(false);

  //iSuccess selector to check wheter user has leegedIn
  const { isSuccess } = useSelector(userSelector);

  useEffect(() => {
    console.log('rana99999999999.....', isSuccess);
    if (isSuccess) {
      console.log('rana... user successfully loggedin');
      //set button true
      setLogin(true);
    } else {
      navigate('/login');
    }
  }, [isSuccess]);

  const logoutUser = () => {
    dispatch(clearState());
    setLogin(false);
  };

  return (
    <div className="App">
      <h1 className="text-center">Learn React Assignment</h1>
      <br />
      {!displayLogin ? (
        <div className="text-center">
          <div><img src={sopraLogo}></img></div>
          <Link to="/login">Login</Link> {' | '}
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <button onClick={logoutUser} className="btn btn-primary">
          Logout
        </button>
      )}
      <br />
      <Outlet />
    </div>
  );
}

export default App;
