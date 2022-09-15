const db = require("../db.js");
const User = db.User;
const UserRegisterInfo = db.UserRegisterInfo;

async function createParticipant(req, res) {
    var country = req.body.userCountry;
    var answer1 = req.body.answer1;
    var answer2 = req.body.answer2;
    var answer1Field = req.body.answer1openField;
    var answer3 = req.body.answer3;
    //acá se guarda el ig, me fijo si no hay un usuario que ya lo tenga
    var answer3Field = req.body.answer3openField;
    var igUser = await UserRegisterInfo.findOne({ where: { answer3Field: answer3Field } });
    if (igUser) {
        return res.status(400).json({ message: "Existe un participante con el mismo usuario de Instagram" })
    }
    //controles de campos obligatorios
    if (!country) {
        return res.status(400).json({message: "Se debe indicar el país del participante"});
    }
    if (!answer2) {
        return res.status(400).json({message: "Se debe indicar la edad del participante"});
    }
    if (!answer1 && !answer1Field) {
        return res.status(400).json({message: "Se debe indicar el género del participante"});
    }
    //acá se crearía el usuario y además tengo que mandar en la respuesta el id, para despues poder crear mi info
    const newUser = await User.create({
        country,
    });
    //ahora creo la info de register
    const userId = newUser.Id;
    const newUserRegisterInfo = await UserRegisterInfo.create({
        userId,
        answer1,
        answer2,
        answer1Field,
        answer3,
        answer3Field,
    });
    console.log("New user created. Id: ", newUserRegisterInfo.userId);
    res.status(200).json({message: "Success"});
}

module.exports = createParticipant;



