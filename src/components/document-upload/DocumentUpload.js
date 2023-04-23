import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import storage from '../../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const DocumentUpload = () => {
  // variable to handle the navigation
  const navigate = useNavigate();

  // State to store uploaded file
  const [file, setFile] = useState(''); // progress
  const [percent, setPercent] = useState(0); // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  const handleUpload = () => {
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
          console.log(url);
          // download(url);
          localStorage.setItem('documentURL', url);
          navigate('/home');
        });
      }
    );
  };

  // const download = async (url) => {
  //   const a = document.createElement('a');
  //   a.href = await toDataURL(url);
  //   a.download = 'userDoc.png';
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  // };

  // const toDataURL = (url) => {
  //   return fetch(url)
  //     .then((response) => {
  //       return response.blob();
  //     })
  //     .then((blob) => {
  //       return URL.createObjectURL(blob);
  //     });
  // };

  return (
    <div className="bg-white justify-center items-center h-32 mt-16 p-8 w-96 mx-auto">
      <input type="file" onChange={handleChange} accept="/image/*" />
      <button onClick={handleUpload}>Upload to Firebase</button>
      <p>{percent} % done</p>
    </div>
  );
};
export default DocumentUpload;
