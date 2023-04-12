const express = require('express');
const cors = require('cors');
const fs = require("fs").promises;

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
// let fs = require('fs');

let data = [];
//add dummy registered user
for (i = 0; i < 10; i++) {
  let obj = {
    loggedIn: true,
    token: 'aabbccdd-1122-3344' + i,
    status: 200,
    documentId: 1000 + i,
    title: 'json-server' + '- ' + i,
    name: 'test React 1000' + i,
    phoneNo: '987654100' + 1,
    author: 'typicode' + i,
    msg: 'successful loggedIn' + i
  };
  data.push(obj);
}
fs.writeFile('userDetails.json', JSON.stringify(data), function (err) {
  if (err) throw err;
  console.log('complete');
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
  res.json({
    documentId: 1000,
    title: 'json-server',
    name: 'test React 1000',
    phoneNo: '9876541000',
    author: 'typicode',
    msg: 'successful loggedIn'
  });
});

app.post('/register', async (req, res) => {
  // assign request body to obj
  const userDetails = req;
  // reading file from local json
  const filename = 'userDetails.json'
  const file = await fs.readFile(filename);
  users = JSON.parse(file);
  // pushing new object to existing array 
  console.log('rana..... items... ', userDetails)
  users.push(userDetails);
  console.log('rana..... users... ', users)
  // write updated data to the DB/JSON file
  await fs.writeFile(filename, JSON.stringify(users));
  res.json({
    res: 200,
    // useDetails: req,
    msg: 'registration done successfully'
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
