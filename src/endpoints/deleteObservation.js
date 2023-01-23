const db = require("../db.js");
const Observation = db.Observation;

async function deleteObservation(req, res) {
	const observationId = req.params.observationId;
	await Observation.destroy({
		where: { observationId },
	});
	res.status(200).json({ message: "Observación eliminada correctaemnte" });
}

module.exports = deleteObservation;
