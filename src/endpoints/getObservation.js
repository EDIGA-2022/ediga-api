const db = require("../db.js");
const Observation = db.Observation;

async function getObsevation(req, res) {
    const observationId = req.params.observationId;
    const obs = await Observation.findOne({
        where: {
            observationId,
        }
    });
    if (!obs) {
        res.status(200).json({});
        return
    }
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
        edigaUserPhoto: obs.edigaUserPhoto
    }
    res.status(200).json(resp);
}

module.exports = getObsevation;
