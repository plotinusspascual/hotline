const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json').then((data) => {
    console.log(JSON.parse(data));
    res.json(JSON.parse(data));
  });
  console.info(`${req.method} request recieved`);
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  console.info(`${req.method} request received to submit feedback`);
  // TODO: Logic for appending data to the db/diagnostics.json file
   // Destructuring assignment for the items in req.body
   const { isValid, errors } = req.body;

   const payload= {
    time: Date.now(),
    error_id: uuidv4,
    errors,
   };

   if(!isValid){
     readAndAppend(payload, './db/diagnostics.json');
     res.json('Diagnositc information added ');
   }else{
     res.json({
       message: 'object is valid, not loggin. Check front end implementation',
       error_id: payload.error_id
     });
   }
});

module.exports = diagnostics;
