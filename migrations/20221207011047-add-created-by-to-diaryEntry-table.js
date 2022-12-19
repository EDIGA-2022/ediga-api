'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'DiaryEntry',
      'created_by',
      Sequelize.UUID,
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'DiaryEntry',
      'created_by',
    );
  }
};
