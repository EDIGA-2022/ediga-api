const db = require('../../db.js')
const Photo = db.Photo

async function getUserPhotos (req, res) {
  const userId = req.params.userId
  const userPhotos = await Photo.findAll({
    where: {
      userId
    }
  })
  res.status(200).json(userPhotos)
}

module.exports = getUserPhotos
