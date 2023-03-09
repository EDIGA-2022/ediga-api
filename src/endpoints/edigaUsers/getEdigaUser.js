const db = require("../../db.js");
const EdigaUser = db.EdigaUser;

async function getEdigaUser(req, res) {
  const userId = req.params.userId;
  const user = await EdigaUser.findByPk(userId);
  if (user) {
    res.status(200).json({ success: true, user: user });
  } else {
    res.status(404).json({
      message: "Usuario no encontrado",
      success: false
    })
  }
}

module.exports = getEdigaUser;
