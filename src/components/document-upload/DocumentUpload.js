import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import storage from '../../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { signUpCompletion, userSelector } from '../../feature/UserSlice';

const DocumentUpload = () => {
  // variable to handle the navigation
  const navigate = useNavigate();

  // to dispatch the action
  const dispatch = useDispatch();

  // State to store uploaded file
  const [file, setFile] = useState(''); // progress
  const [photofile, setPhoptoFile] = useState(''); // progress
  const [percent, setPercent] = useState(0); // Handle file upload event and update state
  const [photoPercent, setPhotoPercent] = useState(0);
  const [docUrl, setDocUrl] = useState('');
  const [photoUrl, setProfileUrl] = useState('');

  // variables to read fetch, success and error from redux store
  const { userDetail } = useSelector(userSelector);

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
      navigate('/home');
    }
  };

  const handleDocumentUpload = () => {
    if (!file) {
      alert('Please upload an image first!');
    } else {
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
            // setDocCompletion(true);
            setDocUrl(url);
          });
        }
      );
    }
  };

  const handlePropfilePhotoUpload = () => {
    if (!photofile) {
      alert('Please upload an image first!');
    } else {
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
            // setPhotoCompletion(true);
            setProfileUrl(url);
          });
        }
      );
    }
  };
  return (
    <>
      <div className="bg-white justify-center items-center h-46 mt-4 p-8 w-96 mx-auto">
        <input
          id="document_upload_input"
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleDocumentChange}
          className="form-control"
        />
        <p className="mt-3">{percent} % done</p>
        <button
          onClick={handleDocumentUpload}
          className="btn btn-outline-primary mr-2 px-3 mt-3"
          id="document_button">
          Upload Document
        </button>
      </div>
      <div className="bg-white justify-center items-center h-46 mt-4 p-8 w-96 mx-auto">
        <input
          type="file"
          onChange={handleProfilePhotoChange}
          accept=".png, .jpg, .jpeg"
          className="form-control"
          id="profile_upload_input"
        />
        <p className="mt-3">{photoPercent} % done</p>
        <button
          onClick={handlePropfilePhotoUpload}
          className="btn btn-outline-primary mr-2 px-3 mt-3"
          id="profile_button">
          Upload profile photo
        </button>
      </div>
      <></>
      <button
        onClick={handlePhotoSubmission}
        className="btn btn-primary float-end mx-3 my-3 "
        id="document_upload_submit">
        Finish
      </button>
    </>
  );
};
export default DocumentUpload;
