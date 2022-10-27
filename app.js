'use strict';

// Auth
const login = require('./src/endpoints/auth/login');
const register = require('./src/endpoints/auth/register');
const passwordReset = require('./src/endpoints/auth/passwordReset');
const authMiddleware = require('./src/authMiddleware');

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
const getObservation = require('./src/endpoints/getObservation');
const editObservation = require('./src/endpoints/editObservation');

//Metrics
const getMetrics = require('./src/endpoints/getMetrics');

// import express
const express = require('express');
// import body-parser
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// create server
const app = express();
const cors = require('cors');
const corsOptions = {
  // Autoriza a todos los dominios a pegarle al back
  origin: '*',
  // origin: 'http://localhost:3000',
  credentials: true,
  // Permite que se usen esos headers en las requests de otros dominios
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
// port
const port = process.env.PORT || 3001;
// adds body-parser
//app.use(bodyParser.urlencoded({ extended: false }));
// message in JSON format
app.use(bodyParser.json({ limit: "50mb" }));

app.use(cookieParser());

app.use(authMiddleware);


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

// get observation
app.get('/api/observation/:observationId', getObservation);

// edit observation
app.put('/api/observation/', editObservation);

// create new observation
app.post('/api/observations', createObservation);

// get all observations of a user with userId
app.get('/api/observations/user/:userId', getUserObservations);

app.post('/api/login', login);
app.post('/api/register', register);
app.post('/api/password-reset', passwordReset);

// get all metrics
app.get('/api/metrics', getMetrics);

app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});