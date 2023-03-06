const db = require("../../db.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')


const EdigaUser = db.EdigaUser;

async function login(req, res) {
	const { email, password } = req.body
	// Check if email and password are provided.
	if (!email || !password) {
		return res.status(400).json({
			message: "Email and password are required",
		})
	}
	try {
		const user = await EdigaUser.findOne({ where: { email: email } })
		if (!user) {
			res.status(400).json({
				error: "Login unsuccessful",
				message: "Usuario no encontrado",
			})
		} else {
			// comparing given password with hashed password
			const jwtSecretKey = process.env.JWT_SECRET_KEY;
			bcrypt.compare(password, user.password()).then(function (result) {
				if (result) {
					const maxAge = 24 * 60 * 60;
					const token = jwt.sign(
						{ id: user.edigaUserId },
						jwtSecretKey,
						{ expiresIn: maxAge } // 24 hs in secs
					);
					res.status(200).json({
						message: "Login successful",
						user: {
							edigaUserId: user.edigaUserId,
							email: user.email,
							name: user.name,
							firstLogIn: user.firstLogIn,
              isAdmin: user.isAdmin,
						},
            token: token
					})
				} else {
					res.status(400).json({ message: "Email or password are incorrect. Try again" });
				}

			})
		}
	} catch (error) {
		res.status(400).json({
			message: "An error occurred",
			error: error.message,
		})
	}
}


module.exports = login;
