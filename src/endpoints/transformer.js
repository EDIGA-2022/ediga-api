const fs = require('fs');

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

function getGenre(key) {
    switch (key) {
        case 1:
            return "Mujer cis"
        case 2:
            return "Hombre cis"
        case 3:
            return "Mujer trans"
        case 4:
            return "Hombre trans"
        case 5:
            return "No binario"
        case 5:
            return "Otro"
        default:
            return ""
    }
}

function getTextAnswer(key) {
    switch (key) {
        case 1:
            return "Nada"
        case 2:
            return "Algo"
        case 3:
            return "Bastante"
        case 4:
            return "Mucho"
        case 5:
            return "No corresponde en este caso"
        default:
            return ""
    }
}

module.exports = transformer;
