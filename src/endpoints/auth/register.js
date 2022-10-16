const bcrypt = require("bcryptjs");
const db = require("../../db.js");
const jwt = require('jsonwebtoken');
const isLoggedIn = require("./authenticate").isLoggedIn;


const EdigaUser = db.EdigaUser;

async function register(req, res) {
  authorized = await isLoggedIn(req);
  if (!authorized) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Es necesario iniciar sesión para crear usuarios"
    });
  }
  const { email, password, name } = req.body
  // Basic validation
  if (!email) {
    return res.status(400).json({message: "Email is required"});
  }
  if (!name) {
    return res.status(400).json({message: "Name is required"});
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" })
  }
  // Email is already registered
  const dbEmail = await EdigaUser.findOne({ where: { email: email } });
  if (dbEmail) {
    return res.status(400).json({ message: "El usuario ya existe" })
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
        // This code is intendedly deleted, as we don't want the admin to be logged in.

        // res.cookie("jwt", token, {
        //   httpOnly: true,
        //   maxAge: maxAge * 1000, // 3hrs in ms
        // });
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
