const db = require("../db.js");
const User = db.User;
const DiaryEntry = db.DiaryEntry;

async function createDiaryEntry(req, res) {
    var userId = req.body.userId;
    var text = req.body.entry; //text
    if (userId == null){
        return res.status(400).json({ message: "El usuario no puede ser null" })
    }
    const newEntry = await DiaryEntry.create({
        userId,
        text,
    });
    console.log("New entry created. Id: ", newEntry.userId);
    res.status(200).json({message: "Success"});
}

module.exports = createDiaryEntry;



