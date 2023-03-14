'use strict'

// Auth
const login = require('./src/endpoints/auth/login')
const register = require('./src/endpoints/auth/register')
const passwordReset = require('./src/endpoints/auth/passwordReset')
const authMiddleware = require('./src/authMiddleware')

// Ediga Users
const deleteEdigaUser = require('./src/endpoints/edigaUsers/deleteEdigaUser')
const setAdminEdiga = require('./src/endpoints/edigaUsers/setAdminEdiga')
const getEdigaUsers = require('./src/endpoints/edigaUsers/getEdigaUsers')
const getEdigaUser = require('./src/endpoints/edigaUsers/getEdigaUser')
const editEdigaUser = require('./src/endpoints/edigaUsers/editEdigaUser')

// Users
const getUsers = require('./src/endpoints/users/getUsers')
const getUser = require('./src/endpoints/users/getUser')
const getUserPhotos = require('./src/endpoints/users/getUserPhotos')
const createUser = require('./src/endpoints/users/createUser')
const getUserProfile = require('./src/endpoints/users/getUserProfile')
const editUser = require('./src/endpoints/users/editUser')
const deleteUser = require('./src/endpoints/users/deleteUser')
const exportPhotos = require('./src/endpoints/users/exportPhotos')
const getUserObservations = require('./src/endpoints/users/getUserObservations')
const getUserDiaryEntries = require('./src/endpoints/users/getUserDiaryEntries')

// Observation
const createObservation = require('./src/endpoints/observations/createObservation')
const getObservation = require('./src/endpoints/observations/getObservation')
const editObservation = require('./src/endpoints/observations/editObservation')
const deleteObservation = require('./src/endpoints/observations/deleteObservation')

// Diary entry
const createDiaryEntry = require('./src/endpoints/diaryEntries/createDiaryEntry')
const editDiaryEntry = require('./src/endpoints/diaryEntries/editDiaryEntry')
const getDiaryEntry = require('./src/endpoints/diaryEntries/getDiaryEntry')

// Metrics
const getMetrics = require('./src/endpoints/metrics/getMetrics')

// import express
const express = require('express')
// import body-parser
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// create server
const app = express()
const cors = require('cors')

const corsOptions = {
  // Autoriza a todos los dominios a pegarle al back
  origin: [
    'https://portalediga.azurewebsites.net',
    'http://localhost:3000',
    'https://d1ou9jlu3s3ee0.cloudfront.net'
  ],
  credentials: true,
  // Permite que se usen esos headers en las requests de otros dominios
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionSuccessStatus: 200
}
app.use(cors(corsOptions))
// port
const port = process.env.PORT || 3001
// adds body-parser
// app.use(bodyParser.urlencoded({ extended: false }));
// message in JSON format
app.use(bodyParser.json({ limit: '50mb' }))

app.use(cookieParser())

app.use(authMiddleware)

// routes
// get all users
app.get('/api/users', getUsers)
// get all photos of a user with userId
app.get('/api/photos/:userId', getUserPhotos)

// create new participant
app.post('/api/createUser', createUser)

// edit participant
app.put('/api/editUser', editUser)

// delete participant
app.delete('/api/user/:userId', deleteUser)

// get user
app.get('/api/user/:userId', getUser)

// get user profile
app.get('/api/user/profile/:userId', getUserProfile)

// get observation
app.get('/api/observation/:observationId', getObservation)

// edit observation
app.put('/api/observation/', editObservation)

// create new observation
app.post('/api/observations/:userId', createObservation)

// get all observations of a user with userId
app.get('/api/observations/user/:userId', getUserObservations)

// delete observation
app.delete('/api/observation/:observationId', deleteObservation)

// create new diary entry
app.post('/api/diaryEntry', createDiaryEntry)

// get entry
app.get('/api/diaryEntry/:entryId', getDiaryEntry)

// edit entry
app.put('/api/diaryEntry/', editDiaryEntry)

// get all diary entries of a user with userId
app.get('/api/diaryEntry/user/:userId', getUserDiaryEntries)

// export all photos
app.get('/api/exportPhotos', exportPhotos)

app.post('/api/login', login)
app.post('/api/register', register)
app.post('/api/password-reset', passwordReset)
app.post('/api/login', login)
app.post('/api/register', register)
app.post('/api/password-reset', passwordReset)

// get all metrics
app.get('/api/metrics', getMetrics)

// delete ediga user
app.delete('/api/deleteEdigaUser', deleteEdigaUser)
app.post('/api/setAdminEdiga', setAdminEdiga)
// remove admin role from ediga user
app.get('/api/edigaUsers/:userId', getEdigaUser)
app.get('/api/edigaUsers', getEdigaUsers)
app.post('/api/editEdigaUser', editEdigaUser)

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`)
})

module.exports = app
