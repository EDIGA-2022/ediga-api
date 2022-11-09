const db = require("../db.js");
const User = db.User;
const Observation = db.Observation;

async function createObservation(req, res) {
    const userId = req.params.userId;
    var title = req.body.title;
    var type = req.body.type;
    var likes = req.body.likes;
    var comments = req.body.comments;
    var music = req.body.music;
    var publicationDate = req.body.date;
    var hasMusic = req.body.hasMusic;
    var text = req.body.observation; //text
    var photoId = req.body.photoId;
    var edigaUserPhoto = req.body.edigaUserPhoto;
    if (userId == null){
        return res.status(400).json({ message: "El usuario no puede ser null" })
    }
    const newObservation = await Observation.create({
        userId,
        title,
        type,
        likes,
        comments,
        music,
        publicationDate,
        hasMusic,
        text,
        photoId,
        edigaUserPhoto,
    });
    console.log("New observation created. Id: ", newObservation.userId);
    res.status(200).json({message: "Success"});
}

module.exports = createObservation;



