const db = require("../db.js");
const Photo = db.Photo;

async function getUserPhotos(req, res) {
    console.log("req.params.userId", req.params.userId)
    //7a7d8d2b-9a89-4bee-823f-f07b2b50383d
    const userId = req.params.userId;
    const userPhotos = await Photo.findAll({
        where: {
            userId,
        }
    });
    console.log("-->", JSON.stringify("userPhotos"))
    res.status(200).json(userPhotos);
}

module.exports = getUserPhotos;
