const { sequelize } = require("../db.js");
const db = require("../db.js");
const User = db.User;
const isLoggedIn = require("../endpoints/auth/authenticate").isLoggedIn;
const UserRegisterInfo = db.UserRegisterInfo;


async function getMetrics(req, res) {
  // authorized = await isLoggedIn(req);
  // if (!authorized) {
  //   return res.status(401).json({
  //     error: "Unauthorized",
  //     message: "Debes iniciar sesión"
  //   });
  // }
  const usersCountries = await User.findAll({
    attributes: ["country", [db.sequelize.fn("COUNT", db.sequelize.col("country")), "amount"]],
    group: ['country'],
  });
  var totalUsers = 0;
  usersCountries.forEach(item => {
    totalUsers += item.dataValues.amount;
  });
  //Get different genres
  // const usersGenres = await UserRegisterInfo.findAll({
  //     select Answer_1, Count(*),
  //        (case when Answer_1=6 then Answer_1_open_field end) as Answer_1_open_field
  // from UserRegisterInfo t
  // group by Answer_1,
  //          (case when Answer_1=6 and Answer_1_open_field is not null
  //                then Answer_1_open_field end);

  // raw query for simplicity 
  // const userGenres = await sequelize.query("SELECT  FROM `users`", { type: QueryTypes.SELECT });


  console.log(usersGenres);
  res.status(200).json({
    countries: usersCountries,
    totalUsers: totalUsers
  });
}

module.exports = getMetrics;
