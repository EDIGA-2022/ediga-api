'use strict';
const getUserPhotos = require('./src/endpoints/getUserPhotos');
const getUsers = require('./src/endpoints/getUsers');
const getUser = require('./src/endpoints/getUser');
const createUser = require('./src/endpoints/createUser');
const getUserProfile = require('./src/endpoints/getUserProfile');
const editUser = require('./src/endpoints/editUser');
const login = require('./src/endpoints/auth/login');
const register = require('./src/endpoints/auth/register')
const passwordReset = require('./src/endpoints/auth/passwordReset');


// import express
const express = require('express');
// import body-parser
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// create server
const app = express();

app.use(express.json())
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

app.post('/api/login', login)
app.post('/api/register', register)
app.post('/api/password-reset', passwordReset)


app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});