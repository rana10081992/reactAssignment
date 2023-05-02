import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { prouductDetails, userSelector } from '../../feature/UserSlice';
// import './UserDetails.css';

// user details component to display the home details
const UserDetails = () => {
  // variable to handle the navigation
  const navigate = useNavigate();
  // display profile to display the profile details
  // const [displayProfile, setProfile] = useState(true);

  // read value of user detail from redux store
  const { userDetail } = useSelector(userSelector);

  // read value of user detail from redux store
  // const { products } = useSelector(userSelector);

  const dispatch = useDispatch();

  const imageURL = localStorage.getItem('docUrl') || null;
  const userProfileURL = localStorage.getItem('profileUrl') || null;

  const updateUserDoc = () => {
    // on True route to document upload section
    navigate('/documentUpload');
  };

  // useEffect default method to do the action once render is complete
  useEffect(() => {
    console.log('rana....  call action ');
    console.log('rana... ', imageURL);
    dispatch(prouductDetails({}));
    if (userDetail) {
      // console.log('rana able to read user detail from redux store..');
    } else {
      // console.log('rana user detail fetch failed');
    }
  }, []);

  // UI part
  return (
    <div className="text-center mt-6">
      <div className="flex flex-row card text-center form ">
        <div className="row">
          <p className="font_bold d-flex justify-content-center card-header ">Profile Details</p>
          <div className="col-8">
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
              <p>
                <span className="font_bold">Document Type : </span>
                <span>{userDetail.documentType}</span>
              </p>
            </div>
            <div>
              <div className="col">
                {!!imageURL && (
                  <img
                    src={imageURL}
                    alt="No image uploaded"
                    className="mt-3 rounded float-right"></img>
                )}
              </div>
              <div className="text-center">
                <button onClick={updateUserDoc} className="btn btn-outline-primary items-center">
                  Update User document
                </button>
              </div>
            </div>
          </div>
          <div className="col-4 h-36">
            {!!userProfileURL && (
              <img
                src={userProfileURL}
                alt="No image uploaded"
                className="mt-3 rounded float-right h-24"></img>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserDetails;
