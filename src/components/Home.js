import React, { useEffect, useState } from 'react';

const Home = () => {
  const [displayProfile, setProfile] = useState(true);
  const [userData, setUserData] = useState({});
  const getHomeData = async () => {
    const res = await fetch('http://localhost:3000/home', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
      // body: JSON.stringify()
    });
    console.log('rana API res is... ', res);
    const result = await res.json();
    console.log('rana..... result is....', result);
    return result;
  };

  useEffect(() => {
    getHomeData().then((res) => {
      console.log('rana 3333333 api res is.... ', res);
      if (res) {
        setUserData(res);
      }
    });
  }, []);

  console.log('rana home screen data is....', userData);
  const setUserProfile = () => {
    setProfile(true);
  };

  const setProducts = () => {
    setProfile(false);
  };

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
              {userData.documentId}
            </h5>
            <p className="card-text">
              <span>User Name</span>
              {userData.name}
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
          <div className="card-footer text-muted">2 days ago</div>
        </div>
      ) : (
        // <div>
        //   <div className="flex flex-coloumn align-item-center">
        //     <span>documentId</span>
        //     {userData.documentId}
        //   </div>
        //   <div className="flex flex-coloumn align-item-center">
        //     <span>User Name</span>
        //     {userData.name}
        //   </div>
        //   <div className="flex flex-coloumn align-item-center">
        //     <span>Phone No</span>
        //     {userData.phoneNo}
        //   </div>
        //   <div className="flex flex-coloumn align-item-center">
        //     <span>User logged in msg: </span>
        //     {userData.msg}
        //   </div>
        // </div>
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
