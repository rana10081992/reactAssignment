const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const user = [
  {
    documentId: 1000,
    title: 'json-server',
    name: 'test React 1000',
    phoneNo: '9876541000',
    author: 'typicode 0',
    msg: 'successful loggedIn'
  },
  {
    documentId: 1001,
    title: 'json-server',
    name: 'test React 1001',
    phoneNo: '9876541001',
    author: 'typicode 1',
    msg: 'successful loggedIn'
  },
  {
    documentId: 1002,
    title: 'json-server',
    name: 'test React 1002',
    phoneNo: '9876541002',
    author: 'typicode 2',
    msg: 'successful loggedIn'
  },
  {
    documentId: 1003,
    title: 'json-server',
    name: 'test React 1003',
    phoneNo: '9876541003',
    author: 'typicode 3',
    msg: 'successful loggedIn'
  }
];

app.get('/login', (req, res) => {
  res.json({
    loggedIn: true,
    token: 'aabbccdd-1122-3344',
    status: 200,
    documentId: 1000,
    title: 'json-server',
    name: 'test React 1000',
    phoneNo: '9876541000',
    author: 'typicode',
    msg: 'successful loggedIn'
  });
});

app.get('/home', (req, res) => {
  // const result = user.find((obj) => obj.documentId == 1003);
  // console.log('rana... ', result);
  // if (result) {
  //   res.json(result);
  // }
  res.json({
    documentId: 1000,
    title: 'json-server',
    name: 'test React 1000',
    phoneNo: '9876541000',
    author: 'typicode',
    msg: 'successful loggedIn'
  });
});

app.post('/user', function (request, res) {
  res.json({
    documentId: 1000,
    msg: 'registration done successfully'
  });
});

app.post('/register', (req, res) => {
  res.json({
    documentId: 1000,
    msg: 'registration done successfully'
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
