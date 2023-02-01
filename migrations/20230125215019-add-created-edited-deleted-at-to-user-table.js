'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'User',
      'created_at',
      Sequelize.DATE,
    ),
    await queryInterface.addColumn(
        'User',
        'edited_at',
        Sequelize.DATE
    ),
    await queryInterface.addColumn(
        'User',
        'deleted_at',
        Sequelize.DATE
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'User',
      'created_at',
    ),
    await queryInterface.removeColumn(
      'User',
      'edited_at',
    ),
    await queryInterface.removeColumn(
      'User',
      'deleted_at',
    );
  }
};
