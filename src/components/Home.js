import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { userSelector } from './../feature/UserSlice';

// home component to display the home details
const Home = () => {

  // display profile to display the profile details
  const [displayProfile, setProfile] = useState(true);

  // read value of user detail from redux store
  const { userDetail } = useSelector(userSelector);

  // useEffect default method to do the action once render is complete
  useEffect(() => {
    if(userDetail){
      console.log('rana able to read user detail from redux store..')
    } else {
      console.log('rana user detail fetch failed')
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
    <div>
      <div className="flex flex-coloumn align-item-center"></div>
      <div htmlFor="">Home screen</div>
      <div>
        <button onClick={setUserProfile}>Profile Details</button>
        <button onClick={setProducts}>Products Details</button>
      </div>
      
      {displayProfile ? (
        <div className="card text-center">
          <div className="card-header">Profile Details</div>
          <div className="card-body">
            <h5 className="card-title">
              <span>documentId : </span>
              {userDetail.documentId}
            </h5>
            <p className="card-text">
              <span>User Name</span>
              {userDetail.name}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-coloumn align-item-center">
            <span>Account Type one offered</span>
            SAVINGS
          </div>
          <div className="flex flex-coloumn align-item-center">
            <span>Account Type two offered</span>
            SVCC
          </div>
          <div className="flex flex-coloumn align-item-center">
            <span>Banking type</span>
            DIGITAL
          </div>
          <div className="flex flex-coloumn align-item-center">
            <span>Helpline no - </span>
            +91-999-234-5678
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
