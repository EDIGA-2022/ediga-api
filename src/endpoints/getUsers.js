const db = require("../db.js");
const UserRegisterInfo = db.UserRegisterInfo;
const User = db.User;
const { getCountry, getGender } = require("../utils.js");

function userRegisterInfoTransformer(users) {
    const results = []
    for (user of users) {
        const u = {
            userId: user.userId,
            country: getCountry(user.country),
            gender: user.userRegisterInfo.answer1 === 6
                ? user.userRegisterInfo.answer1Field
                : getGender(user.userRegisterInfo.answer1),
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
    });
    console.log(JSON.stringify(usersInfo));
    res.status(200).json(userRegisterInfoTransformer(usersInfo));
}

module.exports = getUsers;
