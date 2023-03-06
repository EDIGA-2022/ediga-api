const db = require("../../db.js");
const UserRegisterInfo = db.UserRegisterInfo;
const User = db.User;
const MiddleFormAnswers = db.MiddleFormAnswers;
const EndFormAnswers = db.EndFormAnswers;
const { getCountry, getGender, getTextAnswer } = require("../../utils.js");


function userInfoTransformer(users) {
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
            dateMiddleForm: user.middleFormAnswers ? user.middleFormAnswers.completedAt : null,
            middleForm1: user.middleFormAnswers ? getTextAnswer(user.middleFormAnswers.answer1): null,
            middleForm2: user.middleFormAnswers ? getTextAnswer(user.middleFormAnswers.answer2) : null,
            dateEndForm: user.endFormAnswers ? user.endFormAnswers.completedAt : null,
            endForm1: user.endFormAnswers ? getTextAnswer(user.endFormAnswers.answer1) : null,
            endForm2: user.endFormAnswers ? getTextAnswer(user.endFormAnswers.answer2) : null,
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
          },
          {
              model: MiddleFormAnswers,
              as: 'middleFormAnswers',
          },
          {
              model: EndFormAnswers,
              as: 'endFormAnswers',
          }
      ],
    });
    // console.log(JSON.stringify(usersInfo));
    res.status(200).json(userInfoTransformer(usersInfo));
}

module.exports = getUsers;
