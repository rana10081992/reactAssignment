import React, { useEffect } from 'react';
import { signupUser } from '../../feature/UserSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

import { userSelector, clearState } from '../../feature/UserSlice';
import API_BASE_URL from './../../App.constant';

const Register = () => {
  let existingUserDetails = [];
  // const location = useLocation();

  // to dispatch the action
  const dispatch = useDispatch();

  // variable to handle the navigation
  const navigate = useNavigate();

  // variables to read fetch, success and error from redux store
  const { isSuccess, isError } = useSelector(userSelector);

  // default method once component render is commpleted
  useEffect(() => {
    return () => {
      // get registered users list
      getAllUsers().then((res) => {
        if (res) {
          existingUserDetails = res;
        }
      });
    };
  }, []);

  useEffect(() => {
    // handle error part
    if (isError) {
      // on error state dispatch and clear the data state
      dispatch(clearState());
    }
    // handle success part
    if (isSuccess) {
      // on True route to Home
      navigate('/home');
    }
  }, [isError, isSuccess]);

  // form initial values
  const initialValues = {
    name: '',
    documentId: '',
    address: '',
    phoneNo: '',
    password: '',
    confirmPassword: ''
  };

  // validation schema using yup
  const validationSchema = () => {
    return Yup.object().shape({
      name: Yup.string().required('Name is required'),
      documentId: Yup.string().required('Document Id is required'),
      address: Yup.string()
        .required('Address is required')
        .min(6, 'address must be at least 6 characters')
        .max(40, 'address must not exceed 20 characters'),
      phoneNo: Yup.string()
        .required('Phone No is required')
        .length(10, 'Phone no must be 10 digits'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must not exceed 20 characters'),
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Confirm Password does not match')
    });
  };

  const getAllUsers = async () => {
    const res = await fetch(`${API_BASE_URL}/getAllUsers`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await res.json();
    console.log('rana API res is...', result);
    return result;
  };

  const handleExistingUser = (formData) => {
    console.log('rana form data.... ', formData);
    console.log('rana form data.... ', Number(formData.documentId));
    const formDocumentId = Number(formData.documentId);
    console.log('rana....  form document id is.. ', formDocumentId);
    // send form data document id as number
    if (formData) {
      const obj = existingUserDetails.find(
        (item) => Number(item.documentId) === Number(formData.documentId)
      );
      console.log('rana object find is.....', obj);
      if (obj) {
        console.log('rana user already exists with id.. ', obj.documentId);
        toast.error('user already exists with id ' + obj.documentId);
      } else {
        console.log('rana calling the registration API...');
        toast.success('rana you can go for registration..');
        // get return url from location state or default to home page
        // const { from } = location.state || { from: { pathname: '/' } };
        // create payload for user registration with documnet id as number type
        const userDetails = {
          documentId: Number(formData.documentId),
          name: formData.name,
          address: formData.address,
          phoneNo: formData.phoneNo
        };
        // dispatch signup/registration action on method call
        dispatch(signupUser(userDetails));
      }
    } else {
      console.log('rana user form data is invalid ');
      toast.error('invalid form data');
    }
  };

  // handle the onSubmit sceanrio
  const onRegistrationSubmit = (data) => {
    handleExistingUser(data);
  };

  return (
    <div className="w-75 col-sm-12 container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onRegistrationSubmit}
        render={({ errors, touched }) => (
          <>
            <Form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field
                  name="name"
                  type="text"
                  className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')}
                />
                <ErrorMessage name="name" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label htmlFor="documentId">document Id: </label>
                <Field
                  name="documentId"
                  type="text"
                  className={
                    'form-control' + (errors.documentId && touched.documentId ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage name="documentId" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <Field
                  name="address"
                  type="text"
                  className={
                    'form-control' + (errors.address && touched.address ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage name="address" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNo">Phone No</label>
                <Field
                  name="phoneNo"
                  type="number"
                  className={
                    'form-control' + (errors.phoneNo && touched.phoneNo ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage name="phoneNo" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className={
                    'form-control' + (errors.password && touched.password ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage name="password" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className={
                    'form-control' +
                    (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary mr-2">
                  Register
                </button>
                <button type="reset" className="btn btn-secondary">
                  Reset
                </button>
              </div>
            </Form>
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
          </>
        )}
      />
    </div>
  );
};
export default Register;
