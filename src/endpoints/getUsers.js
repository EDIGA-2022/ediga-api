const db = require("../db.js");
const UserRegisterInfo = db.UserRegisterInfo;
const User = db.User;
const { getCountry, getGenre } = require("../utils.js");

function userRegisterInfoTransformer(users) {
    const results = []
    for (user of users) {
        const u = {
            userId: user.userId,
            country: getCountry(user.country),
            genre: user.userRegisterInfo.answer1 === 6
                ? user.userRegisterInfo.answer1Field
                : getGenre(user.userRegisterInfo.answer1),
            yearsOld: user.userRegisterInfo.answer2,
            instagramProfile: user.userRegisterInfo.answer3Field,
            alias: user.userRegisterInfo.alias,
        };
        results.push(u);
    }
    return results;
}


async function getUsers(req, res) {
    const usersInfo = await User.findAll({
        include: [
            {
                model: UserRegisterInfo,
                as: 'userRegisterInfo',
                required: true,
            }
        ]
    })
    .then(results => {
        console.log(JSON.stringify(results));
        res.status(200).json(userRegisterInfoTransformer(results));
    })
    .catch(err => {
        console.log(err);
    });
}

module.exports = getUsers;
