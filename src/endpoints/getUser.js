const db = require("../db.js");
const Photo = db.Photo;
const User = db.User;
const UserRegisterInfo = db.UserRegisterInfo;
const MiddleFormAnswers = db.MiddleFormAnswers;
const EndFormAnswers = db.EndFormAnswers;
const transformer = require("./transformer.js");
const fs = require('fs');

async function getUserPhotos(req, res) {
    console.log("req.params.userId", req.params.userId)
    //7a7d8d2b-9a89-4bee-823f-f07b2b50383d
    const userId = req.params.userId;
    const user = await User.findByPk(userId, {
        include: [
            {
                model: Photo,
                as: 'photos',
                attributes: ['photoId', 'photo', 'answer1', 'answer2', 'answer3', 'createdAt']
            },
            {
                model: UserRegisterInfo,
                as: 'userRegisterInfo',
            },
            {
                model: MiddleFormAnswers,
                as: 'middleFormAnswers',
            },
            {
                model: EndFormAnswers,
                as: 'endFormAnswers',
            }
        ]
    });

    // user.photos.forE(p => {
    //     console.log("-->", p.photo.replace('\n', ''))
    //     fs.writeFile('./text.txt', p.photo.replace('\n', ''), err => {
    //         if (err) {
    //             console.error(err);
    //         }
    //         // file written successfully
    //     });
    //     p.photo = p.photo.replace('\n', '');

    // });
    // console.log("-->", JSON.stringify(user.photos[0].photo))
    res.status(200).json(transformer(user));
}

module.exports = getUserPhotos;
