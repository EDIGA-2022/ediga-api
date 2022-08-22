const db = require("../db.js");
const User = db.User;
const Photo = db.Photo;

User.findAll({
    where: {
        userId: '7a7d8d2b-9a89-4bee-823f-f07b2b50383d',
    },
    include: [
        {
            model: Photo,
            as: 'photos',
            attributes: ['photo'],
        }
    ]
})
    .then(results => {
        console.log(JSON.stringify(results));
    })
    .catch(err => {
        console.log(err);
    });
