require('dotenv').config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mariadb',
  define: {
    timestamps: false
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Activity
db.Activity = require("../models/Activity.model.js")(sequelize, Sequelize);

// Photo
db.Photo = require("../models/Photo.model.js")(sequelize, Sequelize);

// User
db.User = require("../models/User.model.js")(sequelize, Sequelize);

// UserRegisterInfo
db.UserRegisterInfo = require("../models/UserRegisterInfo.model.js")(sequelize, Sequelize);

//MiddleFormAnswers
db.MiddleFormAnswers = require("../models/MiddleFormAnswers.model.js")(sequelize, Sequelize);

//EndFormAnswers
db.EndFormAnswers = require("../models/EndFormAnswers.model.js")(sequelize, Sequelize);


db.User.hasMany(db.Photo, { as: 'photos', foreignKey: { name: 'userId', field: 'Id' } });
db.Photo.belongsTo(db.User, { as: 'user', foreignKey: { name: 'userId', field: 'UserId' } });

db.User.hasOne(db.UserRegisterInfo, { as: 'userRegisterInfo', foreignKey: { name: 'userId', field: 'Id' } });
db.UserRegisterInfo.hasOne(db.User, { as: 'user', foreignKey: { name: 'userId', field: 'UserId' } });

db.User.hasOne(db.MiddleFormAnswers, { as: 'middleFormAnswers', foreignKey: { name: 'userId', field: 'Id' } });
db.MiddleFormAnswers.hasOne(db.User, { as: 'user', foreignKey: { name: 'userId', field: 'UserId' } });

db.User.hasOne(db.EndFormAnswers, { as: 'endFormAnswers', foreignKey: { name: 'userId', field: 'Id' } });
db.EndFormAnswers.hasOne(db.User, { as: 'user', foreignKey: { name: 'userId', field: 'UserId' } });



// db.customers = require("../models/customer.model.js")(sequelize, Sequelize);
// db.products = require("../models/product.model.js")(sequelize, Sequelize);
// db.orders = require("../models/order.model.js")(sequelize, Sequelize);

// db.customers.hasMany(db.orders,{ as: 'orders', foreignKey: 'customer_id' });
// db.orders.belongsTo(db.products,{ as: 'product', foreignKey: 'product_id' });
// db.orders.belongsTo(db.customers,{ as: 'customer', foreignKey: 'customer_id' });

module.exports = db;