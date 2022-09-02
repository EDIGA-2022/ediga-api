const db = require("../../db.js");
const bcrypt = require("bcryptjs");

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
		const user = await EdigaUser.findOne({ where: {email: email} })
		if (!user) {
			res.status(400).json({
				message: "Login unsuccessful",
				error: "User not found",
			})
		} else {
			// comparing given password with hashed password
			bcrypt.compare(password, user.password).then(function (result) {
				result
					? res.status(200).json({
						message: "Login successful",
						user: {
							edigaUserId: user.edigaUserId,
							email: user.email,
							name: user.name
						},
					})
					: res.status(400).json({ message: "Email or password are incorrect. Try again" })
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
