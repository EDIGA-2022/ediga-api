const db = require("../db.js");
const DiaryEntry = db.DiaryEntry;
const EdigaUser = db.EdigaUser;

async function getUserDiaryEntries(req, res) {
    const userId = req.params.userId;
    const userDiaryEntries = await DiaryEntry.findAll({
        where: {
            userId,
        },
        include: [
            {
                model: EdigaUser,
                as: 'edigaUser',
                attributes: ['name']
            },
        ]
    });
    const diaryEntries = [];
    userDiaryEntries.forEach(entry => {
        diaryEntries.push({
            diaryEntryId: entry.diaryEntryId,
            userId: entry.userId,
            entry: entry.text,
            createdAt: entry.createdAt,
            updatedAt: entry.updatedAt,
            createdBy: entry.edigaUser && entry.edigaUser.name,
        })
    });
    res.status(200).json(diaryEntries);
}

module.exports = getUserDiaryEntries;
