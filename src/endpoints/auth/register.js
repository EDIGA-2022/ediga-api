const db = require("../../db.js");
const EdigaUser = db.EdigaUser;

async function register(req, res) {
  const { email, password } = req.body
	console.log(req.body);
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" })
  }
  try {
    await EdigaUser.create({
      email,
      password,
    }).then(user =>
      res.status(200).json({
        message: "User successfully created",
        user,
      })
    )
  } catch (err) {
    res.status(401).json({
      message: "User not successful created",
      // error: error.mesage,
    })
  }
}

module.exports = register;
