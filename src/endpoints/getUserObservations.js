const db = require("../db.js");
const Observation = db.Observation;
const Photo = db.Photo;

async function getUserObservations(req, res) {
    const userId = req.params.userId;
    const userObservation = await Observation.findAll({
        where: {
            userId,
        }
    });
    const observations = [];
    // photoObservation is true when the obs is a obs of a photo
    userObservation.forEach(element => {
        observations.push({
            observationId: element.observationId,
            title: element.title,
            photoId: element.photoId,
            text: element.text,
            createdAt: element.createdAt,
            updatedAt: element.updatedAt,
        })
    });
    res.status(200).json(observations);
}

module.exports = getUserObservations;
