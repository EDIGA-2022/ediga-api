const db = require("../../db.js");
const User = db.User;
const UserRegisterInfo = db.UserRegisterInfo;

async function deleteUser(req, res) {
	const userId = req.params.userId;
	await User.destroy({
		where: { userId },
	});
    await UserRegisterInfo.destroy({
        where: { userId },
    });
	res.status(200).json({ message: "Sujeto eliminado correctamente" });
}

module.exports = deleteUser;