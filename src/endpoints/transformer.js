const fs = require('fs');
const { getGenre, getTextAnswer } = require('../utils.js')

function transformer(user) {
    const u = {
        userId: user.userId,
        country: user.country,
        photos: user.photos.map(p => {
            p.photo = p.photo.replace(/["\n"]/g, '');
            p.answer1 = getTextAnswer(p.answer1);
            p.answer2 = getTextAnswer(p.answer2);
            p.answer3 = getTextAnswer(p.answer3);
            return p;
        }),
        genre: user.userRegisterInfo.answer1 === 6
            ? user.userRegisterInfo.answer1Field
            : getGenre(user.userRegisterInfo.answer1),
        yearsOld: user.userRegisterInfo.answer2,
        investigated: user.userRegisterInfo.answer3 === 'No' ? false : true,
        instagramProfile: user.userRegisterInfo.answer3Field,
        middleFormAnswers: {
            answer1: user.middleFormAnswers ? getTextAnswer(user.middleFormAnswers.answer1): null,
            answer2: user.middleFormAnswers ? getTextAnswer(user.middleFormAnswers.answer2) : null,
        },
        endFormAnswers: {
            answer1: user.endFormAnswers ? getTextAnswer(user.endFormAnswers.answer1) : null,
            answer2: user.endFormAnswers ? getTextAnswer(user.endFormAnswers.answer2) : null,
        },
    };
    fs.writeFile('./text.txt', u.photos[0].photo, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
    return u;
}


module.exports = transformer;
