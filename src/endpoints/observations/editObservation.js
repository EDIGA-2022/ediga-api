const db = require("../../db.js");
const Observation = db.Observation;
var moment = require('moment');

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
  var photoId = req.body.photoId;
  if (photoId) {
    await Observation.update(
      {
        observationId: observationId,
        title: title,
        text: text,
        updatedAt: moment(),
      },
      {
        where: { observationId: observationId },
      }
    );
  } else {
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
        edigaUserPhoto: edigaUserPhoto,
        updatedAt: moment(),
      },
      {
        where: { observationId: observationId },
      }
    );
  }

  res.status(200).json({ message: "Observación editada exitosamente" });
}

module.exports = editObservation;



