const db = require("../../db.js");
const EdigaUser = db.EdigaUser;
const { Op } = require("sequelize");

async function editEdigaUser(req, res) {
  const userId = req.body.userId;
  const name = req.body.name;
  const isAdmin = req.body.isAdmin;
  const email = req.body.email;

  const user = await EdigaUser.findByPk(userId);
  if (user) {
    const updatedRows = await EdigaUser.update({
      name: name,
      isAdmin: isAdmin,
      email: email
    }, { where: { edigaUserId: userId } });
    if (updatedRows) {
      res.status(200).json({
        message: "Usuario editado exitosamente",
        success: true
      })
    } else {
      res.status(500).json({
        message: "No user updated",
        success: false
      })
    }
  } else {
    res.status(404).json({
      message: "Usuario no encontrado",
      success: false
    })
  }
}

module.exports = editEdigaUser;



