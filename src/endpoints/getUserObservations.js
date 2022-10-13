const db = require("../db.js");
const Observation = db.Observation;

async function getUserObservations(req, res) {
    const userId = req.params.userId;
    const userObservation = await Observation.findAll({
        where: {
            userId,
        }
    });
    console.log("userObservation-->", JSON.stringify(userObservation))
    res.status(200).json(userObservation);
}

module.exports = getUserObservations;
