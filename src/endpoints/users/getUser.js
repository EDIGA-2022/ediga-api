const db = require('../../db.js')
const User = db.User
const UserRegisterInfo = db.UserRegisterInfo

async function getUser (req, res) {
  const userId = req.params.userId
  const users = await User.findOne({
    where: {
      userId
    }
  })
  const registerInfo = await UserRegisterInfo.findOne({
    where: {
      userId
    }
  })
  const resp = {
    userCountry: users.country,
    answer1: registerInfo.answer1,
    answer2: registerInfo.answer2,
    answer1openField: registerInfo.answer1Field,
    answer3: registerInfo.answer3,
    answer3openField: registerInfo.answer3Field,
    alias: registerInfo.alias
  }
  console.log('Se envía el participante de id: ', userId)
  res.status(200).json(resp)
}

module.exports = getUser
