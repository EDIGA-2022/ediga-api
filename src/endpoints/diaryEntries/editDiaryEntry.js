const db = require('../../db.js')
const DiaryEntry = db.DiaryEntry

async function editDiaryEntry (req, res) {
  const diaryEntryId = req.body.entryId
  const text = req.body.entry
  await DiaryEntry.update(
    {
      entryId: diaryEntryId,
      text
    },
    {
      where: { diaryEntryId }
    }
  )
  res.status(200).json({ message: 'Entrada de campo editada exitosamente' })
}

module.exports = editDiaryEntry
