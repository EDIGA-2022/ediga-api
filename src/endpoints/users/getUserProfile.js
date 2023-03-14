const db = require('../../db.js')
const Photo = db.Photo
const User = db.User
const UserRegisterInfo = db.UserRegisterInfo
const MiddleFormAnswers = db.MiddleFormAnswers
const EndFormAnswers = db.EndFormAnswers
const transformer = require('./transformer.js')

async function getUserProfile (req, res) {
  const userId = req.params.userId
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Photo,
        as: 'photos',
        attributes: ['photoId', 'photo', 'answer1', 'answer2', 'answer3', 'createdAt']
      },
      {
        model: UserRegisterInfo,
        as: 'userRegisterInfo'
      },
      {
        model: MiddleFormAnswers,
        as: 'middleFormAnswers'
      },
      {
        model: EndFormAnswers,
        as: 'endFormAnswers'
      }
    ]
  })
  if (!user) {
    res.status(200).json({})
    return
  }
  res.status(200).json(transformer(user))
}

module.exports = getUserProfile
