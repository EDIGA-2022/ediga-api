const db = require('../../db.js')
const Observation = db.Observation
const jwt = require('jsonwebtoken')

async function createObservation (req, res) {
  const jwtSecretKey = process.env.JWT_SECRET_KEY
  const token = req.headers.authorization.replace('Bearer ', '')
  const data = jwt.verify(token, jwtSecretKey)

  const userId = req.body.userId
  const title = req.body.title
  const type = req.body.type
  const likes = req.body.likes
  const comments = req.body.comments
  const music = req.body.music
  const publicationDate = req.body.date ? req.body.date : null
  const hasMusic = req.body.hasMusic
  const text = req.body.observation // text
  const photoId = req.body.photoId
  const edigaUserPhoto = req.body.edigaUserPhoto
  if (userId == null) {
    return res.status(400).json({ message: 'El usuario no puede ser null' })
  }
  await Observation.create({
    userId,
    title,
    type,
    likes,
    comments,
    music,
    publicationDate,
    hasMusic,
    text,
    photoId,
    edigaUserPhoto,
    createdBy: data.id
  })
  res.status(200).json({ message: 'Observación creada exitosamente' })
}

module.exports = createObservation
