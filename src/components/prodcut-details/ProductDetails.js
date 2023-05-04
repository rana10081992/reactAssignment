import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { prouductDetails, userSelector } from '../../feature/UserSlice';
// import './Home.css';

// home component to display the home details
const ProductDetails = () => {
  // variable to handle the navigation
  // const navigate = useNavigate();
  // display profile to display the profile details
  // const [displayProfile, setProfile] = useState(true);

  // read value of user detail from redux store
  const { userDetail } = useSelector(userSelector);

  // read value of user detail from redux store
  const { products } = useSelector(userSelector);

  const dispatch = useDispatch();

  // const updateUserDoc = () => {
  //   // on True route to document upload section
  //   navigate('/documentUpload');
  // };

  // useEffect default method to do the action once render is complete
  useEffect(() => {
    dispatch(prouductDetails({}));
  }, []);

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
    </div>
  );
};
export default ProductDetails;
