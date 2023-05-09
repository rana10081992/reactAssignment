import React, { useEffect, useState } from 'react';
import { signupUser } from '../../feature/UserSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import storage from '../../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

import { signUpCompletion, userSelector, clearState } from '../../feature/UserSlice';
import API_BASE_URL from './../../App.constant';

export const handleExistingUser = (formData, existingUserDetails, dispatch) => {
  // send form data document id as number
  if (formData) {
    const obj = existingUserDetails.find(
      (item) => Number(item.phoneNo) === Number(formData.phoneNo)
    );
    if (obj) {
      toast.error('user already exists with phone no ' + obj.phoneNo);
    } else {
      toast.success('new user can go for registration');

      let formdocumentType = formData.documentId;
      let documentType = '';
      switch (formdocumentType) {
        case 'Pan Card':
          documentType = '1';
          break;
        case 'Adhar Card':
          documentType = '2';
          break;
        case 'Voter Card':
          documentType = '3';
          break;
        default:
          // alert('Please select document type');
          break;
      }
      const userDetails = {
        documentType: documentType,
        name: formData.name,
        address: formData.address,
        phoneNo: formData.phoneNo,
        password: formData.password
      };
      // dispatch signup/registration action on method call
      dispatch(signupUser(userDetails));
    }
  } else {
    toast.error('invalid form data');
  }
};

const Register = () => {
  let existingUserDetails = [];
  // const location = useLocation();

  // to dispatch the action
  const dispatch = useDispatch();

  // variable to handle the navigation
  const navigate = useNavigate();

  // variables to read fetch, success and error from redux store
  const { isSuccess, isError, initialSignUp, signUpErrorMsg, userDetail } =
    useSelector(userSelector);

  // State to store uploaded file
  const [file, setFile] = useState(''); // progress
  const [photofile, setPhoptoFile] = useState(''); // progress
  const [percent, setPercent] = useState(0); // Handle file upload event and update state
  const [photoPercent, setPhotoPercent] = useState(0);

  const [docUrl, setDocUrl] = useState('');
  const [photoUrl, setProfileUrl] = useState('');

  const [count, setCount] = useState(0);

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
    if (signUpErrorMsg) {
      toast.error('error: ', signUpErrorMsg);
      // dispatch(clearState());
    }
    if (initialSignUp) {
      setCount(1);
      toast.success('user regsitered successfully');
      // dispatch(clearState());
    }
    //handle success part
    if (isSuccess) {
      // on True route to Home
      navigate('/home');
    }
  }, [isError, isSuccess, signUpErrorMsg, initialSignUp, userDetail]);

  // form initial values
  const initialValues = {
    name: '',
    documentId: '',
    address: '',
    phoneNo: '',
    password: '',
    confirmPassword: ''
  };
  const documents = ['Pan Card', 'Aadhar Card', 'Voter Card'];

  // validation schema using yup
  const validationSchema = () => {
    return Yup.object().shape({
      name: Yup.string().required('Name is required'),
      documentId: Yup.string().required('Please select a document').oneOf(documents),
      // documentId: Yup.string().required('Document Id is required'),
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
    return result;
  };

  function handleDocumentChange(event) {
    setFile(event.target.files[0]);
  }

  function handleProfilePhotoChange(event) {
    setPhoptoFile(event.target.files[0]);
  }

  const handlePhotoSubmission = () => {
    // read value from db and pass it to payload
    if (userDetail) {
      const photoSubmitPayload = {
        address: userDetail.address,
        documentType: userDetail.documentType,
        name: userDetail.name,
        phoneNo: userDetail.phoneNo,
        userId: userDetail.userId,
        docUrl: docUrl,
        photoUrl: photoUrl
      };
      // dispatch login action on method call
      dispatch(signUpCompletion(photoSubmitPayload));
    }

    // navigate('/home');
  };

  const handleDocumentUpload = () => {
    if (!file) {
      alert('Please upload an image first!');
    }
    const storageRef = ref(storage, `/files/${file.name}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100); // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          //setDocCompletion(true);
          setDocUrl(url);
        });
      }
    );
  };

  const handlePropfilePhotoUpload = () => {
    if (!photofile) {
      alert('Please upload an image first!');
    }
    const storageRef = ref(storage, `/files/${photofile.name}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, photofile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100); // update progress
        setPhotoPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          //setPhotoCompletion(true);
          setProfileUrl(url);
        });
      }
    );
  };

  // handle the onSubmit sceanrio
  const onRegistrationSubmit = (data) => {
    handleExistingUser(data, existingUserDetails, dispatch);
  };

  const productOptions = documents.map((document, key) => (
    <option value={document} key={key}>
      {document}
    </option>
  ));

  return (
    <div className="w-96 mb-w-full container">
      {count === 0 ? (
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onRegistrationSubmit}
            >
            {({ errors, touched }) => (
              <>
                <Form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Field
                      name="name"
                      type="text"
                      className={
                        'form-control' + (errors.name && touched.name ? ' is-invalid' : '')
                      }
                    />
                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="documentId">document Id: </label>
                    <Field
                      name="documentId"
                      as="select"
                      className={
                        'form-control' +
                        (errors.documentId && touched.documentId ? ' is-invalid' : '')
                      }>
                      <option value={''}>Select a product</option>
                      {productOptions}
                    </Field>
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
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group pt-2">
                    <button type="submit" className="btn btn-primary mr-2 bg-blue-500 px-3">
                      Next
                    </button>
                    <button type="reset" className="btn btn-secondary bg-gray-600 px-3">
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
          </Formik>
        </div>
      ) : (
        <div>
          <div className="bg-white justify-center items-center h-46 mt-4 p-8 w-96 mx-auto">
            <input
              type="file"
              id="document_upload_input"
              onChange={handleDocumentChange}
              accept="/image/*"
              className="form-control"
            />
            <button
              onClick={handleDocumentUpload}
              className="btn btn-outline-primary mr-2 px-3 mt-3"
              id="document_button">
              Upload Document
            </button>
            <p className="mt-3">{percent} % done</p>
          </div>
          <div className="bg-white justify-center items-center h-46 mt-4 p-8 w-96 mx-auto">
            <input
              type="file"
              onChange={handleProfilePhotoChange}
              accept="/image/*"
              className="form-control"
            />
            <button
              onClick={handlePropfilePhotoUpload}
              className="btn btn-outline-primary mr-2 px-3 mt-3">
              Upload profile photo
            </button>
            <p className="mt-3">{photoPercent} % done</p>
          </div>
          <button
            onClick={handlePhotoSubmission}
            className="btn btn-primary float-end mx-3 my-3 "
            id="document_upload_submit">
            Finish
          </button>
        </div>
      )}
    </div>
  );
};
export default Register;
