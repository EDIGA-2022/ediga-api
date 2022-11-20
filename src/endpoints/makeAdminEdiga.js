const { EdigaUser } = require("../db");

async function makeAdminEdiga(req, res) {
  const { userId } = req.body;
  const user = req.user;
  if (user?.isAdmin) {
    const updatedRows = await EdigaUser.update({ isAdmin: true }, { where: { edigaUserId: userId } });
    if (updatedRows) {
      res.status(200).json({
        message: "Success",
        success: true
      })
    } else {
      res.status(500).json({
        message: "No user deleted",
        success: false
      })
    }
  }
}

module.exports = makeAdminEdiga;
