const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;

const userDetailFileName = 'userDetails.json';
let userId = 1009;

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
    documentType: '1',
    name: 'test React 1000' + i,
    phoneNo: '999888777' + i,
    address: 'home address test ' + i,
    docUrl:
      'https://firebasestorage.googleapis.com/v0/b/react-assignment-c80fc.appspot.com/o/files%2Fadhaar%20sample.jpg?alt=media&token=20e4eb19-a99e-4aa4-8718-966429adc8e7',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/react-assignment-c80fc.appspot.com/o/files%2Fsopra_2.jpg?alt=media&token=21d2199a-a8ff-4e1e-9e8d-f89a70eafdcc',
    userId: 1000 + i
  };
  data.push(obj);
}
fs.writeFile(userDetailFileName, JSON.stringify(data), function (err) {
  if (err) throw err;
  console.log('complete');
});

app.post('/login', async (req, res) => {
  // assign request body to payload variable
  const payload = req.body;

  // reading file from local json
  const file = await fs.readFile(userDetailFileName);
  const users = JSON.parse(file);

  // console.log('rana db users are... ', users);
  const obj = users.find((item) => Number(item.phoneNo) === Number(payload.phoneNo));
  console.log('rana finded user is... ', obj);
  if (obj) {
    res.status(200).json({ obj });
  } else {
    res
      .status(401)
      .json({ message: 'incorrect details entered', error: 'user details are incorrect' });
  }
});

app.get('/getAllUsers', async (req, res) => {
  // reading file from local json
  const file = await fs.readFile(userDetailFileName);
  const fileResponse = JSON.parse(file);
  res.json(fileResponse);
});

app.post('/register', async (req, res) => {
  // assign request body to obj
  const payload = req.body;
  // reading file from local json
  const file = await fs.readFile(userDetailFileName);
  const users = JSON.parse(file);

  // console.log('rana db users are... ', fileResponse);
  console.log('rana phone no is... ', payload.phoneNo);
  const obj = users.find((item) => Number(item.phoneNo) === Number(payload.phoneNo));
  console.log('rana.... ', obj);
  if (obj) {
    res
      .status(401)
      .json({ message: 'phone No already registered', error: 'phone no already in use' });
  } else {
    userId += 1;
    const userDetail = {
      address: payload.address,
      documentType: payload.documentType,
      name: payload.name,
      phoneNo: payload.phoneNo,
      userId: userId
    };
    // pushing new object to existing array
    users.push(userDetail);
    console.log('rana..... users... ', users);
    // write updated data to the DB/JSON file
    await fs.writeFile(userDetailFileName, JSON.stringify(users));
    res.status(200).json({ userDetails: userDetail });
  }
});

app.post('/uploadPhoto', async (req, res) => {
  // assign request body to obj
  const userDetails = req.body;
  console.log('rana paload........ ', userDetails);

  // reading file from local json
  const file = await fs.readFile(userDetailFileName);
  let users = JSON.parse(file);

  console.log('rana db users are... ', users);
  const obj = users.find((item) => Number(item.phoneNo) === Number(userDetails.phoneNo));
  console.log('rana........ ', obj);
  if (obj) {
    users = users.map((u) => (u.phoneNo !== obj.phoneNo ? u : userDetails));
    // write updated data to the DB/JSON file
    await fs.writeFile(userDetailFileName, JSON.stringify(users));
    res.json({
      res: 200,
      userDetails: userDetails,
      msg: 'registration done successfully'
    });
  } else {
    res
      .status(401)
      .json({ message: 'incorrect details entered', error: 'user details are incorrect' });
  }
});

app.get('/productDetails', (req, res) => {
  res.json({
    accountTypeOne: 'SAVINGS',
    accountTypeTwo: 'CVCC',
    bankingType: 'DIGITAL',
    phoneNo: '+91-999-234-5678'
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
