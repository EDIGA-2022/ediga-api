const db = require("../db.js");
const User = db.User;

async function getUsers(req, res) {
    const users = await User.findAll({});
    console.log("users", JSON.stringify(users))
    res.status(200).json(users);
}

module.exports = getUsers;
