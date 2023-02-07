const { EdigaUser } = require("../../db");

async function getEdigaUsers(req, res) {
  const { userId } = req.body;
  const user = req.user;
  if (user?.isAdmin) {
    const users = await EdigaUser.findAll();
    if (users) {
      res.status(200).json({
        message: "Success",
        success: true,
        users
      })
    } else {
      res.status(500).json({
        message: "No users found",
        success: false
      })
    }
  } else {
    res.status(403).json({
      message: "Unauthorized",
      success: false
    })
  }
}

module.exports = getEdigaUsers;


