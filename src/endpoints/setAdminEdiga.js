const { EdigaUser } = require("../db");

async function setAdminEdiga(req, res) {
  const { userId, admin } = req.body;
  const user = req.user;
  if (user?.isAdmin) {
    const updatedRows = await EdigaUser.update({ 
      isAdmin: admin? admin: false }, { where: { edigaUserId: userId } });
    if (updatedRows) {
      res.status(200).json({
        message: "Admin role updated successfully",
        isAdmin: admin,
        success: true
      })
    } else {
      res.status(500).json({
        message: "No user updated",
        success: false
      })
    }
  }
}

module.exports = setAdminEdiga;
