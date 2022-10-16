const db = require("../db.js");
const Observation = db.Observation;

async function getUserObservation(req, res) {
    console.log("-----", req.params.observationId)
    const observationId = req.params.observationId;
    const userObservation = await Observation.findByPk(observationId);
    console.log("observationId-->", JSON.stringify(userObservation))
    res.status(200).json(userObservation);
}

module.exports = getUserObservation;
