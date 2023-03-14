const db = require('../../db.js')
const User = db.User
const UserRegisterInfo = db.UserRegisterInfo
const { Op } = require('sequelize')

async function editUser (req, res) {
  const userId = req.body.userId
  const alias = req.body.alias
  const country = req.body.userCountry
  const answer1 = req.body.answer1
  const answer2 = req.body.answer2
  const answer1Field = req.body.answer1openField
  const answer3 = req.body.answer3
  // acá se guarda el ig, me fijo si no hay un usuario que ya lo tenga
  const answer3Field = req.body.answer3openField
  if (answer3Field != null && answer3Field !== '') {
    const igUser = await UserRegisterInfo.findOne({
      where: {
        [Op.and]: [{ answer3Field }, { userId: { [Op.ne]: userId } }]
      }
    })
    if (igUser) {
      return res.status(400).json({ message: 'Existe un participante con el mismo usuario de Instagram' })
    }
  }
  // controles de campos obligatorios
  if (!country) {
    return res.status(400).json({ message: 'Se debe indicar el país del participante' })
  }
  if (!answer2) {
    return res.status(400).json({ message: 'Se debe indicar la edad del participante' })
  }
  if (!answer1 && !answer1Field) {
    return res.status(400).json({ message: 'Se debe indicar el género del participante' })
  }
  // ahora que esta todo ok actualizo el participante
  await User.update(
    {
      country
    },
    {
      where: { Id: userId }
    }
  )
  await UserRegisterInfo.update(
    {
      answer1,
      answer2,
      answer1Field,
      answer3,
      answer3Field,
      alias
    },
    {
      where: { userId }
    }
  )
  res.status(200).json({ message: 'Usuario editado exitosamente' })
}

module.exports = editUser
