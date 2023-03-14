const bcrypt = require('bcryptjs')

async function passwordReset (req, res) {
  const { password } = req.body
  const response = await setPassword(req.user, password)
  if (response.success) {
    return res.status(200).json({
      message: 'Password updated',
      user: {
        edigaUserId: response.user.edigaUserId,
        email: response.user.email,
        name: response.user.name
      }
    })
  } else {
    return res.status(500).json({
      message: 'Contraseña no actualizada',
      error: response.message
    })
  }
}

async function setPassword (user, password) {
  if (password.length < 6) {
    return ({
      success: false,
      message: 'La contraseña debe tener mas de 6 caracteres.'
    })
  }
  const hash = await bcrypt.hash(password, 10)
  try {
    user = await user.update({
      firstLogIn: false,
      password: hash
    })
    return ({
      success: true,
      user
    })
  } catch (error) {
    return ({
      success: false,
      message: 'No se pudo actualizar el usuario.'
    })
  }
}

module.exports = passwordReset
