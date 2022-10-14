'use strict';
const getUserPhotos = require('./src/endpoints/getUserPhotos');
const getUsers = require('./src/endpoints/getUsers');
const login = require('./src/endpoints/auth/login');
const register = require('./src/endpoints/auth/register')
const passwordReset = require('./src/endpoints/auth/passwordReset');
const logout = require('./src/endpoints/auth/logout');

// import express
const express = require('express');
// import body-parser
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// create server
const app = express();
const cors = require('cors');
const corsOptions = {
    // origin: '*',
    origin: 'http://localhost:3000',
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

app.post('/api/login', login)
app.post('/api/logout', logout)
app.post('/api/register', register)
app.post('/api/password-reset', passwordReset)


app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});