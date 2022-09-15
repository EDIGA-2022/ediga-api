const db = require("../db.js");
const User = db.User;
const UserRegisterInfo = db.UserRegisterInfo;
const { Op } = require("sequelize");

async function editUser(req, res) {
    var userId = req.body.userId;
    var country = req.body.userCountry;
    var answer1 = req.body.answer1;
    var answer2 = req.body.answer2;
    var answer1Field = req.body.answer1openField;
    var answer3 = req.body.answer3;
    //acá se guarda el ig, me fijo si no hay un usuario que ya lo tenga
    var answer3Field = req.body.answer3openField;
    var igUser = await UserRegisterInfo.findOne({ 
        where: {
         [Op.and]: [{ answer3Field: answer3Field }, {userId:{[Op.ne]:userId }}]
        }
    });
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
   //ahora que esta todo ok actualizo el participante
   const updatedRows = await User.update(
    {
      country: country,
    },
    {
      where: { Id: userId },
    }
  );
  const updatedRows2 = await UserRegisterInfo.update(
    {
        answer1: answer1,
        answer2: answer2,
        answer1Field: answer1Field,
        answer3: answer3,
        answer3Field: answer3Field,
    },
    {
      where: { userId: userId },
    }
  );
    console.log("User updated. Id: ", userId);
    res.status(200).json({message: "Success"});
}

module.exports = editUser;



