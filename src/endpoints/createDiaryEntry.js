const db = require("../db.js");
const DiaryEntry = db.DiaryEntry;
const jwt = require('jsonwebtoken');

async function createDiaryEntry(req, res) {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.headers.authorization.replace("Bearer ", "");
    const data = jwt.verify(token, jwtSecretKey);

    var userId = req.body.userId;
    var text = req.body.entry; //text
    if (userId == null){
        return res.status(400).json({ message: "El usuario no puede ser null" })
    }
    const newEntry = await DiaryEntry.create({
        userId,
        text,
        createdBy: data.id,
    });
    console.log("New entry created. Id: ", newEntry.userId);
    res.status(200).json({message: "Success"});
}

module.exports = createDiaryEntry;



