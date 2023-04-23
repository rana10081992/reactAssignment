import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userSelector } from './../../feature/UserSlice';
import './Home.css';

// home component to display the home details
const Home = () => {
  // variable to handle the navigation
  const navigate = useNavigate();
  // display profile to display the profile details
  const [displayProfile, setProfile] = useState(true);

  // read value of user detail from redux store
  const { userDetail } = useSelector(userSelector);

  const imageURL = localStorage.getItem('documentURL');

  const updateUserDoc = () => {
    // on True route to document upload section
    navigate('/documentUpload');
  };

  // useEffect default method to do the action once render is complete
  useEffect(() => {
    console.log('rana33333333333333..... image URL', imageURL);
    console.log('rana user details from store is....... ', userDetail);
    if (userDetail) {
      console.log('rana able to read user detail from redux store..');
    } else {
      console.log('rana user detail fetch failed');
    }
  }, []);

  // method to set and display the user profile
  const setUserProfile = () => {
    setProfile(true);
  };

  // method to set and display the products details
  const setProducts = () => {
    setProfile(false);
  };

  // UI part
  return (
    <div className="text-center">
      <div htmlFor="" className="home_screen_text">
        Home screen
      </div>
      <div>
        <button
          onClick={setUserProfile}
          className={`profile_button ${
            displayProfile ? 'selected_button' : 'not_selected_button'
          }`}>
          Profile Details
        </button>
        <button
          onClick={setProducts}
          className={`profile_button ${
            !displayProfile ? 'selected_button' : 'not_selected_button'
          }`}>
          Products Details
        </button>
      </div>

      {displayProfile ? (
        <div className="card text-center form">
          <div className="card-header font_bold">Profile Details</div>
          <div className="card-body">
            <p>
              <span className="font_bold">Document Id : </span>
              <span>{userDetail.documentId}</span>
            </p>
            <p>
              <span className="font_bold">User Name : </span>
              <span>{userDetail.name}</span>
            </p>
            <p>
              <span className="font_bold">Phonen No : </span>
              <span>{userDetail.phoneNo}</span>
            </p>
            <p>
              <span className="font_bold">Address </span>
              <span>{userDetail.address}</span>
            </p>
          </div>
          <button onClick={updateUserDoc}>Update User document</button>
          <img src={imageURL} alt="TEST"></img>
        </div>
      ) : (
        <div className=" card text-center form">
          <div className="card-header font_bold">Product Details</div>
          <div className="card-body">
            <p>
              <span className="font_bold">Account Type one offered : </span>
              <span>SAVINGS</span>
            </p>
            <p>
              <span className="font_bold">Account Type two offered : </span>
              <span>SVCC</span>
            </p>
            <p>
              <span className="font_bold">Banking type : </span>
              <span>DIGITAL</span>
            </p>
            <p>
              <span className="font_bold">Helpline no : </span>
              <span>+91-999-234-5678</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
