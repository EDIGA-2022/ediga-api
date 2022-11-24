const bcrypt = require("bcryptjs");
const db = require("../../db.js");
const jwt = require('jsonwebtoken');
const isLoggedIn = require("./authenticate").isLoggedIn;


const EdigaUser = db.EdigaUser;

async function register(req, res) {
  const { email, password, name, isAdmin, country } = req.body
  // Basic validation
  if (!email) {
    return res.status(400).json({message: "El campo de email es obligatorio"});
  }
  if (!name) {
    return res.status(400).json({message: "El campo de nombre es obligatorio"});
  }
  if (!country) {
    return res.status(400).json({message: "El campo de país es obligatorio"});
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "La contraseña debe tener más de 6 caracteres" })
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
      isAdmin: isAdmin ? isAdmin : false,
      country: country
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
        res.status(200).json({
          message: "User successfully created",
          user: {
            edigaUserId: user.edigaUserId,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            country: user.country
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
