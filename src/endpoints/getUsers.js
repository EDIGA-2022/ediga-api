const db = require("../db.js");
const User = db.User;
const isLoggedIn = require("../endpoints/auth/authenticate").isLoggedIn;

async function getUsers(req, res) {
  authorized = await isLoggedIn(req);
  if (!authorized) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Debes iniciar sesión"
    });
  }
  const users = await User.findAll({});
  // console.log("users", JSON.stringify(users))
  res.status(200).json(users);

}

module.exports = getUsers;
