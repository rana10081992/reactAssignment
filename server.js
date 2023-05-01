const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;

const userDetailFileName = 'userDetails.json';
let userId = 1011;

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
    documentType: 'PAN CARD',
    name: 'test React 1000' + i,
    phoneNo: '987654100' + i,
    address: 'home address test ' + i,
    documentId: 1000 + i
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
  const fileResponse = JSON.parse(file);

  console.log('rana db users are... ', fileResponse);
  const obj = fileResponse.find((item) => Number(item.documentId) === Number(payload.userName));
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
  const userDetails = req.body;
  console.log('rana req body is.. ', userDetails);

  // reading file from local json
  const file = await fs.readFile(userDetailFileName);
  users = JSON.parse(file);
  userId += 1;
  const userDetail = {
    address: userDetails.address,
    documentType: userDetails.documentType,
    name: userDetails.name,
    phoneNo: userDetails.phoneNo,
    documentId: userId
  };

  // pushing new object to existing array
  users.push(userDetail);
  console.log('rana..... users... ', users);

  // write updated data to the DB/JSON file
  await fs.writeFile(userDetailFileName, JSON.stringify(users));
  res.json({
    res: 200,
    userDetails: userDetail,
    msg: 'registration done successfully'
  });
});

// app.post('/uploadPhoto', async (req, res) => {
//   // assign request body to obj
//   const userDetails = req.body;
//   const payload = req.body;

//   // reading file from local json
//   const file = await fs.readFile(userDetailFileName);
//   const fileResponse = JSON.parse(file);

//   console.log('rana db users are... ', fileResponse);
//   const obj = fileResponse.find((item) => Number(item.documentId) === Number(payload.userName));
//   if (obj) {
//     // res.status(200).json({ obj });
//     users = JSON.parse(file);
//     userId += 1;
//     const userDetail = {
//       userDetails: userDetails.address,
//       documentType: userDetails.documentType,
//       name: userDetails.name,
//       phoneNo: userDetails.phoneNo,
//       documentId: userId,
//       docUrl: userDetails
//     };
//     // pushing new object to existing array
//     users.push(userDetail);
//     console.log('rana..... users... ', users);

//     // write updated data to the DB/JSON file
//     await fs.writeFile(userDetailFileName, JSON.stringify(users));
//     res.json({
//       res: 200,
//       userDetails: userDetail,
//       msg: 'registration done successfully'
//     });
//   } else {
//     res
//       .status(401)
//       .json({ message: 'incorrect details entered', error: 'user details are incorrect' });
//   }

//   // reading file from local json
//   // const file = await fs.readFile(userDetailFileName);
// });

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
