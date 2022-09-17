'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'UserRegisterInfo',
      'Alias',
      Sequelize.STRING
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'UserRegisterInfo',
      'Alias'
    );
  }
};
