'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Observation', 
    'ediga_user_photo', {
        type: Sequelize.TEXT('long'),
        allowNull: true.valueOf,
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Observation', 'ediga_user_photo')
  }
};
