const db = require("../db.js");
const Observation = db.Observation;

async function getUserObservation(req, res) {
    const observationId = req.params.observationId;
    const userObservation = await Observation.findByPk(observationId);
    res.status(200).json(userObservation);
}

module.exports = getUserObservation;
