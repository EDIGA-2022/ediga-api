const db = require("../../db.js");
const jwt = require('jsonwebtoken');

const EdigaUser = db.EdigaUser;

// Function that can be used from anywhere in the code to check if user is logged in 
async function isLoggedIn(req) {
	const jwtSecretKey = process.env.JWT_SECRET_KEY;
  var token = ''
  if (req.headers.authorization){
    token = req.headers.authorization.replace("Bearer ","");
  } else {
    return false;
  }
	if (token) {
		data = verifyToken(token, jwtSecretKey);
		if (data) {
			user = await getUser(data);
			return user ?? false;
		}
	}
	return false;
}

var verifyToken = function verifyToken(token, secretkey) {
	try {
		var data = jwt.verify(token, secretkey);
		return data;
	} catch (err) {
		return false;
	}
}

var getUser = async function getUser(jwtPayload) {
	const user = await EdigaUser.findOne({ where: { edigaUserId: jwtPayload.id } });
	return user;
}


module.exports = { isLoggedIn };