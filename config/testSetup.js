// const sinon = require('sinon');
// const chai = require('chai');
// const sinonChai = require('sinon-chai');
// const winston = require('winston');
// global.__local_modules = __dirname + '/../lib/local_modules/';
// process.env.PORT = 3000;
// // const models = require(__local_modules + 'models');

// before(async () => {
//   chai.use(sinonChai);

//   winston.setLevels({
//     debug: 5,
//     info: 4,
//     warning: 3,
//     error: 2,
//     critical: 1,
//     test: 0,
//   });

//   winston.addColors({
//     debug: 'green',
//     info: 'cyan',
//     warn: 'yellow',
//     error: 'red',
//     critical: 'red',
//     test: 'blue',
//   });

//   winston.remove(winston.transports.Console);
//   winston.add(winston.transports.Console, {
//     level: process.env.LOGGER_LEVEL || 'warn',
//     colorize: true,
//   });

// //   await models.db.query(createAll);

//   return Promise.resolve();
// });