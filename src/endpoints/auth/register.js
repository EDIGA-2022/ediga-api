const bcrypt = require("bcryptjs");
const db = require("../../db.js");
const jwt = require('jsonwebtoken')

const EdigaUser = db.EdigaUser;


async function register(req, res) {
  const { email, password, name } = req.body
  // Basic validation
  if (!email) {
    return res.status(400).json({message: "Email is required"});
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" })
  }
  // Email is already registered
  const dbEmail = await EdigaUser.findOne({ where: { email: email } });
  if (dbEmail) {
    return res.status(400).json({ message: "User already exists" })
  }
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  // Create user with hashed password
  bcrypt.hash(password, 10).then(async (hash) => {
    await EdigaUser.create({
      email,
      name,
      password: hash,
      firstLogin: true,
    })
      .then((user) =>{
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          { id: user.edigaUserId },
          jwtSecretKey,
          {
            expiresIn: maxAge, // 3hrs in sec
          }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
        });
        res.status(200).json({
          message: "User successfully created",
          user: {
            edigaUserId: user.edigaUserId,
            email: user.email,
            name: user.name
          },
        })
      }
      )
      .catch((error) =>
        res.status(400).json({
          message: "User unsuccessfully created",
          error: error.message,
        })
      );
  });
};


module.exports = register;
