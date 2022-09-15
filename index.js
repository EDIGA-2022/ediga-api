'use strict';
const getUserPhotos = require('./src/endpoints/getUserPhotos');
const getUsers = require('./src/endpoints/getUsers');
const listUsers = require('./src/endpoints/users/listUsers');
const createParticipant = require('./src/endpoints/createParticipant');
const getUser = require('./src/endpoints/getUser');
const editUser = require('./src/endpoints/editUser');

// import express
const express = require('express');
// import body-parser
const bodyParser = require('body-parser');
// create server
const app = express();
const cors = require('cors')
const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
// port
const port = process.env.PORT || 3001;
// adds body-parser
app.use(bodyParser.urlencoded({ extended: false }));
// message in JSON format
app.use(bodyParser.json());

// routes

// get all users
app.get('/api/users', getUsers);
// get all users register info
app.get('/api/usersRegisterInfo', listUsers);

// get all photos of a user with userId
app.get('/api/photos/:userId', getUserPhotos);

// create new participant
app.post('/api/createParticipant', createParticipant);

// edit participant
app.post('/api/editUser', editUser);

// get user
app.get('/api/user/:userId', getUser);

app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});