const db = require("../../db.js");
const Observation = db.Observation;
const jwt = require('jsonwebtoken');

async function createObservation(req, res) {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.headers.authorization.replace("Bearer ", "");
    const data = jwt.verify(token, jwtSecretKey);

    var userId = req.body.userId;
    var title = req.body.title;
    var type = req.body.type;
    var likes = req.body.likes;
    var comments = req.body.comments;
    var music = req.body.music;
    var publicationDate = req.body.date ? req.body.date : null;
    var hasMusic = req.body.hasMusic;
    var text = req.body.observation; //text
    var photoId = req.body.photoId;
    var edigaUserPhoto = req.body.edigaUserPhoto;
    if (userId == null) {
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
        createdBy: data.id,
    });
    res.status(200).json({ message: "Observación creada exitosamente" });
}

module.exports = createObservation;



