const db = require("../db.js");
const DiaryEntry = db.DiaryEntry;

async function getDiaryEntry(req, res) {
    const diaryEntryId = req.params.entryId;
    const obs = await DiaryEntry.findOne({
        where: {
            diaryEntryId,
        }
    });
    var resp = {
        entryId: obs.diaryEntryId,
        userId: obs.userId,
        entry: obs.text,
    }
    res.status(200).json(resp);
}

module.exports = getDiaryEntry;



