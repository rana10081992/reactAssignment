import './App.css';
import { Link, Outlet } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Learn React Assignment</h1>
      <br />
      <Link to="/login">Login</Link> {' | '}
      <Link to="/register">Register</Link>
      <br />
      <Outlet />
    </div>
  );
}

export default App;
