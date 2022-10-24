const db = require("../db.js");
const Observation = db.Observation;
const Photo = db.Photo;
const { getTextAnswer } = require('../utils.js')

async function getObsevation(req, res) {
    const observationId = req.params.observationId;
    const obs = await Observation.findByPk(observationId, {
        include: [
            {
                model: Photo,
                as: 'photo',
                attributes: ['photoId', 'photo', 'answer1', 'answer2', 'answer3', 'createdAt']
            },
        ]
    });
    var resp = {
        observationId: obs.observationId,
        title: obs.title,
        type: obs.type,
        likes: obs.likes,
        comments: obs.comments,
        music: obs.music,
        date: obs.publicationDate,
        hasMusic: obs.hasMusic,
        observation: obs.text,
        edigaUserPhoto: obs.edigaUserPhoto,
        photoId: obs.photo.photoId,
        userId: obs.userId,
        photo: JSON.stringify((obs.photo.photo).replace(/["\n"]/g, '')),
        answer1: getTextAnswer(obs.photo.answer1),
        answer2: getTextAnswer(obs.photo.answer2),
        answer3: getTextAnswer(obs.photo.answer3),
    }
    res.status(200).json(resp);
}

module.exports = getObsevation;
