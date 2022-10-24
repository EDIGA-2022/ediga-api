const { sequelize, MiddleFormAnswers } = require("../db.js");
const db = require("../db.js");
const { getCountry, getGender, getTextAnswer } = require("../utils.js");
const User = db.User;
const DailyUsage = db.DailyUsage;
const MiddleFormAnswer = db.MiddleFormAnswers;

const UserRegisterInfo = db.UserRegisterInfo;
const moment = require('moment');

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
  const dailyUsageQuery = await DailyUsage.findAll({
    attributes: ["usageTime"],
  });

  var durations = [];
  dailyUsageQuery.forEach(item => {
    durations.push(item.usageTime.toString());
  });

  const ms = durations.map(d => moment.duration(d).asSeconds() * 1000);
  const sum = ms.reduce((prev, cur) => prev + cur, 0);
  // console.log(sum);

  const avgUsageTime = Math.trunc(sum / ms.length);

  const durationAvg = moment.duration(avgUsageTime);
  // console.log(durationAvg);

  // Cantidad de usuarios trackeados con daily usage
  const dailyUsageByUser = await DailyUsage.findAll({
    attributes: [[db.sequelize.fn("COUNT", db.sequelize.col("UserId")), "amount"]],
    group: ["UserId"],
  });

  // select * from UserRegisterInfo where Answer_3='Si';
  const usersWithInstagram = await UserRegisterInfo.findAll({
    where: {
      answer3: 'Si'
    }
  });
  // Porcentaje de usuarios que permite el uso de su perfil de instagram
  const instagramPercentage = Math.trunc(usersWithInstagram.length * 100 / totalUsers);
  // middle form answers
  middleFormAnswer1 = await MiddleFormAnswer.findAll({
    attributes: [["Answer_1", "answer"], [db.sequelize.fn("COUNT", db.sequelize.col("Answer_1")), "amount"]],
    group: ['Answer_1'],
  });

  var answersFirstQuestion = [];
  middleFormAnswer1.forEach(item => {
    answersFirstQuestion.push(
      item.dataValues);
  });
  // Agrego pregunta al objeto por las dudas
  answersFirstQuestion.forEach(item => {
    item.answerText = getTextAnswer(item.answer);
  });
  
  var middleFormAnswers = [];
  var middleFormAnswer1Object = {
    question: 'Lo que comparti estos días define lo que soy',
    answers: answersFirstQuestion
  }
  middleFormAnswers.push(middleFormAnswer1Object);

  middleFormAnswer2 = await MiddleFormAnswer.findAll({
    attributes: [["Answer_2", "answer"], [db.sequelize.fn("COUNT", db.sequelize.col("Answer_2")), "amount"]],
    group: ['Answer_2'],
  });

  var answersSecondQuestion = [];
  middleFormAnswer2.forEach(item => {
    answersSecondQuestion.push(
      item.dataValues);
  });
  // Agrego pregunta al objeto por las dudas
  answersSecondQuestion.forEach(item => {
    item.answerText = getTextAnswer(item.answer);
  });

  var middleFormAnswer2Object = {
    question: 'Lo que comparti estos días define lo que quiero que vean de mi',
    answers: answersSecondQuestion
  }
  middleFormAnswers.push(middleFormAnswer2Object);


  // select COUNT(*) from MiddleFormAnswers
  // GROUP BY Answer_1;
  //   const middleFormAnswers = 

  console.log(answersFirstQuestion);

  res.status(200).json({
    countries: usersCountries,
    totalUsers: totalUsers,
    userGenders: userGenders,
    userAges: userAges,
    averageHours: durationAvg.hours(),
    trackedUsers: dailyUsageByUser.length,
    instagramPercentage: instagramPercentage,
    middleFormAnswers: middleFormAnswers
  });
}

module.exports = getMetrics;
