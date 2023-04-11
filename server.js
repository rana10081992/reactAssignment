const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

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

app.get('/getAllUsers', (req, res) => {
  res.json([
    { userName: 'test@gmail.com', documentId: 1000 },
    { userName: 'test2@gmail.com', documentId: 1001 },
    { userName: 'test3@gmail.com', documentId: 1002 }
  ]);
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
