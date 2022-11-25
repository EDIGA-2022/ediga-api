const { sequelize, } = require("../db.js");
const db = require("../db.js");
const { getCountry, getGender, getTextAnswer } = require("../utils.js");
const User = db.User;
const DailyUsage = db.DailyUsage;
const MiddleFormAnswer = db.MiddleFormAnswers;
const EndFormAnswer = db.EndFormAnswers;

const UserRegisterInfo = db.UserRegisterInfo;
const moment = require('moment');

async function getMetrics(req, res) {

  // Get all registered countries and the amount of users for each one
  const usersCountries = await User.findAll({
    attributes: ["country", [db.sequelize.fn("COUNT", db.sequelize.col("country")), "amount"]],
    group: ['country'],
  });
  var totalUsers = 0;
  usersCountries.forEach(item => {
    item.country = getCountry(item.country);
    totalUsers += item.dataValues.amount;
  });

  // Get genders and amount of each one
  userGenders = await getGenders();


  // Get ages and amount for each age
  userAges = await getAges();

  // Average daily usage (in background)
  const dailyUsageQuery = await DailyUsage.findAll({
    attributes: ["usageTime"],
  });

  var durations = [];
  dailyUsageQuery.forEach(item => {
    durations.push(item.usageTime.toString());
  });
  const ms = durations.map(d => moment.duration(d).asSeconds() * 1000);
  const sum = ms.reduce((prev, cur) => prev + cur, 0);
  const avgUsageTime = Math.trunc(sum / ms.length);

  const durationAvg = moment.duration(avgUsageTime);

  // Amount of users tracked with daily usage (users that allow the app running in the background)
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

  // User percentage that allows the use of their instagram profile
  const instagramPercentage = Math.trunc(usersWithInstagram.length * 100 / totalUsers);

  middleFormAnswersData = await getMiddleFormAnswers(totalUsers);
  endFormAnswersData = await getEndFormAnswers(totalUsers);

  // Users that didn't answer the end form
  const usersWithoutEndForm = middleFormAnswersData.totalAnswers - endFormAnswersData.totalAnswers;


  res.status(200).json({
    countries: usersCountries,
    totalUsers: totalUsers,
    userGenders: userGenders,
    userAges: userAges,
    averageHours: durationAvg.hours(),
    trackedUsers: dailyUsageByUser.length,
    instagramPercentage: instagramPercentage,
    middleFormAnswers: middleFormAnswersData.middleFormAnswers,
    middleFormAnswersAmount: middleFormAnswersData.totalAnswers,
    endFormAnswers: endFormAnswersData.endFormAnswers,
    endFormAnswersAmount: endFormAnswersData.totalAnswers,
    usersWithoutEndForm: usersWithoutEndForm
  });
}

async function getGenders() {
  const userGendersQuery = await sequelize.query(`select Answer_1 as answer1, Count(*) as amount,
    (case when Answer_1 = 6 then Answer_1_open_field end) as Answer_1_open_field
    from UserRegisterInfo t
    group by Answer_1,
    (case when Answer_1 = 6 and Answer_1_open_field is not null
    then Answer_1_open_field end);`
  );

  userGenders = [];
  // Genders has all the options with their corresponding amount and the gender code so that we can filter the ones with gender "6" (textfield) from the frontend.
  // For all predefined genders, the openField is set as empty
  genders = userGendersQuery[0].forEach(item => {
    currentItem = {
      gender: item.answer1 === 6 ? item.Answer_1_open_field : getGender(item.answer1),
      genderCode: item.answer1,
      amount: item.amount,
      openField: item.answer1 === 6 ? item.Answer_1_open_field : ''
    }
    userGenders.push(currentItem);
  });
  return userGenders;
}

async function getAges() {
  ages = await UserRegisterInfo.findAll({
    // Rename answer_2 attribute
    attributes: [["Answer_2", "age"], [db.sequelize.fn("COUNT", db.sequelize.col("Answer_2")), "amount"]],
    group: ['Answer_2'],
  });
  return ages;
}

