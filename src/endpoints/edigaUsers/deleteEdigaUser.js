const { EdigaUser } = require('../../db')

async function deleteEdigaUser (req, res) {
  const { userId } = req.body
  const user = req.user
  if (user?.isAdmin) {
    const count = await EdigaUser.destroy({ where: { edigaUserId: userId } })
    if (count > 0) {
      res.status(200).json({
        message: 'Usuario eliminado exitosamente',
        success: true
      })
    } else {
      res.status(500).json({
        message: 'No user deleted',
        success: false
      })
    }
  }
}

module.exports = deleteEdigaUser
