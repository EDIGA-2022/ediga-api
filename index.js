'use strict';
const getUserPhotos = require('./src/endpoints/getUserPhotos');
const getUsers = require('./src/endpoints/getUsers');
const getUser = require('./src/endpoints/getUser');
// const blurimage = require('./src/endpoints/blurimage');


// import express
const express = require('express');
// import body-parser
const bodyParser = require('body-parser');
// create server
const app = express();
const cors = require('cors')
const corsOptions = {
    origin: '*',
    // origin: 'http://localhost:3000',
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

// get user data
app.get('/api/user/:userId', getUser);

// get all photos of a user with userId
app.get('/api/photos/:userId', getUserPhotos);

//blur faces
// app.get('/api/blur', blurimage);


app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});