// Get all the questions and answers for the middle form
async function getMiddleFormAnswers(totalUsers) {
  // Middle form answers
  middleFormAnswer1 = await MiddleFormAnswer.findAll({
    attributes: [["Answer_1", "answer"], [db.sequelize.fn("COUNT", db.sequelize.col("Answer_1")), "amount"]],
    group: ['Answer_1'],
  });

  totalAnswers = 0;
  mostPopularAnswer = "";
  mostPopularAmount = 0;
  completionPercentage = 0;
  var answersFirstQuestion = [];
  middleFormAnswer1.forEach(item => {
    answersFirstQuestion.push(
      item.dataValues);
    if (item.dataValues.amount > mostPopularAmount) {
      mostPopularAmount = item.dataValues.amount;
      mostPopularAnswer = getTextAnswer(item.dataValues.answer);
    }
    totalAnswers += item.dataValues.amount;
  });

  // Agrego pregunta al objeto por las dudas
  answersFirstQuestion.forEach(item => {
    item.answerText = getTextAnswer(item.answer);
  });

  var middleFormAnswers = [];
  var middleFormAnswer1Object = {
    question: 'Lo que comparti estos días define lo que soy',
    answers: answersFirstQuestion,
    mostPopularAnswer: mostPopularAnswer,
    completionPercentage: Math.trunc(totalAnswers * 100 / totalUsers)
  }
  middleFormAnswers.push(middleFormAnswer1Object);

  middleFormAnswer2 = await MiddleFormAnswer.findAll({
    attributes: [["Answer_2", "answer"], [db.sequelize.fn("COUNT", db.sequelize.col("Answer_2")), "amount"]],
    group: ['Answer_2'],
  });

  var answersSecondQuestion = [];
  var mostPopularAnswer = "";
  var mostPopularAmount = 0;
  middleFormAnswer2.forEach(item => {
    answersSecondQuestion.push(
      item.dataValues);
    if (item.dataValues.amount > mostPopularAmount) {
      mostPopularAmount = item.dataValues.amount;
      mostPopularAnswer = getTextAnswer(item.dataValues.answer);
    }
  });

  answersSecondQuestion.forEach(item => {
    item.answerText = getTextAnswer(item.answer);
  });

  var middleFormAnswer2Object = {
    question: 'Lo que comparti estos días define lo que quiero que vean de mi',
    answers: answersSecondQuestion,
    mostPopularAnswer: mostPopularAnswer,
    completionPercentage: Math.trunc(totalAnswers * 100 / totalUsers)
  }
  middleFormAnswers.push(middleFormAnswer2Object);
  return { middleFormAnswers, totalAnswers };
}

// Get all the questions and answers for the end form
async function getEndFormAnswers(totalUsers) {
  // Middle form answers
  endFormAnswer1 = await EndFormAnswer.findAll({
    attributes: [["Answer_1", "answer"], [db.sequelize.fn("COUNT", db.sequelize.col("Answer_1")), "amount"]],
    group: ['Answer_1'],
  });

  totalAnswers = 0;
  var mostPopularAnswer = "";
  var mostPopularAmount = 0;

  completionPercentage = 0;
  var answersFirstQuestion = [];
  endFormAnswer1.forEach(item => {
    answersFirstQuestion.push(
      item.dataValues);
    totalAnswers += item.dataValues.amount;
    if (item.dataValues.amount > mostPopularAmount) {
      mostPopularAmount = item.dataValues.amount;
      mostPopularAnswer = getTextAnswer(item.dataValues.answer);
    }
  });
  // Agrego pregunta al objeto por las dudas
  answersFirstQuestion.forEach(item => {
    item.answerText = getTextAnswer(item.answer);
  });

  var endFormAnswers = [];
  var endFormAnswer1Object = {
    question: 'Has establecido contacto con otras personas por Instagram por afinidad de género',
    answers: answersFirstQuestion,
    mostPopularAnswer: mostPopularAnswer,
    completionPercentage: Math.trunc(totalAnswers * 100 / totalUsers)

  }
  endFormAnswers.push(endFormAnswer1Object);

  endFormAnswer2 = await EndFormAnswer.findAll({
    attributes: [["Answer_2", "answer"], [db.sequelize.fn("COUNT", db.sequelize.col("Answer_2")), "amount"]],
    group: ['Answer_2'],
  });

  var answersSecondQuestion = [];

  var mostPopularAnswer = "";
  var mostPopularAmount = 0;
  endFormAnswer2.forEach(item => {
    answersSecondQuestion.push(
      item.dataValues);

    if (item.dataValues.amount > mostPopularAmount) {
      mostPopularAmount = item.dataValues.amount;
      mostPopularAnswer = getTextAnswer(item.dataValues.answer);
    }

  });
  // Agrego pregunta al objeto por las dudas
  answersSecondQuestion.forEach(item => {
    item.answerText = getTextAnswer(item.answer);
  });

  var endFormAnswer2Object = {
    question: 'Los contenidos de otras personas te han hecho reflexionar sobre tu identidad de género',
    answers: answersSecondQuestion,
    mostPopularAnswer: mostPopularAnswer,
    completionPercentage: Math.trunc(totalAnswers * 100 / totalUsers)

  }
  endFormAnswers.push(endFormAnswer2Object);
  return { endFormAnswers, totalAnswers };
}

module.exports = getMetrics;
