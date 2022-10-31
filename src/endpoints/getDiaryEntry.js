const db = require("../db.js");
const DiaryEntry = db.DiaryEntry;

async function getDiaryEntry(req, res) {
    const diaryEntryId = req.params.entryId;
    const diaryEntry = await DiaryEntry.findByPk(diaryEntryId);
    if (!diaryEntry) {
        res.status(200).json({});
        return
    }
    var resp = {
        diaryEntryId: diaryEntry.diaryEntryId,
        userId: diaryEntry.userId,
        entry: diaryEntry.text,
    }
    res.status(200).json(resp);
}

module.exports = getDiaryEntry;



