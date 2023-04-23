// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB4X9iies0qxVJH5caQizx0C7QV7nw7zRQ',
  authDomain: 'react-assignment-c80fc.firebaseapp.com',
  projectId: 'react-assignment-c80fc',
  storageBucket: 'react-assignment-c80fc.appspot.com',
  messagingSenderId: '77376052689',
  appId: '1:77376052689:web:519b597905d8a6693214f0'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Firebase storage reference
const storage = getStorage(app);
export default storage;
