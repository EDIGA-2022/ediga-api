const { sequelize } = require("../db.js");
const db = require("../db.js");
const { getCountry, getGender } = require("../utils.js");
const User = db.User;

const UserRegisterInfo = db.UserRegisterInfo;


async function getMetrics(req, res) {
  const usersCountries = await User.findAll({
    attributes: ["country", [db.sequelize.fn("COUNT", db.sequelize.col("country")), "amount"]],
    group: ['country'],
  });
  var totalUsers = 0;
  usersCountries.forEach(item => {
    item.country = getCountry(item.country);
    totalUsers += item.dataValues.amount;
  });

  const userGendersQuery = await sequelize.query(`select Answer_1 as answer1, Count(*) as amount,
    (case when Answer_1 = 6 then Answer_1_open_field end) as Answer_1_open_field
    from UserRegisterInfo t
    group by Answer_1,
    (case when Answer_1 = 6 and Answer_1_open_field is not null
    then Answer_1_open_field end);`
  );

  userGenders = [];
  // En generos devuelvo todos las opciones con sus respectivas cantidades y 
  // el codigo del genero para poder filtrar las de genero "6" (campo libre) desde el front. 
  // Para los generos que estan predefinidos, el campo "openField lo seteo vacio".
  genders = userGendersQuery[0].forEach(item => {
    currentItem = {
      gender: item.answer1 === 6 ? item.Answer_1_open_field : getGender(item.answer1),
      genderCode: item.answer1,
      amount: item.amount,
      openField: item.answer1 === 6 ? item.Answer_1_open_field : ''
    }
    userGenders.push(currentItem);
  });

  //Edades
  userAges = await UserRegisterInfo.findAll({
    // Rename answer_2 attribute
    attributes: [["Answer_2", "age"], [db.sequelize.fn("COUNT", db.sequelize.col("Answer_2")), "amount"]],
    group: ['Answer_2'],
  });

  //Promedio de uso diario
  dailyUsageAverage = 
  

  res.status(200).json({
    countries: usersCountries,
    totalUsers: totalUsers,
    userGenders: userGenders,
    userAges: userAges

  });
}

module.exports = getMetrics;
