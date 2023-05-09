import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { prouductDetails, userSelector } from '../../feature/UserSlice';
import './Home.css';
import sopraHome from './../../assets/sopraHome.jpg';

// home component to display the home details
const Home = () => {
  // variable to handle the navigation
  // const navigate = useNavigate();
  // display profile to display the profile details
  // const [displayProfile, setProfile] = useState(true);

  // read value of user detail from redux store
  const { userDetail } = useSelector(userSelector);

  // read value of user detail from redux store
  // const { products } = useSelector(userSelector);

  const dispatch = useDispatch();

  // const updateUserDoc = () => {
  //   // on True route to document upload section
  //   navigate('/documentUpload');
  // };

  // useEffect default method to do the action once render is complete
  useEffect(() => {
    dispatch(prouductDetails({}));
  }, []);

  // default method once component render is commpleted
  //  useEffect(() => {
  //   console.log('rana 2222222222222....  call action ')
  //   dispatch(prouductDetails({}));
  //   if (userDetail) {
  //   } else {
  //     // console.log('rana user detail fetch failed');
  //   }
  //   return () => {
  //     // dispatch(clearState());
  //   };
  // }, []);

  // method to set and display the user profile
  // const setUserProfile = () => {
  //   setProfile(true);
  // };

  // method to set and display the products details
  // const setProducts = () => {
  //   setProfile(false);
  // };

  // UI part
  return (
    <div className="text-center">
      {/* <div>HELLO</div> */}
      {/* <Header/> */}
      <div className="justify-center items-center">
        <div>
          <img src={sopraHome}></img>
        </div>
        <p className="text-white">
          The Open Innovation Report 2023: how corporate-startup collaboration is the key to
          thriving amid economic turbulence
        </p>
      </div>
      {/* <p className="my-3 home_screen_text ">Home screen</p> */}
      {/* <Headers/> */}
      {/* <div>
        <button
          onClick={setUserProfile}
          className={`profile_button ${displayProfile ? 'bg-blue-500' : 'not_selected_button'}`}>
          Profile Details
        </button>
        <button
          onClick={setProducts}
          className={`profile_button ${!displayProfile ? 'bg-blue-500' : 'not_selected_button'}`}>
          Products Details
        </button>
      </div> */}

      {/* {displayProfile ? (
        <div className="card text-center form ">
          <div className="row ">
            <p className="font_bold d-flex justify-content-center card-header ">Profile Details</p>
            <div className="col">
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
              <div className="text-center">
                <button
                  onClick={updateUserDoc}
                  className="btn btn-outline-primary w-50 items-center">
                  Update User document
                </button>
              </div>
            </div>
            <div className="col-md-auto">
              {!!imageURL && (
                <img
                  src={imageURL}
                  alt="No image uploaded"
                  className="mt-3 rounded float-right w-40 h-40"></img>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className=" card text-center form">
          <div className="card-header font_bold">Product Details</div>
          <div className="card-body">
            <p>
              <span className="font_bold">Account Type one offered : </span>
              <span>{products.accountTypeOne}</span>
            </p>
            <p>
              <span className="font_bold">Account Type two offered : </span>
              <span>{products.accountTypeTwo}</span>
            </p>
            <p>
              <span className="font_bold">Banking type : </span>
              <span>{products.bankingType}</span>
            </p>
            <p>
              <span className="font_bold">Helpline no : </span>
              <span>{products.phoneNo}</span>
            </p>
          </div>
        </div>
      )} */}
    </div>
  );
};
export default Home;
