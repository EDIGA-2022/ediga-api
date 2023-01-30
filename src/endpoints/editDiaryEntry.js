const db = require("../db.js");
const DiaryEntry = db.DiaryEntry;

async function editDiaryEntry(req, res) {
    var diaryEntryId = req.body.entryId;
    var text = req.body.entry;
   const updatedRows = await DiaryEntry.update(
    {
        entryId: diaryEntryId,
        text: text
    },
    {
      where: { diaryEntryId: diaryEntryId },
    }
  );
    res.status(200).json({message: "Entrada de campo editada exitosamente"});
}

module.exports = editDiaryEntry;