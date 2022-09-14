const db = require("../../db.js");
const jwt = require('jsonwebtoken');
const res = require("express/lib/response.js");

const EdigaUser = db.EdigaUser;

var verifyToken = async function verifyToken(token, secretkey) {
	console.log('This is token: ', token);
	console.log('This is secretkey: ', secretkey);
	try {
		var data = jwt.verify(token, secretkey);
		return data;
	} catch (err) {
		return err;
	}

}

async function loggedIn(req, res) {
	console.log("holis");
	try {
		const jwtSecretKey = process.env.JWT_SECRET_KEY;
		const token = req.cookies.jwt;
		if (token) {
			data = await verifyToken(token, jwtSecretKey);
			user = await getUser(data);
			if (user) {
				res.status(200).json({ user: user });
			} else {
				res.status(200).json({ user: null });
			}


		} else {
			res.status(200).json({ user: null });
		}
	}
	catch (error) {
		console.log(error);
	}
}

var getUser = async function getUser(jwtPayload) {
	try {
		const user = await EdigaUser.findOne({ where: { edigaUserId: jwtPayload.id } });
		if (user) {
			return {
				edigaUserId: user.edigaUserId,
				email: user.email,
				name: user.name
			};
		}
		return null;
	}
	catch (err) {
		console.log(err);
	}
}
var add = function add(x, y) {
  console.log( x + y);
}

module.exports = loggedIn;