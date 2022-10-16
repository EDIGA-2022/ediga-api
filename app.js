'use strict';

const login = require('./src/endpoints/auth/login');
const register = require('./src/endpoints/auth/register')
const passwordReset = require('./src/endpoints/auth/passwordReset');

//Users
const getUsers = require('./src/endpoints/getUsers');
const getUser = require('./src/endpoints/getUser');
const getUserPhotos = require('./src/endpoints/getUserPhotos');
const createUser = require('./src/endpoints/createUser');
const getUserProfile = require('./src/endpoints/getUserProfile');
const editUser = require('./src/endpoints/editUser');

//Observation
const createObservation = require('./src/endpoints/createObservation');
const getUserObservations = require('./src/endpoints/getUserObservations');
const getUserObservation = require('./src/endpoints/getUserObservation');


// import express
const express = require('express');
// import body-parser
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// create server
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: '*',
    //origin: 'http://localhost:3000',
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

app.use(cookieParser());



// routes

// get all users
app.get('/api/users', getUsers);

// get all photos of a user with userId
app.get('/api/photos/:userId', getUserPhotos);

// create new participant
app.post('/api/createUser', createUser);

// edit participant
app.put('/api/editUser', editUser);

// get user
app.get('/api/user/:userId', getUser);

// get user profile
app.get('/api/user/profile/:userId', getUserProfile);

// create new observation
app.post('/api/observations', createObservation);

// get all observations of a user with userId
app.get('/api/observations/user/:userId', getUserObservations);

// get a particular observation
app.get('/api/observations/:observationId', getUserObservation);

app.post('/api/login', login)
app.post('/api/register', register)
app.post('/api/password-reset', passwordReset)


app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});