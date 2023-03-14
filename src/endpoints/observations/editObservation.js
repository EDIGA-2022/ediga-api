const db = require('../../db.js')
const Observation = db.Observation
const moment = require('moment')

async function editObservation (req, res) {
  const observationId = req.body.observationId
  const userId = req.body.userId
  const title = req.body.title
  const type = req.body.type
  const likes = req.body.likes
  const comments = req.body.comments
  const music = req.body.music
  const publicationDate = req.body.date
  const hasMusic = req.body.hasMusic
  const text = req.body.observation
  const edigaUserPhoto = req.body.edigaUserPhoto
  const photoId = req.body.photoId
  if (photoId) {
    await Observation.update(
      {
        observationId,
        title,
        text,
        updatedAt: moment()
      },
      {
        where: { observationId }
      }
    )
  } else {
    await Observation.update(
      {
        observationId,
        userId,
        title,
        type,
        likes,
        comments,
        music,
        publicationDate,
        hasMusic,
        text,
        edigaUserPhoto,
        updatedAt: moment()
      },
      {
        where: { observationId }
      }
    )
  }

  res.status(200).json({ message: 'Observación editada exitosamente' })
}

module.exports = editObservation
