const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;

const userDetailFileName = 'userDetails.json';

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// let fs = require('fs');

let data = [];
//add dummy registered user
for (i = 0; i < 10; i++) {
  let obj = {
    loggedIn: true,
    status: 200,
    documentId: 1000 + i,
    name: 'test React 1000' + i,
    phoneNo: '987654100' + i,
    address: 'home address test ' + i
  };
  data.push(obj);
}
fs.writeFile(userDetailFileName, JSON.stringify(data), function (err) {
  if (err) throw err;
  console.log('complete');
});

app.get('/login', (req, res) => {
  res.json({
    loggedIn: true,
    status: 200,
    documentId: 1000,
    name: 'test React 1000',
    phoneNo: '9876541000',
    address: 'home test 1...'
  });
});

app.get('/getAllUsers', async (req, res) => {
  // reading file from local json
  const file = await fs.readFile(userDetailFileName);
  const fileResponse = JSON.parse(file);
  res.json(fileResponse);
});

app.get('/home', (req, res) => {
  res.json({
    documentId: 1000,
    name: 'test React 1000',
    phoneNo: '9876541000',
    address: 'test home address'
  });
});

app.post('/register', async (req, res) => {
  // assign request body to obj
  const userDetails = req.body;

  // reading file from local json
  const file = await fs.readFile(userDetailFileName);
  users = JSON.parse(file);

  // pushing new object to existing array
  users.push(userDetails);
  console.log('rana..... users... ', users);

  // write updated data to the DB/JSON file
  await fs.writeFile(userDetailFileName, JSON.stringify(users));
  res.json({
    res: 200,
    userDetails: userDetails,
    msg: 'registration done successfully'
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
