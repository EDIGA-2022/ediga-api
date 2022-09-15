const db = require("../../db.js");
// const User = db.User;
const UserRegisterInfo = db.UserRegisterInfo;

async function listUsers(req, res) {
    const usersInfo = await UserRegisterInfo.findAll({
        // include: [
        //     {
        //         model: UserRegisterInfo,
        //         as: 'registerInfo',
        //         attributes: ['answer1', 'answer1Field'],
        //     }
        // ]
    })
    console.log("users", JSON.stringify(usersInfo))
    res.status(200).json(usersInfo);
}

module.exports = listUsers;
