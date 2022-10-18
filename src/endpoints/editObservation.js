const db = require("../db.js");
const Observation = db.Observation;

async function editObservation(req, res) {
    var observationId = req.body.observationId;
    var userId = req.body.userId;
    var title = req.body.title;
    var type = req.body.type;
    var likes = req.body.likes;
    var comments = req.body.comments;
    var music = req.body.music;
    var publicationDate = req.body.date;
    var hasMusic = req.body.hasMusic;
    var text = req.body.observation;
    var edigaUserPhoto = req.body.edigaUserPhoto;
   const updatedRows = await Observation.update(
    {
        observationId: observationId,
        userId: userId,
        title: title,
        type: type,
        likes: likes,
        comments: comments,
        music: music,
        publicationDate: publicationDate,
        hasMusic: hasMusic,
        text: text,
        edigaUserPhoto: edigaUserPhoto
    },
    {
      where: { observationId: observationId },
    }
  );
    res.status(200).json({message: "Success"});
}

module.exports = editObservation;



