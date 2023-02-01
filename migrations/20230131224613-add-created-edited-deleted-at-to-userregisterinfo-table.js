'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
        'UserRegisterInfo',
        'created_at',
        Sequelize.DATE,
    ),
    await queryInterface.addColumn(
        'UserRegisterInfo',
        'edited_at',
        Sequelize.DATE
    ),
    await queryInterface.addColumn(
        'UserRegisterInfo',
        'deleted_at',
        Sequelize.DATE
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'UserRegisterInfo',
      'created_at',
    ),
    await queryInterface.removeColumn(
      'UserRegisterInfo',
      'edited_at',
    ),
    await queryInterface.removeColumn(
      'UserRegisterInfo',
      'deleted_at',
    );
  }
};
