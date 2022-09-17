const db = require("../db.js");
const UserRegisterInfo = db.UserRegisterInfo;
const User = db.User;

async function getUsers(req, res) {
    const usersInfo = await User.findAll({
        include: [
            {
                model: UserRegisterInfo,
                as: 'registerInfo',
                attributes: ['answer1', 'answer1Field', 'answer2', 'answer3', 'answer3Field', 'alias'],
            }
        ]
    })
    .then(results => {
        console.log(JSON.stringify(results));
        res.status(200).json(results);
    })
    .catch(err => {
        console.log(err);
    });
}

module.exports = getUsers;
