const { EdigaUser } = require("../db");

async function deleteAdminEdiga(req, res) {
  const { userId } = req.body;
  const user = req.user;
  if (user?.isAdmin) {
    const updatedRows = await EdigaUser.update({ isAdmin: false }, { where: { edigaUserId: userId } });
    if (updatedRows) {
      res.status(200).json({
        message: "Admin role removed successfully",
        success: true
      })
    } else {
      res.status(500).json({
        message: "Couldn't remove admin role",
        success: false
      })
    }
  }
}

module.exports = deleteAdminEdiga;
